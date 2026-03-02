/**
 * VIVAME 랜딩 페이지 메인 스크립트
 * - 부드러운 스크롤
 * - 후기 캐러셀 네비게이션
 */

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('testimonialScroll');
  var prev = document.querySelector('.testimonial-nav-prev');
  var next = document.querySelector('.testimonial-nav-next');
  if (!el || !prev || !next) return;

  function getScrollAmount() {
    var first = el.querySelector('article');
    var gap = 24;
    if (first) {
      var rect = first.getBoundingClientRect();
      return rect.width + gap;
    }
    return 304;
  }

  function updateButtons() {
    var maxScroll = el.scrollWidth - el.clientWidth;
    prev.style.opacity = el.scrollLeft <= 0 ? '0.4' : '1';
    prev.style.pointerEvents = el.scrollLeft <= 0 ? 'none' : 'auto';
    next.style.opacity = el.scrollLeft >= maxScroll - 1 ? '0.4' : '1';
    next.style.pointerEvents = el.scrollLeft >= maxScroll - 1 ? 'none' : 'auto';
  }

  prev.addEventListener('click', function () {
    el.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });
  next.addEventListener('click', function () {
    el.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  el.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  updateButtons();
});
