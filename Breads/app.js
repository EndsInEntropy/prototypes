/* The Breadboard — app logic. Vanilla JS, hash-routed, IndexedDB-backed. */

const TYPES = [
  { id: 'sourdough', label: 'Sourdough', emoji: '🍞' },
  { id: 'rye', label: 'Rye & Wholegrain', emoji: '🌾' },
  { id: 'yeasted', label: 'Yeasted & Lean', emoji: '🥖' },
  { id: 'enriched', label: 'Enriched', emoji: '🥐' },
  { id: 'flatbread', label: 'Flatbread', emoji: '🫓' },
  { id: 'quickbread', label: 'Quick Bread', emoji: '🧁' },
  { id: 'other', label: 'Other', emoji: '✨' },
];
const SORT_LABELS = { newest: 'Newest', az: 'A – Z', type: 'Bread type', quick: 'Quickest' };

let recipes = [];
let activeType = 'all';
let searchQuery = '';
let sortMode = 'newest';
let formPhotos = [];
let editingRecipe = null;
let checkedIngredients = {};
let checkedSteps = {};
let currentDetailId = null;
let deferredInstallPrompt = null;

function typeMeta(id) { return TYPES.find(t => t.id === id) || TYPES[TYPES.length - 1]; }

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtMins(m) {
  m = Math.round(m || 0);
  if (m <= 0) return '—';
  if (m < 60) return m + 'm';
  const h = Math.floor(m / 60), rem = m % 60;
  return rem ? `${h}h ${rem}m` : `${h}h`;
}

function totalTime(r) { return (r.prep || 0) + (r.prove || 0) + (r.bake || 0); }

function h(htmlString) {
  const t = document.createElement('template');
  t.innerHTML = htmlString.trim();
  return t.content.firstElementChild;
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------------- init & routing ---------------- */

async function init() {
  recipes = await dbGetAll();
  if (recipes.length === 0) {
    for (const r of SEED_RECIPES) await dbPut(r);
    recipes = await dbGetAll();
  }
  renderChips();
  bindStaticListeners();
  route();
  window.addEventListener('hashchange', route);
  setupInstallPrompt();
  registerSW();
}

function parseHash() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'recipe' && parts[1]) return { view: 'detail', id: decodeURIComponent(parts[1]) };
  if (parts[0] === 'new') return { view: 'form', id: null };
  if (parts[0] === 'edit' && parts[1]) return { view: 'form', id: decodeURIComponent(parts[1]) };
  return { view: 'home' };
}

function route() {
  const r = parseHash();
  document.getElementById('view-home').classList.toggle('active', r.view === 'home');
  document.getElementById('view-detail').classList.toggle('active', r.view === 'detail');
  document.getElementById('view-form').classList.toggle('active', r.view === 'form');
  closeMenus();
  window.scrollTo(0, 0);
  if (r.view === 'home') renderHome();
  else if (r.view === 'detail') {
    const rec = recipes.find(x => x.id === r.id);
    if (!rec) { location.hash = '#/'; return; }
    if (currentDetailId !== r.id) { checkedIngredients = {}; checkedSteps = {}; }
    currentDetailId = r.id;
    renderDetail(rec);
  } else if (r.view === 'form') {
    renderForm(r.id ? recipes.find(x => x.id === r.id) : null);
  }
}

/* ---------------- home ---------------- */

function renderChips() {
  const wrap = document.getElementById('typeChips');
  const all = h(`<button class="chip active" data-filter="all">🥯 All</button>`);
  wrap.appendChild(all);
  TYPES.forEach(t => wrap.appendChild(h(`<button class="chip" data-filter="${t.id}">${t.emoji} ${esc(t.label)}</button>`)));
}

function matchesSearch(r, q) {
  if (!q) return true;
  const hay = [
    r.title, typeMeta(r.type).label, r.notes, r.yieldText, r.ovenTemp,
    ...(r.tags || []),
    ...(r.ingredientGroups || []).flatMap(g => [g.heading, ...(g.items || [])]),
  ].join(' ').toLowerCase();
  return hay.includes(q);
}

