import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";

export function ApplicationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cell: "",
    reason: "",
    expectations: "",
    agreed: false,
  });
  const [fileName, setFileName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agreed: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const calculateProgress = () => {
    let filled = 0;
    const total = 4;
    if (formData.name) filled++;
    if (formData.cell) filled++;
    if (formData.reason) filled++;
    if (formData.expectations) filled++;
    return (filled / total) * 100;
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.cell &&
      formData.reason &&
      formData.expectations &&
      formData.agreed
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const progress = calculateProgress();

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-[#F8F9FA] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-2xl"
        >
          <div className="w-24 h-24 bg-[#00B7F1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-16 h-16 text-[#00B7F1]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            지원이 정상적으로 접수되었습니다 💙
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            함께 만들어갈 변화를 기대하겠습니다.
            <br />
            확인 후 개별 연락을 드릴 예정입니다.
          </p>
          <div className="text-sm text-gray-500">
            잠시 후 메인 화면으로 이동합니다.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-[#F8F9FA]">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-[#00B7F1] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">메인으로 돌아가기</span>
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title & Progress */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              19기 비바미 지원하기
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              변화의 주인공이 되어주세요
            </p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                <span>작성 진행률</span>
                <span className="font-bold text-[#00B7F1]">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-[#00B7F1] to-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl space-y-8"
          >
            {/* 기본 정보 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  기본 정보
                </h3>
              </div>

              <div>
                <label className="block text-gray-900 mb-2">
                  성함 <span className="text-[#00B7F1]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력해주세요"
                  className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00B7F1] focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-900 mb-2">
                  소속 Cell <span className="text-[#00B7F1]">*</span>
                </label>
                <input
                  type="text"
                  name="cell"
                  value={formData.cell}
                  onChange={handleChange}
                  placeholder="예: 비바미 Cell"
                  className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00B7F1] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* 심층 질문 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  심층 질문
                </h3>
              </div>

              <div>
                <label className="block text-gray-900 mb-2">
                  지원 이유 <span className="text-[#00B7F1]">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  왜 비바미가 되고 싶으신가요?
                </p>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="비바미 활동에 지원하게 된 동기와 이유를 자유롭게 작성해주세요."
                  rows={6}
                  className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00B7F1] focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-900 mb-2">
                  기대하는 점 <span className="text-[#00B7F1]">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  비바미 활동을 통해 회사에 어떤 변화를 만들고 싶나요?
                </p>
                <textarea
                  name="expectations"
                  value={formData.expectations}
                  onChange={handleChange}
                  placeholder="비바미로서 실현하고 싶은 변화와 비전을 작성해주세요."
                  rows={6}
                  className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00B7F1] focus:border-transparent transition-all resize-none"
                  required
                />
              </div>
            </div>

            {/* 개인정보 동의 */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-6 bg-[#F8F9FA] rounded-2xl">
                <input
                  type="checkbox"
                  id="agree"
                  checked={formData.agreed}
                  onChange={handleCheckbox}
                  className="w-5 h-5 mt-0.5 accent-[#00B7F1] cursor-pointer"
                  required
                />
                <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer">
                  <span className="font-bold text-gray-900">
                    개인정보 수집 및 이용에 동의합니다.
                  </span>
                  <br />
                  수집된 정보는 비바미 선발 및 활동 운영 목적으로만 사용되며, 활동
                  종료 후 안전하게 폐기됩니다.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isFormValid()}
              whileHover={isFormValid() ? { scale: 1.02 } : {}}
              whileTap={isFormValid() ? { scale: 0.98 } : {}}
              className={`w-full px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
                isFormValid()
                  ? "bg-[#00B7F1] text-white shadow-lg shadow-[#00B7F1]/30 hover:shadow-xl hover:shadow-[#00B7F1]/40"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              비바미 지원 완료하기
            </motion.button>

            {!isFormValid() && (
              <p className="text-sm text-center text-gray-500">
                모든 필수 항목을 작성하고 개인정보 수집에 동의해주세요.
              </p>
            )}
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}