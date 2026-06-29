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
    meta: "2025 | 비바코드 수풀길 팀 · 유지인 CP, 정세연 CP",
    thumb: "./assets/interview-vol2-hero.png",
    thumbAlt: "수풀길 팀 비바코드 스터디 현장 — 팀원들이 교과서 자료를 보며 토론하는 모습",
    templateId: "interview-article-vol2",
  },
  "3": {
    title: '"가내수공업? 아니죠, 우리는 사내뮤공업!"',
    vol: "vol.3",
    tag: "스터디",
    tagClass: "study",
    meta: "2025 | 비바코드 사내뮤공업 팀 · 최다솜 CP, 김현진 CP",
    thumb: "./assets/interview-vol3-mugong-hero.png",
    thumbAlt: "사내뮤공업 팀 콘텐츠 제작 현장 — 캡컷으로 음악 교육 영상을 편집하는 모습",
    templateId: "interview-article-vol3",
  },
  "4": {
    title: '🏆 "연속 3년, 혁신을 탭하다!" 기출탭탭 Cell의 이야기',
    vol: "vol.4",
    tag: "업무",
    tagClass: "work",
    meta: "2025 | 기출탭탭 Cell · 박희순 CP, 허은실 CP, 김나래 CP",
    thumb: "./assets/interview-vol3-hero.png",
    thumbAlt: "기출탭탭 AES KOREA Awards 2025 최고 혁신상 수상",
    templateId: "interview-article-vol4",
  },
  "5": {
    title: '"국정을 준비한다는 것" 단 한 번의 실사를 위한 비상의 기록',
    vol: "vol.5",
    tag: "업무",
    tagClass: "work",
    meta: "2025 | 국정교과서 발행사 선정 · 공아름 CP, 김욱 CP, 석진안 CP, 최윤석 CP",
    thumb: "./assets/interview-vol5-hero.png",
    thumbAlt: "라키비움 실사 준비 공간 — 국정교과서 발행사 선정 평가를 위해 마련된 회의실",
    templateId: "interview-article-vol5",
  },
  "6": {
    title: '"우리는 어떤 기준으로 국어 교과서를 만들었을까"',
    vol: "vol.6",
    tag: "업무",
    tagClass: "work",
    meta: "2025 | 중고등 국어 교과서 · 이장근 CP 외 5인",
    thumb: "./assets/interview-vol6-hero.png",
    thumbAlt: "2022 개정 비상 중고등 국어 교과서 라인업",
    templateId: "interview-article-vol6",
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