function sortComparator(mode) {
  switch (mode) {
    case 'az': return (a, b) => a.title.localeCompare(b.title);
    case 'type': return (a, b) => typeMeta(a.type).label.localeCompare(typeMeta(b.type).label) || a.title.localeCompare(b.title);
    case 'quick': return (a, b) => totalTime(a) - totalTime(b);
    default: return (a, b) => (b.createdAt || 0) - (a.createdAt || 0);
  }
}

function renderHome() {
  const q = searchQuery.trim().toLowerCase();
  const filtered = recipes.filter(r => (activeType === 'all' || r.type === activeType) && matchesSearch(r, q));
  const cmp = sortComparator(sortMode);
  const favs = filtered.filter(r => r.favourite).sort(cmp);
  const rest = filtered.filter(r => !r.favourite).sort(cmp);

  const list = document.getElementById('homeList');
  if (!filtered.length) {
    list.innerHTML = emptyStateHTML(recipes.length === 0);
    return;
  }
  let html = '';
  if (favs.length) html += `<div class="section-label">⭐ Favourites</div><div class="grid">${favs.map(cardHTML).join('')}</div>`;
  if (rest.length) html += `<div class="section-label">${favs.length ? 'All recipes' : ''}</div><div class="grid">${rest.map(cardHTML).join('')}</div>`;
  list.innerHTML = html;
}

function emptyStateHTML(noRecipesAtAll) {
  if (noRecipesAtAll) {
    return `<div class="empty-state"><div class="big">🍞</div><h3>Your bread box is empty</h3><p>Tap the + button to add your first recipe — ingredients, method and a photo of the crumb.</p></div>`;
  }
  return `<div class="empty-state"><div class="big">🔍</div><h3>No loaves match</h3><p>Try a different search or clear the bread-type filter.</p></div>`;
}

function placeholderHTML(type, size) {
  const t = typeMeta(type);
  return `<div class="${size}" data-type="${t.id}">${t.emoji}</div>`;
}

function cardMetaHTML(r) {
  const parts = [];
  if (totalTime(r)) parts.push(`⏱ ${fmtMins(totalTime(r))}`);
  if (r.ovenTemp) parts.push(`🔥 ${esc(r.ovenTemp.split(',')[0].split('·')[0].trim())}`);
  return parts.join(' &middot; ');
}

function cardHTML(r) {
  const t = typeMeta(r.type);
  const media = r.images && r.images[0]
    ? `<img src="${r.images[0]}" alt="">`
    : placeholderHTML(r.type, 'card-placeholder');
  return `
  <article class="card" data-open="${r.id}">
    <div class="card-media">
      ${media}
      <button class="star-btn ${r.favourite ? 'on' : ''}" data-fav="${r.id}" aria-label="Toggle favourite">${r.favourite ? '★' : '☆'}</button>
      <span class="type-badge">${t.emoji} ${esc(t.label)}</span>
    </div>
    <div class="card-body">
      <div class="card-title">${esc(r.title)}</div>
      <div class="card-meta mono">${cardMetaHTML(r)}</div>
    </div>
  </article>`;
}

/* ---------------- detail ---------------- */

