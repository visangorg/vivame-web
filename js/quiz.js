/**
 * VIVAME 적합도 퀴즈 모달
 */

let quizAnswers = {};

function openQuizModal() {
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeQuizModal() {
  const modal = document.getElementById('quizModal');
  if (!modal) return;

  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  quizAnswers = {};

  const questions = document.getElementById('quizQuestions');
  const submitBtn = document.getElementById('submitQuizBtn');
  const result = document.getElementById('quizResult');

  if (questions) questions.classList.remove('hidden');
  if (submitBtn) submitBtn.classList.add('hidden');
  if (result) result.classList.add('hidden');

  document.querySelectorAll('.answer-btn').forEach((btn) => {
    btn.classList.remove('bg-[#00B5E2]', 'text-white', 'shadow-lg', 'bg-gray-800');
    btn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200');
  });
}

function answerQuestion(questionId, answer) {
  quizAnswers[questionId] = answer;

  const buttons = document.querySelectorAll(`[data-question="${questionId}"]`);
  buttons.forEach((btn, index) => {
    btn.classList.remove(
      'bg-[#00B5E2]', 'text-white', 'shadow-lg', 'bg-gray-800',
      'bg-white', 'text-gray-700'
    );
    if ((index === 0 && answer) || (index === 1 && !answer)) {
      btn.classList.add(answer ? 'bg-[#00B5E2]' : 'bg-gray-800', 'text-white', 'shadow-lg');
    } else {
      btn.classList.add('bg-white', 'text-gray-700');
    }
  });

  const submitBtn = document.getElementById('submitQuizBtn');
  if (Object.keys(quizAnswers).length === 4 && submitBtn) {
    submitBtn.classList.remove('hidden');
  }
}

function submitQuiz() {
  const yesCount = Object.values(quizAnswers).filter(Boolean).length;
  const isReady = yesCount >= 3;

  const questions = document.getElementById('quizQuestions');
  const submitBtn = document.getElementById('submitQuizBtn');
  const resultDiv = document.getElementById('quizResult');

  if (questions) questions.classList.add('hidden');
  if (submitBtn) submitBtn.classList.add('hidden');
  if (resultDiv) resultDiv.classList.remove('hidden');

  if (isReady) {
    resultDiv.innerHTML = `
      <div class="w-24 h-24 bg-[#00B5E2]/10 rounded-full flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00B5E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
      </div>
      <h4 class="text-2xl lg:text-3xl font-bold text-gray-900">축하합니다! 🎉</h4>
      <p class="text-lg text-gray-700">
        당신은 VIVAME에 완벽하게 적합합니다!<br />
        지금 바로 지원하여 변화의 주인공이 되어보세요.
      </p>
      <a href="./apply.html" class="inline-block px-8 py-4 bg-[#00B5E2] text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300">
        지금 바로 지원하기
      </a>
    `;
  } else {
    resultDiv.innerHTML = `
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
      </div>
      <h4 class="text-2xl lg:text-3xl font-bold text-gray-900">조금 더 고민해보세요</h4>
      <p class="text-lg text-gray-700">
        VIVAME 활동에 대해 조금 더 알아보신 후<br />
        다시 도전해보시는 건 어떨까요?
      </p>
      <button type="button" onclick="closeQuizModal()" class="px-8 py-4 bg-gray-800 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300">
        더 알아보기
      </button>
    `;
  }
}

function initQuizModal() {
  const modal = document.getElementById('quizModal');
  if (!modal) return;

  modal.addEventListener('click', function (e) {
    if (e.target === this) closeQuizModal();
  });
}
