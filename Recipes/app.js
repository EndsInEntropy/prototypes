/* Recipe Box — shared app logic */

const LS_CUSTOM = 'recipebox.custom';
const LS_OVERRIDES = 'recipebox.overrides';
const LS_CHECKED = 'recipebox.checked';

function loadCustom(){
  try{ return JSON.parse(localStorage.getItem(LS_CUSTOM)) || []; }catch(e){ return []; }
}
function saveCustom(list){ localStorage.setItem(LS_CUSTOM, JSON.stringify(list)); }

function loadOverrides(){
  try{ return JSON.parse(localStorage.getItem(LS_OVERRIDES)) || {}; }catch(e){ return {}; }
}
function saveOverride(id, data){
  const all = loadOverrides();
  all[id] = data;
  localStorage.setItem(LS_OVERRIDES, JSON.stringify(all));
}
function clearOverride(id){
  const all = loadOverrides();
  delete all[id];
  localStorage.setItem(LS_OVERRIDES, JSON.stringify(all));
}

function allRecipes(){
  return RECIPES.concat(loadCustom());
}

function findRecipe(id){
  return allRecipes().find(r => r.id === id);
}

function slugify(title){
  let base = title.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || 'recipe';
  let slug = base, n = 1;
  while(findRecipe(slug)){ slug = base + '-' + (++n); }
  return slug;
}

/* Turn a recipe (built-in or custom) + any saved override into the data actually rendered. */
function resolvedRecipe(id){
  const base = findRecipe(id);
  if(!base) return null;
  const ov = loadOverrides()[id];
  const r = Object.assign({}, base);
  if(ov){
    r.ingredients = ov.ingredients;
    r.method = ov.method;
    if(ov.time !== undefined) r.time = ov.time;
    if(ov.servings !== undefined) r.servings = ov.servings;
    r.status = (linesOf(ov.ingredients).length || linesOf(ov.method).length) ? 'ready' : base.status;
  }
  const hasContent = hasAnyContent(r.ingredients) || hasAnyContent(r.method);
  r.status = hasContent ? 'ready' : 'pending';
  return r;
}

function hasAnyContent(field){
  if(!field) return false;
  if(typeof field === 'string') return field.trim().length > 0;
  if(Array.isArray(field)){
    return field.some(item => {
      if(typeof item === 'string') return item.trim().length > 0;
      if(item && item.items) return item.items.length > 0;
      if(item && item.steps) return item.steps.length > 0;
      return false;
    });
  }
  return false;
}

/* Normalise a text blob (one item per line) into an array of trimmed lines,
   stripping leading "- " / "1. " markers, dropping blanks. */
function linesOf(field){
  if(!field) return [];
  if(Array.isArray(field)) return field;
  return field.split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => l.replace(/^[-*•]\s+/,'').replace(/^\d+[.)]\s+/,''));
}

/* Build plain-text form of ingredients/method for the editor textarea, from
   either a flat array, a grouped array, or existing text. */
function toEditText(field){
  if(!field) return '';
  if(typeof field === 'string') return field;
  return field.map(item => {
    if(typeof item === 'string') return item;
    const list = item.items || item.steps || [];
    return (item.heading ? '## ' + item.heading + '\n' : '') + list.join('\n');
  }).join('\n\n');
}

/* Parse editor text back into a grouped structure if "## Heading" lines are used,
   otherwise a flat array of lines. key is 'items' for ingredients or 'steps' for method. */
function fromEditText(text, key){
  key = key || 'items';
  if(!text || !text.trim()) return [];
  const lines = text.split('\n').map(l => l.trim());
  const hasHeadings = lines.some(l => l.startsWith('## '));
  if(!hasHeadings) return linesOf(text);
  const strip = l => l.replace(/^[-*•]\s+/,'').replace(/^\d+[.)]\s+/,'');
  const groups = [];
  let current = null;
  lines.forEach(l => {
    if(!l) return;
    if(l.startsWith('## ')){
      current = { heading: l.slice(3).trim() };
      current[key] = [];
      groups.push(current);
    } else if(current){
      current[key].push(strip(l));
    } else {
      current = { heading: '' };
      current[key] = [strip(l)];
      groups.push(current);
    }
  });
  return groups;
}

function renderIngredients(field, containerId, recipeId){
  const el = document.getElementById(containerId);
  if(!field || !hasAnyContent(field)){ el.innerHTML = ''; return; }
  const checked = loadChecked(recipeId);
  let html = '';
  const isGrouped = Array.isArray(field) && field.length && typeof field[0] === 'object';
  if(isGrouped){
    field.forEach(group => {
      if(group.heading) html += `<div class="group-heading">${escapeHtml(group.heading)}</div>`;
      html += ulFor(group.items, checked, recipeId);
    });
  } else {
    html += ulFor(field, checked, recipeId);
  }
  el.innerHTML = html;
  el.querySelectorAll('li[data-i]').forEach(li => {
    li.addEventListener('click', () => toggleChecked(recipeId, li.dataset.i, li));
  });
}

function ulFor(items, checked, recipeId){
  return '<ul class="ing-list">' + items.map((item, i) => {
    const key = item;
    const isOn = checked.includes(key);
    return `<li data-i="${escapeAttr(key)}" class="${isOn?'checked':''}"><span class="box">${isOn?'✓':''}</span><span>${escapeHtml(item)}</span></li>`;
  }).join('') + '</ul>';
}

function loadChecked(recipeId){
  try{
    const all = JSON.parse(localStorage.getItem(LS_CHECKED)) || {};
    return all[recipeId] || [];
  }catch(e){ return []; }
}
function toggleChecked(recipeId, key, li){
  let all = {};
  try{ all = JSON.parse(localStorage.getItem(LS_CHECKED)) || {}; }catch(e){}
  const list = all[recipeId] || [];
  const idx = list.indexOf(key);
  if(idx === -1){ list.push(key); li.classList.add('checked'); li.querySelector('.box').textContent = '✓'; }
  else { list.splice(idx,1); li.classList.remove('checked'); li.querySelector('.box').textContent = ''; }
  all[recipeId] = list;
  localStorage.setItem(LS_CHECKED, JSON.stringify(all));
}

function renderMethod(field, containerId){
  const el = document.getElementById(containerId);
  if(!field || !hasAnyContent(field)){ el.innerHTML = ''; return; }
  let html = '';
  const isGrouped = Array.isArray(field) && field.length && typeof field[0] === 'object';
  if(isGrouped){
    field.forEach(group => {
      if(group.heading) html += `<div class="group-heading">${escapeHtml(group.heading)}</div>`;
      html += olFor(group.steps);
    });
  } else {
    html += olFor(field);
  }
  el.innerHTML = html;
}
function olFor(steps){
  return '<ul class="method-list">' + steps.map((s,i) =>
    `<li><span class="n">${i+1}</span><p>${escapeHtml(s)}</p></li>`
  ).join('') + '</ul>';
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeAttr(s){ return escapeHtml(s); }

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js');
}