function renderDetail(r) {
  const t = typeMeta(r.type);
  const view = document.getElementById('view-detail');

  const hero = (r.images && r.images.length)
    ? `<div class="hero-scroll" id="heroScroll">${r.images.map(src => `<img src="${src}" data-action="open-lightbox" data-src="${esc(src)}">`).join('')}</div>
       ${r.images.length > 1 ? `<div class="hero-dots">${r.images.map((_, i) => `<span class="${i === 0 ? 'on' : ''}"></span>`).join('')}</div>` : ''}`
    : placeholderHTML(r.type, 'hero-placeholder');

  const stats = [];
  if (r.prep) stats.push(['⏱', 'Prep', fmtMins(r.prep)]);
  if (r.prove) stats.push(['⏳', 'Prove', fmtMins(r.prove)]);
  if (r.bake) stats.push(['🔥', 'Bake', fmtMins(r.bake)]);
  if (totalTime(r)) stats.push(['⏰', 'Total', fmtMins(totalTime(r)), true]);
  if (r.hydration) stats.push(['💧', 'Hydration', r.hydration + '%']);
  if (r.yieldText) stats.push(['🍞', 'Yield', r.yieldText]);
  if (r.ovenTemp) stats.push(['🌡️', 'Oven', r.ovenTemp]);
  stats.push(['📊', 'Difficulty', r.difficulty || 'Medium']);

  const ingChecked = checkedIngredients[r.id] || {};
  const ingHTML = (r.ingredientGroups || []).map((g, gi) => `
    ${g.heading ? `<h3>${esc(g.heading)}</h3>` : ''}
    <ul class="ing-list">
      ${(g.items || []).map((it, ii) => `<li class="${ingChecked[gi + '-' + ii] ? 'done' : ''}" data-action="toggle-ing" data-key="${gi}-${ii}">${esc(it)}</li>`).join('')}
    </ul>`).join('');

  const stepChecked = checkedSteps[r.id] || {};
  const totalSteps = (r.methodGroups || []).reduce((n, g) => n + (g.items || []).length, 0);
  const doneSteps = Object.values(stepChecked).filter(Boolean).length;
  const pct = totalSteps ? Math.round((doneSteps / totalSteps) * 100) : 0;
  const methodHTML = (r.methodGroups || []).map((g, gi) => `
    ${g.heading ? `<h3>${esc(g.heading)}</h3>` : ''}
    <ol class="method-list">
      ${(g.items || []).map((it, ii) => `<li class="${stepChecked[gi + '-' + ii] ? 'done' : ''}" data-action="toggle-step" data-key="${gi}-${ii}">${esc(it)}</li>`).join('')}
    </ol>`).join('');

  view.innerHTML = `
    <div class="detail-hero">
      <div class="hero-bar">
        <button class="glass-btn" data-action="go-home" aria-label="Back">←</button>
        <div class="hero-actions">
          <button class="glass-btn ${r.favourite ? 'on' : ''}" data-fav="${r.id}">${r.favourite ? '★' : '☆'}</button>
          <button class="glass-btn" data-action="edit" data-id="${r.id}">✎</button>
        </div>
      </div>
      ${hero}
    </div>
    <div class="detail-body">
      <span class="detail-type">${t.emoji} ${esc(t.label)}</span>
      <h1 class="detail-title">${esc(r.title)}</h1>
      <div class="detail-diff">Difficulty: ${esc(r.difficulty || 'Medium')} &nbsp; ${diffDots(r.difficulty)}</div>

      <div class="stat-strip">
        ${stats.map(([ic, lab, val, strong]) => `<div class="stat-pill ${strong ? 'strong' : ''}"><div class="ic">${ic}</div><div class="val">${esc(val)}</div><div class="lab">${lab}</div></div>`).join('')}
      </div>

      ${(r.ingredientGroups || []).some(g => (g.items || []).length) ? `
      <div class="detail-card ing-card">
        <h2>🧂 Ingredients</h2>
        ${ingHTML}
      </div>` : ''}

      ${totalSteps ? `
      <div class="detail-card method-card">
        <h2>Method ${totalSteps ? `<div class="progress-ring" style="--pct:${pct}"><span>${pct}%</span></div>` : ''}</h2>
        ${methodHTML}
      </div>` : ''}

      ${r.notes ? `<div class="detail-card notes-card"><h2>💡 Notes</h2><p>${esc(r.notes)}</p></div>` : ''}

      ${(r.tags || []).length ? `<div class="tags-row">${r.tags.map(tg => `<span class="tag">#${esc(tg)}</span>`).join('')}</div>` : ''}

      <button class="detail-danger" data-action="ask-delete" data-id="${r.id}">🗑 Delete this recipe</button>
    </div>
  `;

  const scroller = document.getElementById('heroScroll');
  if (scroller && r.images.length > 1) {
    scroller.addEventListener('scroll', () => {
      const idx = Math.round(scroller.scrollLeft / scroller.clientWidth);
      view.querySelectorAll('.hero-dots span').forEach((d, i) => d.classList.toggle('on', i === idx));
    });
  }
}

