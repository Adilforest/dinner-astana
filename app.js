// ---------- переключение сетов внутри карточки ----------
document.querySelectorAll('.tabs').forEach(function (group) {
  group.addEventListener('click', function (e) {
    var btn = e.target.closest('.tab');
    if (!btn) return;
    var card = group.closest('.card');

    group.querySelectorAll('.tab').forEach(function (t) {
      var on = t === btn;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    card.querySelectorAll('.panel').forEach(function (p) {
      p.classList.toggle('is-active', p.id === btn.dataset.target);
    });
  });
});

// ---------- подсветка текущего заведения в верхнем меню ----------
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.quicknav a'));
  var nav = document.querySelector('.quicknav');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });

  var current = null;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var link = map[en.target.id];
      if (!link || link === current) return;

      links.forEach(function (a) { a.classList.remove('is-current'); });
      link.classList.add('is-current');
      current = link;

      // подтягиваем активную кнопку в видимую часть ленты
      var left = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
      nav.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  document.querySelectorAll('.card').forEach(function (c) { io.observe(c); });
})();

// ---------- ленивая подгрузка постов Instagram ----------
var igScriptLoaded = false;

function loadIgScript(cb) {
  if (igScriptLoaded) { cb(); return; }
  igScriptLoaded = true;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.instagram.com/embed.js';
  s.onload = cb;
  document.body.appendChild(s);
}

document.querySelectorAll('.ig__toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var slot = btn.parentElement.querySelector('.ig__slot');

    if (slot.dataset.loaded === '1') {
      slot.hidden = !slot.hidden;
      btn.textContent = slot.hidden ? 'Показать фото из Instagram' : 'Скрыть фото';
      return;
    }

    var url = btn.dataset.ig;
    slot.innerHTML =
      '<div class="ig__note">Загружаю пост…</div>' +
      '<blockquote class="instagram-media" data-instgrm-captioned ' +
      'data-instgrm-permalink="' + url + '" data-instgrm-version="14"></blockquote>';
    slot.dataset.loaded = '1';
    slot.hidden = false;
    btn.textContent = 'Скрыть фото';

    loadIgScript(function () {
      if (window.instgrm) window.instgrm.Embeds.process();
    });
    if (window.instgrm) window.instgrm.Embeds.process();

    // Instagram иногда не отдаёт встроенный пост. Тогда показываем обычную ссылку.
    var tries = 0;
    var timer = setInterval(function () {
      var frame = slot.querySelector('iframe');
      var note = slot.querySelector('.ig__note');

      if (frame && frame.clientHeight > 100) {
        if (note) note.remove();
        clearInterval(timer);
        return;
      }
      if (++tries > 12) {
        clearInterval(timer);
        slot.innerHTML =
          '<div class="ig__note">Instagram не показал пост прямо здесь.<br>' +
          '<a href="' + url + '" target="_blank" rel="noopener">Открыть его в приложении ↗</a></div>';
        var dup = btn.parentElement.querySelector('.ig__link');
        if (dup) dup.hidden = true;
      }
    }, 500);
  });
});
