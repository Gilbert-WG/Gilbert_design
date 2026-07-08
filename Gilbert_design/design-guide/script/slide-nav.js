/* 슬라이드 동작 스크립트 — 단독 / Confluence·CMS HTML 임베드 공통.
   [주의] 디자인 골격의 일부입니다. 한 글자도 바꾸지 말고 그대로
          </body> 직전 <script> 한 개로 복사해 넣으세요.
   · 면 이동: 화면 좌/우 클릭, ← ↑ PageUp / → ↓ PageDown Space, 마우스 휠
   · 우상단 표식(.conf) 클릭 = 전체화면 토글(Esc 해제)
   · 스크립트 차단 시 모든 면이 세로 스택으로 보임(빈 화면 없음) */
(function () {
  var root = document.querySelector('.rpt');
  if (!root) return;
  // .deck 래퍼·DOM 중첩과 무관하게 클래스로 면을 찾는다(샌드박스 견고)
  var stages = [].slice.call(root.querySelectorAll('.stage'));
  var i = 0;
  function fsEl() { return document.fullscreenElement || document.webkitFullscreenElement; }
  function availWidth() {                                       // 슬라이드를 담은 컨테이너의 실제 폭
    var p = root.parentElement;
    while (p && p.clientWidth === 0) p = p.parentElement;        // 폭 0인 래퍼는 건너뜀
    var w = p ? p.clientWidth : root.clientWidth;
    return w || 1280;
  }
  function render() {
    var fs = fsEl() === root;
    var avail = fs ? innerWidth : availWidth();
    stages.forEach(function (s, j) {
      s.style.display = (j === i) ? 'flex' : 'none';            // 표시를 인라인으로 직접 제어
      if (fs) {                                                  // 전체화면: 화면에 맞춰 가운데 축소
        var k = Math.min(innerWidth / 1280, innerHeight / 720);
        s.style.transformOrigin = 'center';
        s.style.transform = (j === i) ? 'scale(' + k + ')' : '';
        s.style.marginBottom = '';
      } else {                                                   // 임베드: 컨테이너 폭에 맞춰 좌상단 축소(우측 잘림 방지)
        var k2 = Math.min(1, avail / 1280);
        s.style.transformOrigin = 'top left';
        s.style.transform = (k2 < 1) ? 'scale(' + k2 + ')' : '';
        s.style.marginBottom = (k2 < 1) ? (720 * k2 - 720) + 'px' : '';   // 축소된 높이만큼 빈 공간 보정
      }
    });
  }
  function go(n) { if (stages.length) { i = (n + stages.length) % stages.length; render(); } }
  function toggleFs() {
    try {
      if (fsEl() === root) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else (root.requestFullscreen || root.webkitRequestFullscreen).call(root);
    } catch (e) {}
  }
  // 다중 면일 때만 좌/우 투명 클릭 영역 주입(클릭은 iframe 내부 이벤트라 포커스 없이도 동작)
  if (stages.length > 1) {
    stages.forEach(function (s) {
      [['prev', -1], ['next', 1]].forEach(function (d) {
        var z = document.createElement('div');
        z.className = 'nav ' + d[0];
        z.addEventListener('click', function (e) { e.stopPropagation(); go(i + d[1]); });
        s.appendChild(z);
      });
    });
  }
  root.tabIndex = -1;
  root.addEventListener('mousedown', function () { try { root.focus(); } catch (e) {} });
  root.addEventListener('click', function (e) {
    if (e.target.closest('.conf')) { e.preventDefault(); e.stopPropagation(); toggleFs(); }
  });
  function onKey(e) {
    var el = e.target;
    if (el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable)) return;
    var k = e.key;
    if (k === ' ' || k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); go(i + 1); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); go(i - 1); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(stages.length - 1); }
    else if (k === 'f' || k === 'F') { e.preventDefault(); toggleFs(); }
  }
  root.addEventListener('keydown', onKey);
  document.addEventListener('keydown', function (e) { if (fsEl() === root) onKey(e); }); // 전체화면 땐 전역 키
  // 마우스 휠로 면 이동(다중 면일 때만). 포커스가 슬라이드 안일 때만 가로채 호스트 스크롤 방해 최소화
  if (stages.length > 1) {
    var wheelLock = false;
    root.addEventListener('wheel', function (e) {
      if (fsEl() !== root && !root.contains(document.activeElement)) return;
      e.preventDefault();
      if (wheelLock) return;
      wheelLock = true; setTimeout(function () { wheelLock = false; }, 450);
      go(i + (e.deltaY > 0 ? 1 : -1));
    }, { passive: false });
  }
  document.addEventListener('fullscreenchange', render);
  document.addEventListener('webkitfullscreenchange', render);
  window.addEventListener('resize', render);
  render();   // 항상 1회 실행(단일·다중 모두 축소 적용; 다중은 첫 면만 표시)
})();