function diffDots(diff) {
  const levels = { Easy: 1, Medium: 2, Hard: 3 };
  const n = levels[diff] || 2;
  return `<span class="mono">${[1, 2, 3].map(i => `<span class="dot ${i <= n ? 'fill' : ''}" style="display:inline-block;margin-right:3px"></span>`).join('')}</span>`;
}

/* ---------------- form ---------------- */

function ingredientRowNode(value = '') {
  return h(`<div class="item-row"><input type="text" class="item-text" value="${esc(value)}" placeholder="e.g. 500g strong white flour"><button type="button" class="row-remove" data-action="remove-row" aria-label="Remove">×</button></div>`);
}
function methodRowNode(value = '') {
  return h(`<div class="item-row"><textarea class="item-text" rows="2" placeholder="Describe this step…">${esc(value)}</textarea><button type="button" class="row-remove" data-action="remove-row" aria-label="Remove">×</button></div>`);
}
function ingredientGroupNode(group = {}) {
  const wrap = h(`<div class="ing-group"><div class="group-head"><input type="text" class="group-heading" placeholder="Stage (optional) — e.g. Levain" value="${esc(group.heading || '')}"><button type="button" class="group-remove" data-action="remove-group" aria-label="Remove stage">🗑</button></div><div class="group-items"></div><button type="button" class="add-row" data-action="add-ing-row">+ Add ingredient</button></div>`);
  const items = wrap.querySelector('.group-items');
  (group.items && group.items.length ? group.items : ['']).forEach(v => items.appendChild(ingredientRowNode(v)));
  return wrap;
}
function methodGroupNode(group = {}) {
  const wrap = h(`<div class="method-group"><div class="group-head"><input type="text" class="group-heading" placeholder="Stage (optional) — e.g. Bulk ferment" value="${esc(group.heading || '')}"><button type="button" class="group-remove" data-action="remove-group" aria-label="Remove stage">🗑</button></div><div class="group-items"></div><button type="button" class="add-row" data-action="add-method-row">+ Add step</button></div>`);
  const items = wrap.querySelector('.group-items');
  (group.items && group.items.length ? group.items : ['']).forEach(v => items.appendChild(methodRowNode(v)));
  return wrap;
}

function renderPhotoThumbs() {
  const wrap = document.getElementById('photoStrip');
  if (!wrap) return;
  wrap.innerHTML = formPhotos.map((p, i) => `
    <div class="photo-thumb">
      <img src="${p}">
      ${i === 0 ? '<span class="hero-badge">Cover</span>' : ''}
      <button type="button" class="thumb-remove" data-action="remove-photo" data-idx="${i}">×</button>
    </div>`).join('') + `<button type="button" class="add-photo-btn" data-action="pick-photos"><span class="ic">📷</span>Add photo</button>`;
}

