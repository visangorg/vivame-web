import { motion } from "motion/react";
import { Users, Lightbulb, TrendingUp, Plane, GraduationCap, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import { useRef } from "react";

const benefits = [
  {
    icon: Users,
    title: "비바미만의 특별한 네트워크",
    description: "다양한 부서의 동료들과 함께 성장하는 특별한 인연",
  },
  {
    icon: Lightbulb,
    title: "직접 기획하고 변화시키는 문화 프로그램",
    description: "우리가 주도하여 만들어가는 비상의 조직 문화",
  },
  {
    icon: TrendingUp,
    title: "프로젝트를 주도하며 성장하는 경험",
    description: "의미 있는 프로젝트를 통해 성장하는 리더십 역량",
  },
  {
    icon: Plane,
    title: "특별한 리프레시 휴가",
    description: "한 해 동안의 활약을 기념하는 리프레시 휴가",
  },
  {
    icon: GraduationCap,
    title: "2026년 40학점 지급",
    description: "비바미 활동에 대한 학점 인정 및 지원",
  },
  {
    icon: Award,
    title: "승격 심사시 반영",
    description: "비바미 활동 실적이 승격 심사에 긍정적 반영",
  },
];

const testimonials = [
  {
    name: "김OO CP님",
    department: "마케팅 Cell",
    content: "비바미 활동을 통해 타 부서 동료들과 소통하며 회사에 대한 애정이 더 커졌어요!",
    rating: 5,
  },
  {
    name: "박OO CP님",
    department: "기획 Cell",
    content: "내가 기획한 이벤트로 동료들이 웃는 모습을 볼 때 가장 보람찼습니다.",
    rating: 5,
  },
  {
    name: "이OO CP님",
    department: "인사 Cell",
    content: "단순한 활동이 아닌, 진짜 변화를 만들어가는 경험이었습니다. 정말 추천해요!",
    rating: 5,
  },
  {
    name: "최OO CP님",
    department: "디자인 Cell",
    content: "처음엔 부담스러웠지만 함께하는 동료들 덕분에 즐겁게 활동할 수 있었어요!",
    rating: 5,
  },
  {
    name: "정OO CP님",
    department: "개발 Cell",
    content: "평소 못 느꼈던 조직 문화의 중요성을 깨닫게 된 의미있는 시간이었습니다.",
    rating: 5,
  },
  {
    name: "강OO CP님",
    department: "영업 Cell",
    content: "비바미 활동으로 네트워크도 넓어지고 업무 외 성장 기회를 얻었습니다!",
    rating: 5,
  },
  {
    name: "윤OO CP님",
    department: "교육기획 Cell",
    content: "우리가 만든 프로그램으로 동료들이 행복해하는 모습이 정말 뿌듯했어요.",
    rating: 5,
  },
  {
    name: "조OO CP님",
    department: "콘텐츠 Cell",
    content: "리더십과 기획력을 키울 수 있는 최고의 경험이었습니다. 강력 추천!",
    rating: 5,
  },
];

export function BenefitsSection() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="benefits" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            VIVAME 활동 혜택
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">
            활동 속에서 자연스럽게 얻게 되는 것들
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 lg:mb-24">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-6 lg:p-8 border border-gray-200 hover:border-[#00B7F1] hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-[#00B7F1] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            먼저 경험한 VIVAME의 이야기
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">
            비바미 활동 후기
          </p>
        </motion.div>

        <div className="relative px-12">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="px-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <div className="h-full bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#00B7F1] hover:shadow-xl transition-all duration-300 min-h-[280px] flex flex-col">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 text-[#00B7F1]"
                        >
                          ★
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3 h-[52px]">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00B7F1] to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {testimonial.name[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 truncate">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {testimonial.department}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
          <button
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 hover:text-[#00B7F1] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 hover:text-[#00B7F1] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}