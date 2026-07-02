/* Recipe Box — recipe data
   Each recipe: id, title, category, emoji, source url + name, time, servings,
   ingredients (array of strings, or array of {heading, items} for multi-part recipes),
   method (array of strings, or array of {heading, steps} for multi-part recipes),
   status: 'pending' (not yet transcribed) | 'ready' (full method available)
*/
const RECIPES = [
  {
    id: 'chickpea-traybake',
    title: 'Chickpea & Veg Traybake',
    category: 'Mains',
    emoji: '🥘',
    source: 'https://plantbasednews.org/wprm_print/chickpea-traybake',
    sourceName: 'Plant Based News',
    time: 'Prep 20 min · Cook 30 min (plus 1.5–2 hr for the confit)',
    servings: 'Serves 4',
    ingredients: [
      { heading: '', items: [
        '1 tin chickpeas, drained and rinsed',
        '500g seasonal vegetables (e.g. sweet potatoes, swede, parsnips)',
        '1 red onion, thinly sliced',
        '2 tbsp extra virgin olive oil',
        'Zest of 1 unwaxed lemon',
        '1 tsp ground cumin',
        '1 tsp paprika powder',
        '½ tsp turmeric powder',
        '½ tsp cayenne pepper (optional)',
        'Salt and pepper, to taste',
        'Tenderstem broccoli, washed and chopped into bite-size pieces',
        '1 lemon, freshly sliced'
      ]},
      { heading: 'For the zesty coriander drizzle', items: [
        '1 handful fresh coriander, thick stems removed',
        'Juice of 1 lemon',
        '3 tbsp extra virgin olive oil',
        '2 cloves garlic, roasted (from the confit)',
        'Salt and pepper, to taste'
      ]},
      { heading: 'For the tomato confit', items: [
        '300g cherry tomatoes, washed and halved',
        '3 cloves garlic',
        'Extra virgin olive oil',
        'Fresh thyme',
        'Salt and pepper, to taste'
      ]}
    ],
    method: [
      { heading: 'For the tomato confit', steps: [
        'Preheat the oven to 135°C.',
        'Toss the halved cherry tomatoes with olive oil, garlic, thyme, salt and pepper.',
        'Arrange the tomatoes cut-side up in a baking dish, packed close together — the closer they are, the juicier and more concentrated the confit will be. Add enough olive oil for them to sit in.',
        'Slow-roast for 1.5–2 hours until tender and caramelised.'
      ]},
      { heading: 'For the traybake', steps: [
        'Preheat the oven to 200°C (180°C fan).',
        'In a large bowl, toss the chickpeas and vegetables (not the broccoli) with olive oil, lemon zest and spices to evenly coat.',
        'Spread the mix evenly on a baking tray, top with the lemon slices, and roast for 25 minutes.',
        'Toss the broccoli in the same bowl to pick up the leftover oil, then add it to the tray. Roast a further 5–10 minutes until everything is golden and tender.',
        'While roasting, blitz the coriander, lemon juice, olive oil, roasted garlic (from the confit) and salt and pepper in a food processor into a vibrant sauce.',
        'To serve, top the traybake with a few confit tomatoes and drizzle over the coriander sauce.'
      ]}
    ],
    status: 'ready'
  },
  {
    id: 'crispy-tofu',
    title: 'Crispy Tofu',
    category: 'Mains',
    emoji: '🍱',
    source: 'https://www.bbcgoodfood.com/recipes/crispy-tofu',
    sourceName: 'BBC Good Food',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'falafel',
    title: 'Falafel',
    category: 'Mains',
    emoji: '🧆',
    source: 'https://www.loveandlemons.com/wprm_print/42582',
    sourceName: 'Love and Lemons',
    time: 'Prep 15 min · Cook 25 min · Soak chickpeas 24 hr',
    servings: 'Serves 4 (12–15 falafel)',
    note: 'Use dried chickpeas soaked 24 hours, not canned — canned chickpeas will make the falafel mushy.',
    ingredients: [
      { heading: '', items: [
        '1 cup uncooked chickpeas, soaked 24 hours, drained, rinsed and patted dry',
        '½ cup chopped shallot or yellow onion',
        '3 garlic cloves',
        '1 tsp lemon zest',
        '1 tsp ground cumin',
        '1 tsp ground coriander',
        '¾ tsp sea salt',
        '¼ tsp cayenne pepper',
        '¼ tsp baking powder',
        '1 cup chopped fresh cilantro leaves and stems, patted dry',
        '1 cup chopped fresh parsley leaves and stems, patted dry',
        '1 tbsp extra-virgin olive oil, plus more for drizzling'
      ]},
      { heading: 'For serving', items: [
        'Pita bread (use gluten-free pita if needed)',
        'Hummus',
        'Diced veggies — tomato, cucumber',
        'Fresh herbs — chopped parsley, fresh mint',
        'Pickled red onions',
        'Tahini sauce'
      ]}
    ],
    method: [
      'Preheat the oven to 400°F (200°C) and line a large baking sheet with parchment paper.',
      'In a food processor, combine the chickpeas (use all of them — they expand during soaking), shallot, garlic, lemon zest, cumin, coriander, salt, cayenne, baking powder, cilantro, parsley and olive oil. Pulse until well combined but not puréed, scraping down the sides as needed.',
      'Using a 2-tablespoon scoop and your hands, form the mixture into 12–15 thick patties — don’t pack them too tight or the falafel will be dense. If they won’t hold together, pulse the mixture a few more times.',
      'Place the patties on the baking sheet and drizzle generously with olive oil (key to moist, crisp falafel without frying). Bake for 14 minutes, then flip and bake 10–12 minutes more until golden brown and crisp. During the last few minutes, wrap the pita in foil and warm it in the oven.',
      'Assemble pitas with hummus, diced veggies, falafel, herbs, pickled red onions and a generous drizzle of tahini sauce.'
    ],
    status: 'ready'
  },
  {
    id: 'harissa-tofu-flatbreads',
    title: 'Harissa Tofu Flatbreads & Butterbean Hummus',
    category: 'Mains',
    emoji: '🌯',
    source: 'https://www.rebelrecipes.com/harissa-tofu-flatbreads-with-creamy-butterbean-hummus/',
    sourceName: 'Rebel Recipes',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'black-bean-stew',
    title: 'Black Bean Stew',
    category: 'Mains',
    emoji: '🍲',
    source: 'https://makeitdairyfree.com/vegan-black-bean-stew/',
    sourceName: 'Make It Dairy Free',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'pita-bread',
    title: 'Pita Bread',
    category: 'Bakery',
    emoji: '🫓',
    source: 'https://myfoodstory.com/wprm_print/36376',
    sourceName: 'My Food Story',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'seeded-crackers',
    title: 'Seeded Crackers',
    category: 'Snacks & Dips',
    emoji: '🍘',
    source: 'https://plantbaes.com/healthy-seeded-crackers/',
    sourceName: 'Plantbaes',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'hummus',
    title: 'Hummus',
    category: 'Snacks & Dips',
    emoji: '🥣',
    source: 'https://www.loveandlemons.com/hummus-recipe/',
    sourceName: 'Love and Lemons',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'almond-bread',
    title: 'Almond Flour Bread',
    category: 'Bakery',
    emoji: '🍞',
    source: 'https://healthyrecipesblogs.com/gluten-free-bread/',
    sourceName: 'Healthy Recipes Blogs',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'chickpea-crackers',
    title: 'Chickpea Crackers',
    category: 'Snacks & Dips',
    emoji: '🧂',
    source: 'https://ohmyveggies.com/wprm_print/76043',
    sourceName: 'Oh My Veggies',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'boars-head-hummus',
    title: 'Sweet Chili Garlic Hummus',
    category: 'Snacks & Dips',
    emoji: '🌶️',
    source: 'https://shaneandsimple.com/boars-head-sweet-chili-garlic-hummus-copycat/',
    sourceName: 'Shane & Simple',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'sourdough-dinner-rolls',
    title: 'Sourdough Dinner Rolls',
    category: 'Bakery',
    emoji: '🥐',
    source: 'https://vm.tiktok.com/ZGdkUnr7E/',
    sourceName: 'TikTok',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'rye-sourdough',
    title: 'Rye Sourdough Bread',
    category: 'Bakery',
    emoji: '🍞',
    source: 'https://heartbeetkitchen.com/rye-sourdough-bread-recipe/',
    sourceName: 'Heartbeet Kitchen',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending',
    note: 'A dedicated bake-day companion app with a dough temperature calculator for this recipe is also available.',
    companionApp: '../Rye/index.html'
  },
  {
    id: 'sourdough-crackers',
    title: 'Sourdough Crackers',
    category: 'Snacks & Dips',
    emoji: '🍪',
    source: 'https://www.kingarthurbaking.com/recipes/sourdough-crackers-recipe',
    sourceName: 'King Arthur Baking',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'lentil-bolognese',
    title: 'Lentil Spaghetti Bolognese',
    category: 'Mains',
    emoji: '🍝',
    source: 'https://rainbowplantlife.com/wprm_print/lentil-bolognese',
    sourceName: 'Rainbow Plant Life',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'chickpea-meatballs',
    title: 'Chickpea Meatballs',
    category: 'Mains',
    emoji: '🍡',
    source: 'https://dishingouthealth.com/wprm_print/10105/',
    sourceName: 'Dishing Out Health',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'wholewheat-wraps',
    title: 'Wholewheat Wraps',
    category: 'Bakery',
    emoji: '🌮',
    source: 'https://www.theleangreenbean.com/homemade-whole-wheat-tortillas/',
    sourceName: 'The Lean Green Bean',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'butter-bean-curry',
    title: 'Butter Bean Curry',
    category: 'Mains',
    emoji: '🍛',
    source: 'https://www.bbcgoodfood.com/recipes/butter-bean-curry',
    sourceName: 'BBC Good Food',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'flapjacks',
    title: 'Almond Butter Flapjacks',
    category: 'Snacks & Dips',
    emoji: '🍫',
    source: 'https://www.cinnamonandkale.co.uk/wprm_print/almond-butter-flapjacks',
    sourceName: 'Cinnamon & Kale',
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  },
  {
    id: 'baguettes',
    title: 'Baguettes',
    category: 'Bakery',
    emoji: '🥖',
    source: 'https://lechefswife.com/baking-baguettes-for-beginners/',
    sourceName: "Le Chef's Wife",
    time: '',
    servings: '',
    ingredients: [],
    method: [],
    status: 'pending'
  }
];