function renderForm(existing) {
  editingRecipe = existing || null;
  formPhotos = existing ? [...(existing.images || [])] : [];
  const isEdit = !!existing;

  const view = document.getElementById('view-form');
  view.innerHTML = `
    <div class="form-header">
      <button class="glass-btn" style="background:var(--surface-2);color:var(--ink-soft)" data-action="cancel-form" aria-label="Close">✕</button>
      <h1>${isEdit ? 'Edit recipe' : 'New recipe'}</h1>
    </div>
    <div class="form-body">

      <div class="field">
        <label>Photos</label>
        <div class="photo-strip" id="photoStrip"></div>
        <input type="file" id="photoInput" accept="image/*" multiple hidden>
        <div class="hint-text">First photo becomes the cover image.</div>
      </div>

      <div class="field">
        <label>Title</label>
        <input type="text" id="f-title" placeholder="e.g. Seeded Wholemeal Sourdough" value="${esc(existing?.title)}">
      </div>

      <div class="field">
        <label>Bread type</label>
        <select id="f-type">${TYPES.map(t => `<option value="${t.id}" ${existing?.type === t.id ? 'selected' : ''}>${t.emoji} ${esc(t.label)}</option>`).join('')}</select>
      </div>

      <div class="field">
        <label>Difficulty</label>
        <input type="hidden" id="f-difficulty" value="${esc(existing?.difficulty || 'Medium')}">
        <div class="segmented" id="diffSeg">
          ${['Easy', 'Medium', 'Hard'].map(d => `<button type="button" data-set-difficulty="${d}" class="${(existing?.difficulty || 'Medium') === d ? 'on' : ''}">${d}</button>`).join('')}
        </div>
      </div>

      <div class="field">
        <label>Time</label>
        <div class="field-row three">
          <div><input type="number" min="0" id="f-prep" placeholder="Prep (min)" value="${existing?.prep || ''}"></div>
          <div><input type="number" min="0" id="f-prove" placeholder="Prove (min)" value="${existing?.prove || ''}"></div>
          <div><input type="number" min="0" id="f-bake" placeholder="Bake (min)" value="${existing?.bake || ''}"></div>
        </div>
        <div class="hint-text">Total time is calculated automatically for the at-a-glance summary.</div>
      </div>

      <div class="field">
        <div class="field-row">
          <div><label>Hydration %</label><input type="number" min="0" id="f-hydration" placeholder="e.g. 75" value="${existing?.hydration || ''}"></div>
          <div><label>Oven temp</label><input type="text" id="f-oven" placeholder="e.g. 230°C fan" value="${esc(existing?.ovenTemp)}"></div>
        </div>
      </div>

      <div class="field">
        <label>Yield</label>
        <input type="text" id="f-yield" placeholder="e.g. 1 large boule / 2 x 500g loaves" value="${esc(existing?.yieldText)}">
      </div>

      <div class="field">
        <label>Ingredients</label>
        <div id="ingGroups"></div>
        <button type="button" class="add-group" data-action="add-ing-group">+ Add ingredient stage</button>
      </div>

      <div class="field">
        <label>Method</label>
        <div id="methodGroups"></div>
        <button type="button" class="add-group" data-action="add-method-group">+ Add method stage</button>
      </div>

      <div class="field">
        <label>Tags</label>
        <input type="text" id="f-tags" placeholder="comma, separated, tags" value="${esc((existing?.tags || []).join(', '))}">
      </div>

      <div class="field">
        <label>Notes &amp; tips</label>
        <textarea id="f-notes" rows="3" placeholder="Anything worth remembering next time…">${esc(existing?.notes)}</textarea>
      </div>
    </div>

    <div class="form-actions">
      ${isEdit ? `<button type="button" class="btn btn-ghost" data-action="ask-delete" data-id="${existing.id}">🗑</button>` : ''}
      <button type="button" class="btn btn-primary" data-action="save-form">Save recipe</button>
    </div>
  `;

  renderPhotoThumbs();

  const ingWrap = document.getElementById('ingGroups');
  const groups = (existing?.ingredientGroups && existing.ingredientGroups.length) ? existing.ingredientGroups : [{ heading: '', items: [''] }];
  groups.forEach(g => ingWrap.appendChild(ingredientGroupNode(g)));

  const methodWrap = document.getElementById('methodGroups');
  const mgroups = (existing?.methodGroups && existing.methodGroups.length) ? existing.methodGroups : [{ heading: '', items: [''] }];
  mgroups.forEach(g => methodWrap.appendChild(methodGroupNode(g)));

  document.getElementById('photoInput').addEventListener('change', onPhotoInputChange);
}

