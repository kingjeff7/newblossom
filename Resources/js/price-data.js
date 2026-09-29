// Default price list — shown instantly on page load, and used as a fallback
// if the live prices can't be reached. The admin page overwrites the live
// copy in Firestore; it never edits this file.
var DEFAULT_PRICE_LIST = {
  categories: [
    {
      name: 'Continental',
      items: [
        { name: 'Jollof Rice', price: 1000 },
        { name: 'Fried Rice', price: 1000 },
        { name: 'White Rice', price: 1000 },
        { name: 'Special Rice', price: 1000 },
        { name: 'Yam and Eggsauce', price: 1400 },
        { name: 'Yam and Garden-Egg', price: 1200 },
        { name: 'Spaghetti', price: 1200 },
        { name: 'Oil Rice', price: 1500 },
        { name: 'Native Rice', price: 1500 },
        { name: 'Chinese Rice', price: 1500 }
      ]
    },
    {
      name: 'African',
      items: [
        { name: 'Egusi', price: 1000 },
        { name: 'Okro soup', price: 1000 },
        { name: 'Pepper soup', price: 1500 },
        { name: 'Black soup', price: 1000 },
        { name: 'Banga soup', price: 1000 },
        { name: 'Bitter-leaf soup', price: 1000 },
        { name: 'Vegetable soup', price: 1000 },
        { name: 'Ogbonno soup', price: 1000 },
        { name: 'Yam-porridge', price: 1000 },
        { name: 'Garden-Egg', price: 800 }
      ]
    },
    {
      name: 'Bakery',
      items: [
        { name: 'Meat pie', price: 1000 },
        { name: 'Fish roll', price: 800 },
        { name: 'Jam-donought', price: 1000 },
        { name: 'Plain-donought', price: 900 },
        { name: 'Chicken pie', price: 1000 },
        { name: 'Vegetable roll', price: 1000 },
        { name: 'Burger', price: 2500 },
        { name: 'Butter bread', price: 1500 },
        { name: 'Family bread', price: 1800 },
        { name: 'Fruit bread', price: 1500 },
        { name: 'Sardine bread', price: 1500 },
        { name: 'Coconut bread', price: 1800 },
        { name: 'Chocolate bread', price: 1800 }
      ]
    },
    {
      name: 'Fast-Food',
      items: [
        { name: 'Burger', price: 2500 },
        { name: 'Salad', price: 500 },
        { name: 'Shawarma', price: 3500 },
        { name: 'Barbecue', price: 5500 },
        { name: 'Pop-corn', price: 800 },
        { name: 'Jollof', price: 1000 },
        { name: 'Fried-rice', price: 1000 },
        { name: 'Special rice', price: 1500 },
        { name: 'Oil rice', price: 1500 },
        { name: 'Vegetable-roll', price: 1000 }
      ]
    },
    {
      name: 'Ice-cream and drinks',
      items: [
        { name: 'Small cup', price: 1000 },
        { name: 'Medium cup', price: 1500 },
        { name: 'Large cup', price: 2500 },
        { name: 'Special-icecream', price: 4000 },
        { name: 'Tiganut drink', price: 1000 },
        { name: 'Milkshake', price: 2200 },
        { name: 'Zobo drink', price: 800 },
        { name: 'Yoghurt', price: 1500 }
      ]
    }
  ]
};
