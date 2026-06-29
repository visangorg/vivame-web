/**
 * 비바人터뷰 아티클 데이터 및 모달
 */

var INTERVIEW_ARTICLES = {
  "1": {
    title: '"도덕을 오도독 씹어먹다?!"',
    vol: "vol.1",
    tag: "스터디",
    tagClass: "study",
    meta: "2025 | 비바코드 오도독 팀 · 최윤석 CP, 신예원 CP",
    thumb: "./assets/interview-vol1-hero.png",
    thumbAlt: "오도독 팀 비바코드 스터디 현장",
    templateId: "interview-article-vol1",
  },
  "2": {
    title: '"수를 풀며, 길을 만든다!"',
    vol: "vol.2",
    tag: "스터디",
    tagClass: "study",
    meta: "2025 | 비바코드 사내뮤공업 팀 · 최다솜 CP, 김현진 CP",
    thumb: "./assets/interview-vol2-hero.png",
    thumbAlt: "사내뮤공업 팀 콘텐츠 제작 현장 — 캡컷으로 음악 교육 영상을 편집하는 모습",
    templateId: "interview-article-vol2",
  },
};

function openInterviewModal(id) {
  var article = INTERVIEW_ARTICLES[id];
  var modal = document.getElementById("interviewModal");
  var body = document.getElementById("interviewModalBody");
  var source = document.getElementById(article.templateId);
  if (!modal || !body || !article || !source) return;

  body.innerHTML = source.innerHTML;
  modal.classList.remove("hidden");
  modal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";

  var closeBtn = document.getElementById("interviewModalClose");
  if (closeBtn) closeBtn.focus();
}

function closeInterviewModal() {
  var modal = document.getElementById("interviewModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

function initInterviewCards() {
  document.querySelectorAll(".interview-card").forEach(function (card) {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      var id = card.getAttribute("data-interview-id");
      if (id && INTERVIEW_ARTICLES[id]) {
        openInterviewModal(id);
      }
    });
  });

  var modal = document.getElementById("interviewModal");
  var backdrop = document.getElementById("interviewModalBackdrop");
  var closeBtn = document.getElementById("interviewModalClose");
  var content = document.getElementById("interviewModalContent");

  if (backdrop) backdrop.addEventListener("click", closeInterviewModal);
  if (closeBtn) closeBtn.addEventListener("click", closeInterviewModal);
  if (content) {
    content.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hasAttribute("hidden")) {
      closeInterviewModal();
    }
  });
}

window.openInterviewModal = openInterviewModal;
window.closeInterviewModal = closeInterviewModal;