async function onPhotoInputChange(e) {
  const files = Array.from(e.target.files || []);
  e.target.value = '';
  if (!files.length) return;
  toast('Adding photo' + (files.length > 1 ? 's' : '') + '…');
  for (const file of files) {
    try {
      const dataUrl = await compressImage(file);
      formPhotos.push(dataUrl);
    } catch (err) { console.error(err); }
  }
  renderPhotoThumbs();
}

function collectGroups(containerId, isMethod) {
  const groups = [];
  document.querySelectorAll(`#${containerId} > .ing-group, #${containerId} > .method-group`).forEach(g => {
    const heading = g.querySelector('.group-heading').value.trim();
    const items = Array.from(g.querySelectorAll('.item-text')).map(i => i.value.trim()).filter(Boolean);
    if (items.length || heading) groups.push({ heading, items });
  });
  return groups;
}

async function saveForm() {
  const title = document.getElementById('f-title').value.trim();
  if (!title) { toast('Give the recipe a title first'); document.getElementById('f-title').focus(); return; }

  const recipe = {
    id: editingRecipe ? editingRecipe.id : (crypto.randomUUID ? crypto.randomUUID() : 'r-' + Date.now() + Math.random().toString(16).slice(2)),
    title,
    type: document.getElementById('f-type').value,
    difficulty: document.getElementById('f-difficulty').value,
    favourite: editingRecipe ? editingRecipe.favourite : false,
    createdAt: editingRecipe ? editingRecipe.createdAt : Date.now(),
    updatedAt: Date.now(),
    prep: Number(document.getElementById('f-prep').value) || 0,
    prove: Number(document.getElementById('f-prove').value) || 0,
    bake: Number(document.getElementById('f-bake').value) || 0,
    hydration: Number(document.getElementById('f-hydration').value) || 0,
    yieldText: document.getElementById('f-yield').value.trim(),
    ovenTemp: document.getElementById('f-oven').value.trim(),
    tags: document.getElementById('f-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    images: formPhotos.slice(),
    ingredientGroups: collectGroups('ingGroups'),
    methodGroups: collectGroups('methodGroups'),
    notes: document.getElementById('f-notes').value.trim(),
  };

  await dbPut(recipe);
  const idx = recipes.findIndex(r => r.id === recipe.id);
  if (idx >= 0) recipes[idx] = recipe; else recipes.push(recipe);
  toast(editingRecipe ? 'Recipe updated' : 'Recipe saved 🍞');
  location.hash = '#/recipe/' + encodeURIComponent(recipe.id);
}

async function deleteRecipe(id) {
  await dbDelete(id);
  recipes = recipes.filter(r => r.id !== id);
  toast('Recipe deleted');
  location.hash = '#/';
}

async function toggleFavourite(id) {
  const r = recipes.find(x => x.id === id);
  if (!r) return;
  r.favourite = !r.favourite;
  await dbPut(r);
  if (parseHash().view === 'detail') renderDetail(r); else renderHome();
}

/* ---------------- modals ---------------- */

function openModal(node) {
  const root = document.getElementById('modalRoot');
  root.innerHTML = '';
  root.appendChild(node);
}
function closeModal() { document.getElementById('modalRoot').innerHTML = ''; }

function confirmDelete(id) {
  const r = recipes.find(x => x.id === id);
  if (!r) return;
  openModal(h(`
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" data-stop>
        <div class="big">🗑</div>
        <h3>Delete "${esc(r.title)}"?</h3>
        <p>This removes the recipe and its photos from this device. It can't be undone.</p>
        <div class="modal-actions">
          <button class="btn btn-ghost" data-action="close-modal">Cancel</button>
          <button class="btn btn-primary" style="background:var(--danger)" data-action="confirm-delete" data-id="${id}">Delete</button>
        </div>
      </div>
    </div>`));
}

function showAbout() {
  openModal(h(`
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" data-stop>
        <div class="big">🍞</div>
        <h3>The Breadboard</h3>
        <p>A home-screen recipe box for the bread you actually bake — ingredients, method, and the crumb shot, all in one place. Everything is stored only on this device, so use "Export backup" from the menu now and then to keep a copy safe.</p>
        <div class="modal-actions"><button class="btn btn-primary" data-action="close-modal">Got it</button></div>
      </div>
    </div>`));
}

function openLightbox(src) {
  openModal(h(`
    <div class="lightbox-overlay" data-action="close-modal">
      <button class="lightbox-close" data-action="close-modal">✕</button>
      <img src="${esc(src)}">
    </div>`));
}

/* ---------------- export / import ---------------- */

function exportBackup() {
  const data = JSON.stringify(recipes, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `breadboard-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast('Backup downloaded');
}

async function importBackupFile(file) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error('not an array');
    for (const r of data) {
      if (!r.id) r.id = crypto.randomUUID ? crypto.randomUUID() : 'r-' + Date.now() + Math.random().toString(16).slice(2);
      await dbPut(r);
    }
    recipes = await dbGetAll();
    renderHome();
    toast(`Imported ${data.length} recipe${data.length === 1 ? '' : 's'}`);
  } catch (err) {
    console.error(err);
    toast('That file doesn’t look like a Breadboard backup');
  }
}

/* ---------------- install prompt ---------------- */

function isStandalone() {
  return window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
}
function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
}

function setupInstallPrompt() {
  if (isStandalone() || localStorage.getItem('breadboard-install-dismissed')) return;

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallBanner(false);
  });

  if (isIOS()) showInstallBanner(true);
}

function showInstallBanner(iosManual) {
  const el = document.getElementById('installBanner');
  if (!el || el.dataset.shown) return;
  el.dataset.shown = '1';
  el.innerHTML = `
    <div class="install-banner">
      <div class="ic">🏠</div>
      <div class="txt"><b>Bake it into your home screen</b>${iosManual ? 'Tap the Share icon, then "Add to Home Screen".' : 'Install The Breadboard for one-tap, offline access.'}</div>
      ${iosManual ? '' : '<button class="install-go" data-action="do-install">Install</button>'}
      <button class="install-close" data-action="dismiss-install" aria-label="Dismiss">✕</button>
    </div>`;
}

function dismissInstallBanner() {
  localStorage.setItem('breadboard-install-dismissed', '1');
  document.getElementById('installBanner').innerHTML = '';
}

async function doInstall() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  dismissInstallBanner();
}

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

/* ---------------- menus ---------------- */

function closeMenus() {
  document.getElementById('menuPanel')?.classList.add('hidden');
  document.getElementById('sortMenu')?.classList.add('hidden');
}

/* ---------------- event delegation ---------------- */

function bindStaticListeners() {
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderHome();
  });

  document.getElementById('importFile').addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) importBackupFile(file);
    e.target.value = '';
  });

  document.body.addEventListener('click', onGlobalClick);
}

function onGlobalClick(e) {
  const favBtn = e.target.closest('[data-fav]');
  if (favBtn) { e.stopPropagation(); toggleFavourite(favBtn.dataset.fav); return; }

  const filterChip = e.target.closest('[data-filter]');
  if (filterChip) {
    activeType = filterChip.dataset.filter;
    document.querySelectorAll('#typeChips .chip').forEach(c => c.classList.toggle('active', c === filterChip));
    renderHome();
    return;
  }

  const sortOpt = e.target.closest('[data-sort]');
  if (sortOpt) {
    sortMode = sortOpt.dataset.sort;
    document.getElementById('sortLabel').textContent = SORT_LABELS[sortMode];
    document.querySelectorAll('#sortMenu button').forEach(b => b.classList.toggle('active', b === sortOpt));
    closeMenus();
    renderHome();
    return;
  }

  const openCard = e.target.closest('[data-open]');
  if (openCard) { location.hash = '#/recipe/' + encodeURIComponent(openCard.dataset.open); return; }

  const action = e.target.closest('[data-action]')?.dataset.action;
  const target = e.target.closest('[data-action]');

  switch (action) {
    case 'new': location.hash = '#/new'; return;
    case 'go-home': location.hash = '#/'; return;
    case 'edit': location.hash = '#/edit/' + encodeURIComponent(target.dataset.id); return;
    case 'cancel-form':
      location.hash = editingRecipe ? '#/recipe/' + encodeURIComponent(editingRecipe.id) : '#/';
      return;
    case 'save-form': saveForm(); return;
    case 'ask-delete': confirmDelete(target.dataset.id); return;
    case 'confirm-delete': closeModal(); deleteRecipe(target.dataset.id); return;
    case 'close-modal':
      if (e.target.closest('[data-stop]') && !e.target.hasAttribute('data-action')) return;
      closeModal();
      return;
    case 'open-lightbox': openLightbox(target.dataset.src); return;

    case 'toggle-menu':
      document.getElementById('sortMenu').classList.add('hidden');
      document.getElementById('menuPanel').classList.toggle('hidden');
      e.stopPropagation();
      return;
    case 'toggle-sort':
      document.getElementById('menuPanel').classList.add('hidden');
      document.getElementById('sortMenu').classList.toggle('hidden');
      e.stopPropagation();
      return;
    case 'export-backup': exportBackup(); closeMenus(); return;
    case 'trigger-import': document.getElementById('importFile').click(); closeMenus(); return;
    case 'show-about': closeMenus(); showAbout(); return;

    case 'do-install': doInstall(); return;
    case 'dismiss-install': dismissInstallBanner(); return;

    case 'pick-photos': document.getElementById('photoInput').click(); return;
    case 'remove-photo':
      formPhotos.splice(Number(target.dataset.idx), 1);
      renderPhotoThumbs();
      return;

    case 'add-ing-group': document.getElementById('ingGroups').appendChild(ingredientGroupNode()); return;
    case 'add-method-group': document.getElementById('methodGroups').appendChild(methodGroupNode()); return;
    case 'add-ing-row': target.closest('.ing-group').querySelector('.group-items').appendChild(ingredientRowNode()); return;
    case 'add-method-row': target.closest('.method-group').querySelector('.group-items').appendChild(methodRowNode()); return;
    case 'remove-row': target.closest('.item-row').remove(); return;
    case 'remove-group': target.closest('.ing-group, .method-group').remove(); return;

    case 'toggle-ing': {
      const rid = currentDetailId;
      checkedIngredients[rid] = checkedIngredients[rid] || {};
      checkedIngredients[rid][target.dataset.key] = !checkedIngredients[rid][target.dataset.key];
      target.classList.toggle('done');
      return;
    }
    case 'toggle-step': {
      const rid = currentDetailId;
      checkedSteps[rid] = checkedSteps[rid] || {};
      checkedSteps[rid][target.dataset.key] = !checkedSteps[rid][target.dataset.key];
      const rec = recipes.find(r => r.id === rid);
      renderDetail(rec);
      return;
    }
  }

  const diffBtn = e.target.closest('[data-set-difficulty]');
  if (diffBtn) {
    document.getElementById('f-difficulty').value = diffBtn.dataset.setDifficulty;
    document.querySelectorAll('#diffSeg button').forEach(b => b.classList.toggle('on', b === diffBtn));
    return;
  }

  if (!e.target.closest('.sort-wrap')) document.getElementById('sortMenu')?.classList.add('hidden');
  if (!e.target.closest('.menu-btn') && !e.target.closest('.menu-panel')) document.getElementById('menuPanel')?.classList.add('hidden');
}

init();
