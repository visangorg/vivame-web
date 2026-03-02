/**
 * 혹시, 당신도 비바미? - 퀴즈 모달
 */

let quizAnswers = {};

const QUIZ_RESULTS = {
  0: {
    title: "아직은 잠시 고민 중이시네요 🙂",
    desc: "지금은 아니어도 괜찮아요.<br>비바미는 언제든 마음이 움직일 때 시작할 수 있습니다.",
    cta: "👉 한 번 더 알아보며 천천히 생각해보셔도 좋아요.",
    btnText: "한 번 더 알아보기",
    btnHref: null,
    scrollToSection: "requirements",
  },
  1: {
    title: "비바미의 씨앗을 발견했어요 🌿",
    desc: "아직은 조용하지만, 마음 어딘가에 변화의 씨앗이 있네요.<br>비바미는 거창한 사람이 아니라, 작은 관심에서 시작됩니다.",
    cta: "👉 한 번 더 읽어보고… 슬쩍 지원해볼까요?",
    btnText: "한 번 더 알아보기",
    btnHref: null,
    scrollToSection: "requirements",
  },
  2: {
    title: "이미 비바미 기질이 보여요 🙂",
    desc: "회사에 대한 관심과 작은 변화에 대한 마음,<br>그거면 충분합니다. : )",
    cta: "👉 이제는 생각보다 행동이 더 쉬울지도 몰라요.",
    btnText: "지원해볼게요",
    btnHref: "./apply.html",
  },
  3: {
    title: "거의 비바미입니다 💙",
    desc: "사람, 변화, 그리고 재미.<br>이미 다 갖추셨습니다!",
    cta: "👉 지원 버튼만 남았네요!",
    btnText: "지원하기",
    btnHref: "./apply.html",
  },
  4: {
    title: "시피님… 비바미 맞죠? 😎",
    desc: "이 정도면 합류만 남았습니다.<br>함께 움직이면, 문화는 더 재밌어지지 않을까요?",
    cta: "👉 지금 지원하면 딱이에요.",
    btnText: "지금 지원하기",
    btnHref: "./apply.html",
  },
};

function openQuizModal() {
  const modal = document.getElementById("quizModal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleQuizEscape);
  }
}

function closeQuizModal() {
  const modal = document.getElementById("quizModal");
  if (!modal) return;

  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
  document.removeEventListener("keydown", handleQuizEscape);
  quizAnswers = {};

  const questions = document.getElementById("quizQuestions");
  const submitBtn = document.getElementById("submitQuizBtn");
  const result = document.getElementById("quizResult");
  const quizSection = document.getElementById("quizSection");

  if (quizSection) quizSection.classList.remove("hidden");
  if (questions) {
    questions.querySelectorAll(".quiz-yesno-btn").forEach((btn) => {
      btn.classList.remove("quiz-yesno-selected");
      btn.classList.add("quiz-yesno-unselected");
    });
  }
  if (submitBtn) submitBtn.classList.remove("hidden");
  if (result) result.classList.add("hidden");
}

function handleQuizEscape(e) {
  if (e.key === "Escape") closeQuizModal();
}

function answerQuestion(questionId, answer) {
  quizAnswers[questionId] = answer;

  const btns = document.querySelectorAll(`[data-question="${questionId}"]`);
  btns.forEach((btn) => {
    btn.classList.remove("quiz-yesno-selected", "quiz-yesno-unselected");
    const isYes = btn.dataset.answer === "yes";
    if ((isYes && answer) || (!isYes && !answer)) {
      btn.classList.add("quiz-yesno-selected");
    } else {
      btn.classList.add("quiz-yesno-unselected");
    }
  });
}

function closeAndScrollToSection(sectionId) {
  closeQuizModal();
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 150);
}

function submitQuiz() {
  const score = Object.values(quizAnswers).filter(Boolean).length;
  const result = QUIZ_RESULTS[score] ?? QUIZ_RESULTS[0];

  const quizSection = document.getElementById("quizSection");
  const resultDiv = document.getElementById("quizResult");

  if (quizSection) quizSection.classList.add("hidden");
  if (resultDiv) {
    resultDiv.classList.remove("hidden");
    const isScrollAction = result.scrollToSection && !result.btnHref;
    const btnMarkup = isScrollAction
      ? `<button type="button" onclick="closeAndScrollToSection('${result.scrollToSection}')" class="inline-block mt-6 px-6 py-3.5 bg-[#00B5E2] text-white rounded-2xl font-bold text-base hover:bg-[#00A3CF] transition-colors duration-200 w-full text-center">${result.btnText}</button>`
      : `<a href="${result.btnHref}" class="inline-block mt-6 px-6 py-3.5 bg-[#00B5E2] text-white rounded-2xl font-bold text-base hover:bg-[#00A3CF] transition-colors duration-200 w-full text-center">${result.btnText}</a>`;
    resultDiv.innerHTML = `
      <div class="quiz-result-inner text-left py-2">
        <h4 class="quiz-result-title">${result.title}</h4>
        <p class="quiz-result-desc">${result.desc}</p>
        <p class="quiz-result-cta">${result.cta}</p>
        ${btnMarkup}
      </div>
    `;
  }
}

function initQuizModal() {
  const modal = document.getElementById("quizModal");
  if (!modal) return;

  const backdrop = document.getElementById("quizModalBackdrop");
  if (backdrop) {
    backdrop.addEventListener("click", closeQuizModal);
  }

  const content = document.getElementById("quizModalContent");
  if (content) {
    content.addEventListener("click", (e) => e.stopPropagation());
  }
}
