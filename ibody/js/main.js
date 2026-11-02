/* i-body — 공통 스크립트 (의존성 없음) */
(function () {
  // 헤더: 스크롤 시 하단 보더
  var header = document.querySelector('.header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-fixed', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 모바일 메뉴
  var toggle = document.querySelector('.menu-toggle');
  var gnb = document.querySelector('.gnb');
  if (toggle && gnb) {
    toggle.addEventListener('click', function () {
      var open = gnb.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // 현재 페이지 메뉴 활성화
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.gnb a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('is-active');
  });

  // 메인 슬라이더
  var hero = document.querySelector('.hero');
  if (!hero) return;
  var slides = hero.querySelectorAll('.slide');
  var cur = hero.querySelector('.ctrl .current');
  var gauge = hero.querySelector('.ctrl .gauge span');
  var playBtn = hero.querySelector('.ctrl .play');
  var idx = 0, timer = null, playing = true, DUR = 5000, start = 0, raf = null;

  function show(i) {
    slides.forEach(function (s, n) { s.classList.toggle('is-on', n === i); });
    if (cur) cur.textContent = String(i + 1).padStart(2, '0');
    idx = i; start = performance.now();
  }
  function tick(now) {
    if (playing && gauge) {
      var p = Math.min(1, (now - start) / DUR);
      gauge.style.width = (p * 100) + '%';
      if (p >= 1) show((idx + 1) % slides.length);
    }
    raf = requestAnimationFrame(tick);
  }
  hero.querySelector('.ctrl .prev') && hero.querySelector('.ctrl .prev').addEventListener('click', function () { show((idx - 1 + slides.length) % slides.length); });
  hero.querySelector('.ctrl .next') && hero.querySelector('.ctrl .next').addEventListener('click', function () { show((idx + 1) % slides.length); });
  if (playBtn) playBtn.addEventListener('click', function () {
    playing = !playing; playBtn.textContent = playing ? '❚❚' : '▶'; start = performance.now();
  });
  show(0);
  raf = requestAnimationFrame(tick);
})();
