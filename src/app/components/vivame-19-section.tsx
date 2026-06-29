import { motion } from "motion/react";
import bisangSikguImage from "../../../assets/vivame-19-bisang-sikgu.png";

export function Vivame19Section() {
  return (
    <section
      id="vivame-19"
      className="vivame-19-section relative py-10 sm:py-14 lg:py-20 z-10 scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            비바미 19기{" "}
            <span className="text-[#00B5E2]">'비상 식구들'</span>을 소개합니다! 🏠
          </h2>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="vivame-19-figure"
        >
          <img
            src={bisangSikguImage}
            alt="비바미 19기 비상 식구들 — 한솥밥의 유대감과 동반 성장을 담은 슬로건"
            className="vivame-19-image"
            loading="lazy"
          />
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="vivame-19-body space-y-6 sm:space-y-7 text-center text-base sm:text-lg text-gray-700 leading-relaxed"
        >
          <p className="text-content">안녕하세요,</p>

          <p className="text-content text-gray-800">
            올해로 뜻깊은 창립 28주년을 맞이한 비상교육의 기쁜 날,
            <br />
            <span className="font-semibold text-gray-900">비바미 19기</span>가
            첫인사를 드립니다.
          </p>

          <p className="text-content text-gray-800">
            2026년{" "}
            <span className="font-bold text-[#00B5E2]">비바미 19기</span>로
            여러분과 함께하게 되어 진심으로 반갑습니다.
          </p>

          <p className="text-content text-gray-800">
            이번 19기 비바미의 슬로건은{" "}
            <span className="font-bold text-[#00B5E2]">「비상 식구들」</span>
            입니다.
            <br />
            한솥밥을 먹는 든든한 유대감
            <span className="font-medium text-gray-900">[食口]</span>과,
            <br />
            서로를 밀어주고 당겨주며 함께 더 높이 날아오르는 동반 성장
            <span className="font-medium text-gray-900">[飛上]</span>의 의미를
            담았습니다.
          </p>

          <p className="text-content text-gray-800">
            소리 내어 읽는 순간 '식구'가 되는 숫자{" "}
            <span className="font-bold text-[#00B5E2]">19</span>.
            <br />
            이 숫자는 함께 온기를 나누는 숟가락과 젓가락이 되고,
            <br />
            우리 모두의 가장 안전한 보금자리인 집을 품었습니다.
          </p>

          <p className="text-content text-gray-800">
            비바미 19기는 '비상'이라는 울타리 안에서 서로를 존중하고 응원하며,
            <br />
            가장 가까운 동료이자 든든한 버팀목이 되어줄 때,
            <br />
            우리는 비로소 가장 높이 그리고 더 멀리 날아오를 수 있다고
            믿습니다.
          </p>

          <p className="text-content text-gray-800">
            앞으로 비바미 19기는{" "}
            <span className="font-bold text-[#00B5E2]">비상 식구들</span>의 가장
            든든하고 다정한 페이스메이커로서,
            <br />
            모두가 함께 성장하는 조직문화를 만들어가겠습니다.
            <br />
            서로가 서로에게 힘이 되는 따뜻한 여정에 많은 관심과 응원
            부탁드립니다.
          </p>

          <p className="text-content">감사합니다.</p>

          <p className="text-content text-sm sm:text-base text-gray-600 font-medium pt-2">
            — 비상 식구들 길잡이 황항연 CP —
          </p>
        </motion.div>
      </div>
    </section>
  );
}
