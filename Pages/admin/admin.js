document.addEventListener('DOMContentLoaded', function () {
  var configWarning = document.getElementById('configWarning');
  var loginSection = document.getElementById('loginSection');
  var editorSection = document.getElementById('editorSection');
  var signOutBtn = document.getElementById('signOutBtn');
  var loginForm = document.getElementById('loginForm');
  var loginError = document.getElementById('loginError');
  var categoriesMount = document.getElementById('categoriesMount');
  var addCategoryBtn = document.getElementById('addCategoryBtn');
  var saveBtn = document.getElementById('saveBtn');
  var saveStatus = document.getElementById('saveStatus');
  var categoryTemplate = document.getElementById('categoryTemplate');
  var itemTemplate = document.getElementById('itemTemplate');

  if (typeof SUPABASE_CONFIGURED === 'undefined' || !SUPABASE_CONFIGURED) {
    configWarning.hidden = false;
    loginSection.hidden = false;
    return;
  }

  function showSignedIn() {
    loginSection.hidden = true;
    editorSection.hidden = false;
    signOutBtn.hidden = false;
    loadEditor();
  }

  function showSignedOut() {
    loginSection.hidden = false;
    editorSection.hidden = true;
    signOutBtn.hidden = true;
  }

  // ---------- Auth ----------
  supabaseClient.auth.getSession().then(function (result) {
    if (result.data.session) {
      showSignedIn();
    } else {
      showSignedOut();
    }
  });

  supabaseClient.auth.onAuthStateChange(function (event, session) {
    if (session) {
      showSignedIn();
    } else {
      showSignedOut();
    }
  });

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    loginError.textContent = '';
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    supabaseClient.auth.signInWithPassword({ email: email, password: password })
      .then(function (result) {
        if (result.error) {
          loginError.textContent = 'Could not sign in: ' + result.error.message;
        }
      });
  });

  signOutBtn.addEventListener('click', function () {
    supabaseClient.auth.signOut();
  });

  // ---------- Editor ----------
  function loadEditor() {
    saveStatus.textContent = 'Loading current prices…';
    supabaseClient
      .from('price_list')
      .select('data')
      .eq('id', 1)
      .single()
      .then(function (result) {
        var data = (result.data && result.data.data && Array.isArray(result.data.data.categories) && result.data.data.categories.length > 0)
          ? result.data.data
          : DEFAULT_PRICE_LIST;
        renderCategories(data);
        saveStatus.textContent = result.error ? 'Could not load live prices, showing saved defaults: ' + result.error.message : '';
      });
  }

  function renderCategories(data) {
    categoriesMount.innerHTML = '';
    data.categories.forEach(function (category) {
      addCategoryCard(category);
    });
  }

  function addCategoryCard(category) {
    var node = categoryTemplate.content.cloneNode(true);
    var card = node.querySelector('.admin-category');
    var nameInput = node.querySelector('.admin-category__name');
    var itemsMount = node.querySelector('.admin-items');
    var addItemBtn = node.querySelector('.admin-add-item-btn');
    var removeCategoryBtn = node.querySelector('.remove-category-btn');

    nameInput.value = category ? category.name : '';

    (category && category.items ? category.items : []).forEach(function (item) {
      itemsMount.appendChild(buildItemRow(item));
    });

    addItemBtn.addEventListener('click', function () {
      itemsMount.appendChild(buildItemRow({ name: '', price: '' }));
    });

    removeCategoryBtn.addEventListener('click', function () {
      if (confirm('Remove this whole category?')) {
        card.remove();
      }
    });

    categoriesMount.appendChild(node);
  }

  function buildItemRow(item) {
    var node = itemTemplate.content.cloneNode(true);
    var row = node.querySelector('.admin-item');
    var nameInput = node.querySelector('.admin-item__name');
    var priceInput = node.querySelector('.admin-item__price');
    var removeBtn = node.querySelector('.remove-item-btn');

    nameInput.value = item.name || '';
    priceInput.value = item.price || '';

    removeBtn.addEventListener('click', function () {
      row.remove();
    });

    return row;
  }

  addCategoryBtn.addEventListener('click', function () {
    addCategoryCard({ name: '', items: [] });
  });

  function collectData() {
    var categories = [];
    categoriesMount.querySelectorAll('.admin-category').forEach(function (card) {
      var name = card.querySelector('.admin-category__name').value.trim();
      if (!name) return;
      var items = [];
      card.querySelectorAll('.admin-item').forEach(function (row) {
        var itemName = row.querySelector('.admin-item__name').value.trim();
        var price = Number(row.querySelector('.admin-item__price').value) || 0;
        if (itemName) items.push({ name: itemName, price: price });
      });
      categories.push({ name: name, items: items });
    });
    return { categories: categories };
  }

  saveBtn.addEventListener('click', function () {
    var data = collectData();
    saveBtn.disabled = true;
    saveStatus.textContent = 'Saving…';
    supabaseClient
      .from('price_list')
      .update({ data: data, updated_at: new Date().toISOString() })
      .eq('id', 1)
      .then(function (result) {
        saveStatus.textContent = result.error
          ? 'Could not save: ' + result.error.message
          : 'Saved — live for everyone now.';
        saveBtn.disabled = false;
      });
  });
});
