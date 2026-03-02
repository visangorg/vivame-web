import { Navigation } from "../components/navigation";
import { HeroSection } from "../components/hero-section";
import { AboutSection } from "../components/about-section";
import { VisionSection } from "../components/vision-section";
import { ActivitiesSection } from "../components/activities-section";
import { BenefitsSection } from "../components/benefits-section";
import { QuizBanner } from "../components/quiz-banner";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <VisionSection />
      <ActivitiesSection />
      <BenefitsSection />
      <QuizBanner />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <span className="font-bold text-base">비바미</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Visang Value Messenger<br />
                비상의 가치를 전파하고 즐거운 일터를 만드는 변화의 주인공
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-base">문의하기</h4>
              <p className="text-gray-400">
                VIVAME 관련 문의사항이 있으시다면<br />
                교육기획 Cell 유지수 CP에게 연락 주시기 바랍니다.
              </p>
              <p className="text-[#00B7F1] mt-2">
                yoojs4@visang.com
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © 2026 비상교육. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}