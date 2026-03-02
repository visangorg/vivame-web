import { Link } from "react-router";
import { motion } from "motion/react";
import visangLogo from "figma:asset/cdb8e8dd8f71f67391945a3cc0a959f7b331eeff.png";

export function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-3">
              <img 
                src={visangLogo} 
                alt="비상교육" 
                className="h-8 lg:h-10 w-auto"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 lg:gap-8">
            <button
              onClick={() => scrollToSection("requirements")}
              className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-[#00B7F1] transition-colors"
            >
              모집 요강
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="px-3 lg:px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-[#00B7F1] transition-colors"
            >
              VIVAME 활동 혜택
            </button>
            <Link
              to="/apply"
              className="px-4 lg:px-6 py-2 lg:py-2.5 bg-[#00B7F1] text-white rounded-full hover:shadow-lg hover:shadow-[#00B7F1]/30 transition-all duration-300 text-sm lg:text-base"
            >
              지원하기
            </Link>
          </div>

          <Link
            to="/apply"
            className="md:hidden px-4 py-2 bg-[#00B7F1] text-white rounded-full text-sm"
          >
            지원하기
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}