document.addEventListener('DOMContentLoaded', function () {
  var mount = document.getElementById('priceListMount');
  var featuredPrices = document.querySelectorAll('[data-price-item]');
  if (!mount && featuredPrices.length === 0) return;

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function formatNaira(amount) {
    var n = Number(amount) || 0;
    return '₦' + n.toLocaleString('en-NG');
  }

  function render(priceList) {
    if (mount) mount.innerHTML = '';
    priceList.categories.forEach(function (category) {
      if (!mount) return;
      var card = document.createElement('div');
      card.className = 'menu';

      var heading = document.createElement('span');
      heading.className = 'start';
      heading.textContent = category.name;
      card.appendChild(heading);

      var list = document.createElement('ul');
      category.items.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'price-row';

        var name = document.createElement('span');
        name.className = 'price-row__name';
        name.textContent = item.name;

        var price = document.createElement('span');
        price.className = 'price-row__price';
        price.textContent = formatNaira(item.price);

        li.appendChild(name);
        li.appendChild(price);
        list.appendChild(li);
      });
      card.appendChild(list);
      mount.appendChild(card);
    });

    featuredPrices.forEach(function (badge) {
      var categoryName = normalize(badge.getAttribute('data-price-category'));
      var itemName = normalize(badge.getAttribute('data-price-item'));
      var category = priceList.categories.find(function (entry) {
        return normalize(entry.name) === categoryName;
      });
      var item = category && category.items.find(function (entry) {
        return normalize(entry.name) === itemName;
      });

      badge.hidden = !item;
      badge.textContent = item ? formatNaira(item.price) : '';
    });
  }

  // Show the last-known prices immediately so the page is never empty,
  // then upgrade to the live copy once Supabase responds.
  render(DEFAULT_PRICE_LIST);

  if (typeof SUPABASE_CONFIGURED !== 'undefined' && SUPABASE_CONFIGURED) {
    supabaseClient
      .from('price_list')
      .select('data')
      .eq('id', 1)
      .single()
      .then(function (result) {
        if (result.data && result.data.data && Array.isArray(result.data.data.categories) && result.data.data.categories.length > 0) {
          render(result.data.data);
        }
      })
      .catch(function (error) {
        console.error('Could not load live prices, showing saved defaults instead:', error);
      });

    // Live updates: re-render instantly if the admin saves changes while
    // someone already has this page open.
    supabaseClient
      .channel('price_list_changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'price_list' }, function (payload) {
        if (payload.new && payload.new.data && Array.isArray(payload.new.data.categories)) {
          render(payload.new.data);
        }
      })
      .subscribe();
  }
});
