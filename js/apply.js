/**
 * VIVAME 지원서 폼 스크립트
 * - 진행률 계산
 * - 폼 유효성 검사
 */

const form = document.getElementById('applicationForm');
const submitBtn = document.getElementById('submitBtn');
const validationMessage = document.getElementById('validationMessage');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const successModal = document.getElementById('successModal');

const fields = {
  name: document.getElementById('name'),
  cell: document.getElementById('cell'),
  reason: document.getElementById('reason'),
  expectations: document.getElementById('expectations'),
  recommend: document.getElementById('recommend'),
  agree: document.getElementById('agree')
};

function calculateProgress() {
  let filled = 0;
  const total = 4;
  if (fields.name?.value?.trim()) filled++;
  if (fields.cell?.value?.trim()) filled++;
  if (fields.reason?.value?.trim()) filled++;
  if (fields.expectations?.value?.trim()) filled++;
  return (filled / total) * 100;
}

function isFormValid() {
  return (
    fields.name?.value?.trim() &&
    fields.cell?.value?.trim() &&
    fields.reason?.value?.trim() &&
    fields.expectations?.value?.trim() &&
    fields.agree?.checked
  );
}

function updateProgress() {
  if (!progressBar || !progressText) return;
  const progress = calculateProgress();
  progressBar.style.width = progress + '%';
  progressText.textContent = Math.round(progress) + '%';
}

function updateSubmitButton() {
  if (!submitBtn || !validationMessage) return;
  if (isFormValid()) {
    submitBtn.classList.remove('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
    submitBtn.classList.add('bg-[#00B5E2]', 'text-white', 'shadow-lg', 'shadow-[#00B5E2]/30', 'hover:shadow-xl', 'hover:shadow-[#00B5E2]/40', 'hover:scale-[1.02]');
    submitBtn.disabled = false;
    validationMessage.classList.add('hidden');
  } else {
    submitBtn.classList.remove('bg-[#00B5E2]', 'text-white', 'shadow-lg', 'shadow-[#00B5E2]/30', 'hover:shadow-xl', 'hover:shadow-[#00B5E2]/40', 'hover:scale-[1.02]');
    submitBtn.classList.add('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
    submitBtn.disabled = true;
    validationMessage.classList.remove('hidden');
  }
}

function initApplyForm() {
  if (!form) return;

  Object.values(fields).forEach((field) => {
    if (!field) return;
    field.addEventListener('input', () => {
      updateProgress();
      updateSubmitButton();
    });
    field.addEventListener('change', () => {
      updateProgress();
      updateSubmitButton();
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (isFormValid() && successModal) {
      successModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        window.location.href = './index.html';
      }, 3000);
    }
  });

  updateProgress();
  updateSubmitButton();
}
