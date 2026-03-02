import { motion } from "motion/react";

export function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B7F1]/10 rounded-full border border-[#00B7F1]/20 mb-6">
            <span className="text-sm font-medium text-[#00B7F1]">
              About VIVAME
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            비바미를 소개합니다
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-lg lg:text-xl text-gray-800 leading-relaxed">
              <span className="font-bold text-[#00B7F1]">비바미(VIVAME)</span>는{" "}
              <span className="font-semibold">
                '비상 벨류 메신저(Visang Value Messenger)'
              </span>
              의 준말로,<br />
              비상교육의 사명과 핵심 가치를 공유하고,<br />
              조직원과 함께 실천함으로써 가치를 실현하기 위해 조직된 모임입니다.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">
                2006년 1기를 시작으로 현재 18기까지 비바미가 운영되었습니다.
              </span>
              <br />
              비상교육 내부에서 기획되는 활동은 비바미로 선별된 조직원들이<br />
              주도적으로 아이디어를 내고 토론하여 결정한 것들입니다.
            </p>

            <p className="text-lg lg:text-xl text-gray-800 leading-relaxed">
              <span className="font-bold text-[#00B7F1]">비바미의 조건은</span>{" "}
              <span className="text-xl lg:text-2xl font-bold text-gray-900">
                따뜻한 마음, 그리고 실천하는 젊음입니다.
              </span>
            </p>

            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              비상교육의 비바미는 수평적인 소통 속에서<br />
              특별한 나눔을 담아내기 위해, 오늘도 즐겁게 노력하고 있습니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}