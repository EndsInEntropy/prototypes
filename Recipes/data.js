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
    title: 'Sweet Potato Black Bean Stew',
    category: 'Mains',
    emoji: '🍲',
    source: 'https://makeitdairyfree.com/vegan-black-bean-stew/',
    sourceName: 'Make It Dairy Free',
    time: 'Prep 5 min · Cook 40 min',
    servings: 'Serves 6',
    note: 'Slow cooker: add everything and cook on high 2–3 hr or low 4–5 hr, until fragrant and the sweet potatoes are fork tender. Swapping the coconut milk: use a thick non-dairy milk like soy or extra-creamy oat — once the potatoes are tender, whisk 2 tbsp of the liquid with 1–2 tsp cornstarch and stir back in to thicken. Dried beans can replace canned, just cook them first.',
    ingredients: [
      { heading: '', items: [
        '1 tbsp olive oil',
        '1 medium onion, diced (any colour)',
        '½ tsp sea salt',
        '2 cloves garlic',
        '4 sprigs fresh thyme',
        '2 x 15.5oz cans black beans, drained and rinsed (880g)',
        '3 cups sweet potatoes, cubed (400g)',
        '1½ tbsp smoked paprika',
        '1½ tsp cumin',
        '1 tsp chili powder',
        '½ tsp onion powder',
        '1 x 13.5oz can full-fat coconut milk (400ml)',
        '½ cup vegetable stock (110ml)',
        '2 tbsp sriracha, more or less to taste'
      ]},
      { heading: 'Side options', items: [
        'Cooked brown rice or quinoa',
        'Mashed potatoes',
        'Baguette'
      ]}
    ],
    method: [
      'Heat the oil in a large skillet or pot with high walls over medium heat. Add the onion, sprinkle with the salt, and cook, stirring every few minutes, until translucent and lightly caramelised (6–8 min). Stir in the garlic and thyme and cook 1 minute more.',
      'Add the black beans, sweet potatoes, smoked paprika, cumin, chili powder and onion powder and stir well. Add the coconut milk, stock and sriracha, scraping up any browned bits from the bottom to incorporate the flavour.',
      'Without adjusting the heat, bring to a simmer. Cover and cook until the sweet potatoes are fork tender, stirring periodically, about 30–35 minutes.',
      'Serve warm with fresh herbs sprinkled over, with rice, mashed potatoes or bread on the side.'
    ],
    status: 'ready'
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
    time: 'Prep 10 min · Cook 45 min',
    servings: 'Serves 6',
    note: 'Use tomato paste from a tube, not the canned kind, for best results. No good balsamic on hand? Leave it out or use 1–2 tsp sugar instead.',
    ingredients: [
      { heading: '', items: [
        '1½ tbsp olive oil',
        '1 large onion, diced',
        '4 garlic cloves, minced',
        '1 tsp dried oregano',
        '1 tsp dried thyme (or use more oregano)',
        '1½ tsp kosher salt, plus more to taste',
        'Freshly ground black pepper, to taste',
        '1 tube (5.3oz/150g) tomato paste',
        '½ cup (120ml) dry red wine (optional)',
        '3 cups (720ml) vegetable broth',
        '1 cup (185g) red lentils, soaked (see step 1)',
        '¼ cup (32g) walnuts or pecans, finely crushed',
        '1 can (14.5oz/410g) crushed tomatoes, or whole peeled tomatoes crushed by hand',
        '12–16oz (340–454g) long, wide pasta (tagliatelle, pappardelle, fettuccine) or tubes (rigatoni, penne) or gnocchi',
        '1 tbsp high-quality balsamic vinegar',
        'Flat-leaf parsley or basil, chopped, to garnish (optional)'
      ]}
    ],
    method: [
      'Soak the lentils in water for 30–60 minutes. Meanwhile prep the other ingredients — chop the onion, garlic and walnuts.',
      'Heat a 12-inch deep sauté pan or Dutch oven over medium-high heat. Add the olive oil, then the onion with a pinch of salt. Cook, stirring occasionally, until a light brown fond forms on the pan, about 5 minutes. Deglaze with a few spoons of water and continue cooking, adding a splash of water every few minutes to prevent burning, until softened and golden brown, 9–10 minutes.',
      'Add the garlic, thyme, oregano, 1½ tsp salt and pepper to taste. Stir frequently and cook 60–90 seconds.',
      'Stir in the tomato paste and cook 2–3 minutes, stirring very frequently, until it darkens in colour.',
      'Optional: add the red wine and deglaze, scraping up the browned bits. Cook 1–2 minutes until the alcohol smell has burned off and the mixture is jammy.',
      'Pour in the broth, stirring the browned bits and tomato paste together. Add the lentils and walnuts and stir in. Bring to a boil, then reduce to medium-low and simmer rapidly for 20 minutes, stirring occasionally.',
      'Add the crushed tomatoes and simmer another 15–20 minutes, until the lentils are tender but still al dente, stirring occasionally to prevent sticking — add a little water or lower the heat if needed.',
      'Meanwhile, boil a large pot of well-salted water, cook the pasta until just al dente, reserve a ladle of pasta water, then drain (don’t rinse).',
      'Taste the bolognese and adjust salt and pepper, then stir in the balsamic vinegar to finish.',
      'Add the hot pasta to the bolognese and toss to coat, loosening with a splash of pasta water if needed. Garnish with parsley or basil.'
    ],
    status: 'ready'
  },
  {
    id: 'chickpea-meatballs',
    title: 'Chickpea Meatballs',
    category: 'Mains',
    emoji: '🍡',
    source: 'https://dishingouthealth.com/wprm_print/10105/',
    sourceName: 'Dishing Out Health',
    time: 'Prep 10 min · Cook 10 min',
    servings: 'Serves 4 (14 meatballs)',
    note: 'Store: cool fully, then refrigerate airtight up to 4 days. Freeze up to 3 months in an airtight bag; thaw overnight before reheating. Reheat in the oven/toaster oven at 325°F for 10–15 min for the crispest result. Can also bake (375°F, 18–20 min, flipping at 10 min) or air-fry (375°F, 11–14 min in a single layer, in batches) instead of pan-frying.',
    ingredients: [
      { heading: '', items: [
        '1 can (15oz) chickpeas, drained, rinsed and patted dry',
        '½ cup plain breadcrumbs (sub almond meal or ground oats for gluten-free)',
        '2 large eggs (sub flax eggs for vegan)',
        '¼ cup fresh parsley leaves',
        '2 tbsp nutritional yeast or grated Parmesan cheese',
        '2 tsp Italian seasoning',
        '1 tsp black pepper',
        '1 tsp garlic powder',
        '¾ tsp smoked paprika',
        '¾ tsp kosher salt',
        '2 tbsp extra-virgin olive oil'
      ]}
    ],
    method: [
      'Combine everything except the olive oil (chickpeas through salt) in a food processor. Blend until the mixture is cohesive and mostly smooth.',
      'Using a small cookie dough scoop or tablespoon, gather heaping tablespoon amounts and roll into balls — you should get about 14 golfball-sized meatballs. If the mixture feels too wet to form, add 1–2 more tbsp breadcrumbs.',
      'Heat the olive oil in a large skillet over medium heat. Once hot, add the meatballs and cook 6–8 minutes, turning to brown all sides, until golden.',
      'Serve with pasta and sauce, in a sandwich or pita, over a salad, or with your favourite dipping sauce.'
    ],
    status: 'ready'
  },
  {
    id: 'wholewheat-wraps',
    title: 'Wholewheat Wraps',
    category: 'Bakery',
    emoji: '🌮',
    source: 'https://www.theleangreenbean.com/homemade-whole-wheat-tortillas/',
    sourceName: 'The Lean Green Bean',
    time: 'Prep 30 min · Cook 20 min',
    servings: 'Makes 8',
    note: 'Use immediately, or store in an airtight container in the fridge, or freeze.',
    ingredients: [
      { heading: '', items: [
        '2 cups white whole wheat flour',
        '3 tbsp extra virgin olive oil',
        '½ tsp salt',
        '⅔ cup warm water'
      ]}
    ],
    method: [
      'In a bowl, mix together the flour, oil and salt.',
      'Slowly add the warm water while stirring until a rough dough comes together. Add a little extra water if needed.',
      'Turn the dough onto the counter and knead for about 2 minutes.',
      'Return to the bowl and let rest for 20 minutes.',
      'Divide the dough into 8 equal balls.',
      'Roll each ball into a thin circle.',
      'Heat a pan over medium-high heat and grease lightly.',
      'Drop one dough circle into the pan and cook until bubbles form, about 1 minute.',
      'Flip and cook another minute, pressing down with a spatula if needed. Repeat with the remaining dough.'
    ],
    status: 'ready'
  },
  {
    id: 'butter-bean-curry',
    title: 'Butter Bean Curry',
    category: 'Mains',
    emoji: '🍛',
    source: 'https://www.bbcgoodfood.com/recipes/butter-bean-curry',
    sourceName: 'BBC Good Food',
    time: 'Prep 15 min · Cook 40 min',
    servings: 'Serves 2 (makes extra for wraps another day)',
    note: 'Serve half the curry and raita now; cool and chill the rest to use for butter bean curry wraps another day. Curry keeps chilled up to 3 days, raita up to 1 day.',
    ingredients: [
      { heading: '', items: [
        '2 tbsp rapeseed oil',
        '2 onions (320g), finely chopped',
        '1 tbsp finely grated ginger',
        '3 large garlic cloves, finely grated',
        '1 red chilli, deseeded and sliced',
        '2 x 400g cans butter beans',
        '2 tsp vegan bouillon powder',
        '1 tsp cumin seeds',
        '2 tbsp medium curry powder',
        '400g can chopped tomatoes',
        '1 aubergine (320g), cut into cubes',
        '15g coriander, chopped',
        '250g pouch cooked wholegrain rice'
      ]},
      { heading: 'For the raita', items: [
        '2 small bananas, peeled and finely chopped',
        '½ lime, juiced',
        '¼ cucumber, finely chopped',
        '1 small red onion (60g), finely chopped',
        '1 red chilli, deseeded and sliced'
      ]}
    ],
    method: [
      'Heat the oil in a non-stick pan over medium heat and fry the onions for 8 minutes until softened. Add the ginger, garlic and chilli and cook a few minutes more. Measure 300ml of the liquid from the cans of butter beans into a jug and mix in the bouillon powder to make a stock (it may look thick or lumpy — it will dissolve in the pan as it cooks).',
      'Stir the cumin seeds and curry powder into the onions, followed by the tomatoes, beans and aubergine. Add the stock. Bring to the boil, then reduce the heat to medium-low, cover and simmer for 30 minutes until the veg is tender. Stir in half the coriander and remove from the heat.',
      'For the raita, toss the bananas in the lime juice, then add the cucumber, onion, chilli and remaining coriander. Warm the rice following the pack instructions and serve with half the curry and raita.'
    ],
    status: 'ready'
  },
  {
    id: 'flapjacks',
    title: 'Almond Butter Flapjacks',
    category: 'Snacks & Dips',
    emoji: '🍫',
    source: 'https://www.cinnamonandkale.co.uk/wprm_print/almond-butter-flapjacks',
    sourceName: 'Cinnamon & Kale',
    time: 'Prep 10 min · Cook 20 min',
    servings: 'Serves 6 · 10 x 20cm tin',
    note: 'Chopped almonds are optional — leave out and add an extra 20g oats instead. For vegan, use maple syrup instead of honey. For gluten free, use certified gluten-free oats. A 1lb/450g loaf tin is about the right size; to double the recipe use a 20 x 20cm tin.',
    ingredients: [
      { heading: '', items: [
        '3 tbsp almond butter',
        '3 tbsp honey',
        '100g oats (rolled or porridge)',
        '20g chopped almonds'
      ]}
    ],
    method: [
      'Preheat the oven to 160°C (140°C fan).',
      'Line the base of a 10 x 20cm baking tin and lightly grease the sides.',
      'Mix the almond butter and honey together in a bowl. If it won’t go smooth, warm the bowl over a pan of boiling water.',
      'Add the oats and chopped almonds and stir well.',
      'Spoon the mixture into the lined tin and level with the back of the spoon.',
      'Bake for 20 minutes, turning the tray partway through if needed so the flapjacks brown evenly.',
      'Remove from the tin when cool enough to handle and cut into slices or squares while still warm.'
    ],
    status: 'ready'
  },
  {
    id: 'baguettes',
    title: 'French Baguettes',
    category: 'Bakery',
    emoji: '🥖',
    source: 'https://lechefswife.com/baking-baguettes-for-beginners/',
    sourceName: "Le Chef's Wife",
    time: 'Prep 2¼ hr · Cook 30 min',
    servings: 'Makes 2 baguettes',
    note: 'Oven temperatures vary a lot — watch closely after 18 minutes. You want a deep golden crust, not too dark; if it browns too fast, drop the rack a notch and take the baguettes out a little earlier. Don’t turn the heat down too much though — the high heat is what makes the crust crackly.',
    ingredients: [
      { heading: '', items: [
        '8g traditional yeast (or 2 tsp)',
        '1 tbsp honey',
        '1¼ cups warm water (not hot — just enough to wake the yeast)',
        '1 tbsp fleur de sel (or 1 tsp if using table salt)',
        '2½ cups bread flour (all-purpose also works)'
      ]}
    ],
    method: [
      'Proof the yeast: put the warm water in a big mixing bowl, add the yeast and honey, stir briefly, then let sit on the counter for 10 minutes until the yeast wakes up and rises to the surface.',
      'Add the salt, then slowly add the flour until a shaggy dough forms — start with a spatula, then bring it together with your hands into a rough ball. Don’t overwork it; no stand mixer needed.',
      'Dust the top with a little flour, cover with a towel, and set somewhere warm (near a fridge or dryer motor works well). Let rise until doubled in size, about 1 hour, then divide the dough in two.',
      'Shape each half into a baguette: knead gently until firmer, folding the dough over itself (adding a touch more flour if sticky). Flatten into a rectangle, fold the top down about ¾ of the way like an envelope and press the seam. Roll the folded top down into a mini oblong, press the seam again and flip seam-side down. Then, with fingers spread on both hands, gently roll it back and forth to elongate into a baguette shape about 12 inches long.',
      'Place the shaped baguettes on a floured cookie sheet or baguette pan. Score the tops with a razor, sharp knife tip, or kitchen scissors.',
      'Sprinkle a little more flour and fleur de sel over the top, then let rise uncovered for 30 minutes while the oven preheats.',
      'Heat the oven to 460°F. Once hot, fill a 9-inch pan halfway with water and place it on the bottom rack — this creates the steam that gives the crackly crust.',
      'Bake for 25 minutes, watching closely after 18 — they’re done when dark golden brown and hollow-sounding when tapped. Carefully remove the water pan and bake about 5 minutes more until deeply golden and hollow-sounding.'
    ],
    status: 'ready'
  }
];
