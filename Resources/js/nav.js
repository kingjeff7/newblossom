document.addEventListener('DOMContentLoaded', function () {
  var sidebtn = document.getElementById('sbtn');
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('sidebarBackdrop');

  function openSidebar() {
    sidebar.classList.add('sidetoggle');
    sidebtn.classList.add('open');
    sidebtn.innerHTML = '<i class="fa-solid fa-xmark btnicon"></i>';
    if (backdrop) {
      backdrop.style.display = 'block';
      requestAnimationFrame(function () { backdrop.classList.add('visible'); });
    }
    var firstLink = sidebar.querySelector('.sidebar__link');
    if (firstLink) firstLink.focus();
  }

  function closeSidebar() {
    sidebar.classList.remove('sidetoggle');
    sidebtn.classList.remove('open');
    sidebtn.innerHTML = '<i class="fa-solid fa-bars btnicon"></i>';
    if (backdrop) {
      backdrop.classList.remove('visible');
      setTimeout(function () { backdrop.style.display = 'none'; }, 300);
    }
  }

  sidebtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (sidebar.classList.contains('sidetoggle')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeSidebar);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && sidebar.classList.contains('sidetoggle')) {
      closeSidebar();
      sidebtn.focus();
    }
  });

  // Marks the page as scrolled so the header can switch from its
  // transparent over-the-hero look to a solid bar. Harmless on pages
  // without a hero image — their header is solid either way.
  function updateScrolled() {
    document.body.classList.toggle('scrolled', window.scrollY > 40);
  }
  updateScrolled();
  window.addEventListener('scroll', updateScrolled, { passive: true });
});
