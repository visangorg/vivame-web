/**
 * VIVAME 랜딩 페이지 메인 스크립트
 * - 사이트 탭(비바미 / 사내 동호회) 전환
 * - 부드러운 스크롤 (고정 헤더 오프셋)
 * - 후기 캐러셀 네비게이션
 * - 사내 동호회 카드 및 모달
 */

function getNavOffset() {
  var nav = document.querySelector("nav");
  return nav ? nav.offsetHeight : 0;
}

function scrollToSection(id) {
  var element = document.getElementById(id);
  if (!element) return;
  var y = element.getBoundingClientRect().top + window.scrollY - getNavOffset();
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

/**
 * 동호회 카드·모달 데이터 15건 (본 파일에 포함 — 별도 clubs-data.js 불필요)
 *
 * @typedef {{
 *   name: string,
 *   tagline: string,
 *   summary: string,
 *   detail: string,
 *   leaderInfo: string,
 *   email: string,
 *   image: string,
 *   badge?: string
 * }} ClubPortalItem
 */

var CLUB_PORTAL_CLUBS = [
  {
    name: "모종의 시작 (도시농부/가드닝)",
    tagline: "회사 옥상에서 펼쳐지는 초록빛 힐링, 도시 농부의 삶",
    summary:
      "회사 옥상 정원을 아지트로 삼아 직접 모종을 심고 가꿉니다. 내 손으로 키운 식물이 주는 정직한 기쁨을 함께 나눠요.",
    detail: `말 그대로 '모종'으로 시작하는 우리들의 초록색 프로젝트! 회사 옥상이라는 특별한 공간에서 식물을 키우며 도심 속 농부의 삶을 경험합니다. '장비빨' 좀 세우고 싶은 가드닝 장비 마니아부터, 내 식물은 내가 책임지는 '주인정신' 투철한 분들까지 모두 환영합니다. 옥상에서 함께 땀 흘리고 식물이 자라는 모습을 보며 업무 스트레스를 건강하게 해소해 보세요.

✨ 이런 CP님, 우리와 찰떡이에요!
* 🌿 회사 옥상을 나만의 작은 숲으로 가꿔보고 싶은 분

* 🪴 식물을 죽이는 '마이너스의 손'에서 '초록 손'으로 거듭나고 싶은 분

* 🥬 직접 키운 작물을 수확하는 정직한 성취감을 느끼고 싶은 분`,
    leaderInfo: "리더/총무: 김새별 / 심형석",
    email: "vivame.clubs.01@visang.com",
    image: "./assets/club-mojong-yisijak.png",
    badge: "도시농부/가드닝",
  },
  {
    name: "AVOCADO (맛집 탐방 & 콘솔 게임)",
    tagline: "매달 떠나는 미식 여행, 그리고 함께 즐기는 게임 한 판",
    summary:
      "매달 새로운 맛집 도장 깨기부터 자유로운 콘솔 게임까지! 미식과 취미를 공유하며 일상의 즐거움을 발견할 파티원을 모집합니다.",
    detail: `자유로운 활동을 지향하는 'AVOCADO'입니다! 저희는 매달 1회 배달 맛집 도장 깨기를 진행하며 맛있는 시간을 가집니다(단, 분기별 1회는 휴휘하여 여유를 가집니다).

맛집 탐방 외에도 콘솔 종류 무관, 장르 무관하게 같이 즐길 게임 친구를 구하고 있습니다. "먼저 겜 같이 하자고 적극적으로 파티원 모집할 용기가 있으신 분", "즐겜러보다 빡겜러를 추구하시는 분" 모두 환영합니다! 아보카도와 함께라면 지루할 틈 없는 회사 생활이 펼쳐질 거예요. 포기하지 말고 문을 두드려주세요!

✨ 이런 CP님, 우리와 찰떡이에요!
* 🍽️ 매달 1회, 배달 맛집 도장 깨기에 진심인 미식가 CP님

* 🎮 콘솔 게임 기종이나 장르를 가리지 않고 함께 즐길 동료가 필요한 분

* 🙌 즉흥적인 게임 모임을 즐기며 적극적으로 파티원을 모집할 용기가 있는 분

* ✨ 극강의 P 성향을 가진 자유로운 영혼의 소유자`,
    leaderInfo: "리더/총무: 백부경 / 허수인",
    email: "vivame.clubs.02@visang.com",
    image: "./assets/club-avocado.png",
    badge: "맛집 & 게임",
  },
  {
    name: "그림책 놀이터 (힐링/독서)",
    tagline: "상상하는 모든 곳으로 떠나는 그림책 여행",
    summary:
      "숲속부터 우주까지, 시공간을 초월한 그림책의 세계! 바쁜 일상 속에서 잠시 멈춰 따뜻한 위로와 휴식을 경험해 보세요.",
    detail: `그림책을 통한 진정한 힐링! 숲속과 바다로 직접 가지 않아도 됩니다. 비상교육에서 숲속도, 바다도, 또 우주도—내가 상상하는 모든 공간으로 이동이 가능합니다.

복잡한 세상에서 벗어나 시간과 공간을 초월한 그림책의 세계에서 함께 힐링해요! 거창한 준비물은 필요 없습니다. "그림책 놀이터에서 즐겁게 놀 마인드"만 가지고 오시면 됩니다. 그림책이 주는 짧지만 깊은 울림을 함께 나눌 CP님들을 기다립니다.

✨ 이런 CP님, 우리와 찰떡이에요!
* 🧸 "즐겁게 놀 마인드" 하나는 자신 있는 긍정적인 CP님

* 💛 삭막한 일상에서 벗어나 따뜻한 그림과 글자로 위로받고 싶은 분

* 🌈 상상력을 자극하는 창의적인 휴식 시간을 선호하는 분

* 🪐 시공간을 초월한 새로운 힐링 경험을 해보고 싶은 분`,
    leaderInfo: "리더/총무: 안경영 / 최윤영",
    email: "vivame.clubs.03@visang.com",
    image: "./assets/club-picturebook-playground.png",
    badge: "힐링/독서",
  },
  {
    name: "비상턴 (운동/활동)",
    tagline: "높은 활동성과 즐거운 에너지가 가득한 운동 시간",
    summary:
      "매 활동 시 최소 15명 이상 참여하는 활기찬 분위기! 자유로운 출석 속에서 함께 땀 흘리며 새로운 도전을 즐길 CP님들을 기다립니다.",
    detail: `즐거운 분위기와 자유로운 출석을 지향하는 '비상턴'입니다! 저희 동호회는 매 활동마다 최소 15명 이상 참여할 정도로 아주 높은 활동성을 자랑하고 있어요.

서로 격려하며 기분 좋게 몸을 움직이다 보면 일상의 스트레스가 금방 해소됩니다. 실력에 상관없이 함께 에너지를 나누고 싶은 마음만 있다면 누구나 환영합니다. 새해를 맞아 새로운 것을 꼭 배워보고 싶었던 CP님들이라면 주저 말고 비상턴의 문을 두드려보세요!

✨ 이런 CP님, 우리와 찰떡이에요!
* 🎯 새해를 맞아 새로운 취미나 운동을 배워보고 싶은 도전적인 CP님

* 🎉 최소 15명 이상의 북적북적하고 에너지 넘치는 모임을 좋아하는 분

* 🕊️ 출석 부담 없이 자유로운 분위기 속에서 꾸준히 활동하고 싶은 분

* 💪 동료들과 함께 건강한 활력을 찾고 싶은 모든 분`,
    leaderInfo: "리더/총무: 박준영 / 김완섭",
    email: "vivame.clubs.04@visang.com",
    image: "./assets/club-visang-turn.png",
    badge: "운동/활동",
  },
  {
    name: "그립(Grip) (운동/퍼포먼스)",
    tagline: "압도적인 퍼포먼스, 짧고 굵게 완성하는 전신 운동",
    summary:
      '"인싸들의 운동, 운동 잘해 보이고 싶다면? 여기로!" 짧은 시간에도 눈에 띄는 효과를 보장합니다. 별도 장비 없이 열정만 가지고 오세요!',
    detail: `압도적인 팔 힘과 퍼포먼스를 빠르게 만들어드리는 '그립(Grip)'입니다! 바쁜 업무 중에도 효율적으로 운동하고 싶은 분들을 위해 준비했습니다.

저희 동호회는 별도의 장비가 전혀 필요 없습니다. 초크, 초크백, 테이프 등 활동에 필요한 모든 장비를 전폭 지원해 드립니다! 열정만 있다면 누구나 최고의 신체 변화와 성취감을 경험할 수 있습니다. 운동 잘해 보이고 싶은 CP님들, 지금 바로 그립과 함께 한계를 뛰어넘어 보세요!

✨ 이런 CP님, 우리와 찰떡이에요!
* ⏱️ 짧은 시간 투자로 확실한 운동 효과를 보고 싶은 효율 중시파 CP님

* 🎒 장비 구매 고민 없이 가볍게 몸만 가서 운동을 시작하고 싶은 분

* 🧗 "운동 좀 한다"는 소리를 듣고 싶은, 멋진 퍼포먼스를 꿈꾸는 분

* 🤝 동료들과 함께 한계를 극복하며 끈끈한 팀워크를 느끼고 싶은 분`,
    leaderInfo: "리더/총무: 김현섭 / 고수안",
    email: "vivame.clubs.05@visang.com",
    image: "./assets/club-grip.png",
    badge: "운동/퍼포먼스",
  },
  {
    name: "포시즌스 (시즌 액티비티/친목)",
    tagline: "비상에서 사계절을 가장 야무지게 즐기는 방법",
    summary:
      "봄에는 벚꽃, 겨울에는 방어회까지! 매달 계절의 변화를 온몸으로 느끼며 소소한 즐거움을 함께 나눌 CP님들을 기다립니다.",
    detail: `'포시즌스' 이름값 합니다! 저희는 매달 계절을 가장 잘 느낄 수 있는 제철 활동을 함께 찾고 야무지게 즐기고 있습니다. 아마도 비상교육에서 봄, 여름, 가을, 겨울을 가장 잘 즐기고 있는 모임이 아닐까 싶어요! (｡•̀ᴗ-)✧

봄: 벚꽃, 미나리, 낙산공원 밤산책

여름: 통인시장 축제와 제철 조개

가을: 한강 피크닉, 대하, 억새 축제

겨울: 스케이트장, 방어회, 그리고 귤 까먹으며 보드게임까지!

이렇게 사계절을 알차게 보냈고, 다가오는 계절에도 또 새로운 즐거움을 함께 찾아갈 예정입니다. 동호회 특성상 제철 맛집이나 행사 위주로 활동하다 보니 경우에 따라 개인 비용이 들기도 하지만, 이런 부분도 부담 없이 함께 즐기실 수 있는 분이라면 더욱 환영합니다!

✨ 이런 CP님, 우리와 찰떡이에요!
* 🌸 사계절의 소소한 즐거움을 동료들과 함께 느끼고 싶은 분

* 🍜 퇴근 후 가볍게 맛있는 것 먹으며 이야기 나누는 시간이 소중한 분

* 📆 "이번 달엔 뭐 하지?" 고민 없이 계절 테마에 몸을 맡기고 싶은 분

* 🦐 제철 음식(방어, 대하 등)에 진심인 미식가 CP님`,
    leaderInfo: "리더/총무: 박해인 / 김현진",
    email: "vivame.clubs.06@visang.com",
    image: "./assets/club-four-seasons.png",
    badge: "시즌 액티비티/친목",
  },
  {
    name: "팝케팅 (트렌드/팝업스토어 탐방)",
    tagline: "서울의 가장 핫한 팝업 스토어와 트렌드 현장 습격!",
    summary:
      "핫플 저장만 해두고 못 가본 분들 모여라! SNS에서 난리 난 트렌디한 공간을 직접 경험하고 영감을 나누는 활발한 에너지의 모임입니다.",
    detail: `서울의 핫플레이스 팝업 스토어부터 SNS에서 난리 난 트렌디한 공간까지! '팝케팅'은 지금 가장 뜨거운 현장을 직접 발로 뛰며 트렌드를 발견하고 즐기는 동호회입니다. 처음 만나는 사이라도 금방 친해지는 활발하고 에너지 넘치는 분위기를 자랑합니다. 혼자 가기 쑥스러웠던 핫플들, 이제 팝케팅 멤버들과 함께 영감을 채우러 떠나보세요!

✨ 이런 CP님, 우리와 찰떡이에요!
* 🙋‍♂️ 핫플 저장만 해두고 정작 같이 갈 사람이 없어 못 가본 분

* 🗺️ 새로 생긴 팝업스토어 소식에 귀가 번쩍 뜨이는 트렌드 세터

* 📸 어디서든 트렌드를 발견하고 즐길 줄 아는 감각적인 분

* 🤝 처음 만나도 금방 친해지는 활발하고 에너지 넘치는 분`,
    leaderInfo: "리더/총무: 이한솔 / 김인주",
    email: "vivame.clubs.07@visang.com",
    image: "./assets/club-popketing.png",
    badge: "트렌드/팝업",
  },
  {
    name: "퐁당다이브클럽 (수영/다이빙)",
    tagline: "미지의 세계를 탐험하는 특별한 수중 힐링",
    summary:
      "다른 사람들이 쉽게 접근할 수 없는 물속 세상을 함께 탐험합니다. 새로운 도전을 즐기는 '수속성 인간' CP님들을 기다립니다.",
    detail: `일상의 중력을 벗어나 미지의 세계를 탐험하는 즐거움! '퐁당다이브클럽'은 물속에서 느끼는 고요한 평온과 다이빙이 주는 짜릿한 성취감을 함께 나누는 모임입니다.

쉽게 경험할 수 없는 특별한 활동을 통해 새로운 나를 발견하고, 물속에서 만들어지는 끈끈한 유대감을 경험해 보세요. 꾸준히 함께하며 물과 친해질 준비가 된 분들이라면 언제든 환영합니다!

✨ 이런 CP님, 우리와 찰떡이에요!
* 🧜‍♂️ 나는 사실 물이 제일 편한 '수속성 인간형'인 분

* 🌊 남들이 쉽게 가보지 못한 미지의 세계를 탐험하고 싶은 분

* 🏊‍♂️ 한두 번이 아니라 꾸준히 함께 활동하며 실력을 키울 분

* ✨ 일상에 활력을 불어넣을 색다른 도전을 즐기시는 분`,
    leaderInfo: "리더: 채정석",
    email: "vivame.clubs.08@visang.com",
    image: "./assets/club-pongdang-dive.png",
    badge: "수영/다이빙",
  },
  {
    name: "다람지 (다양한 스포츠 관람)",
    tagline: "뜨거운 함성과 열기, 모든 스포츠를 직관하는 즐거움",
    summary:
      "종목 불문! 다양한 스포츠의 현장감을 함께 즐깁니다. 조용하지만 꾸준한 활동으로 스포츠 문화의 진수를 경험할 CP님들을 환영합니다.",
    detail: `'다양한 스포츠 관람을 지향하는 모임', 다람지입니다! 저희는 특정 종목에 국한되지 않고 야구, 축구, 배구 등 현장의 에너지를 느낄 수 있는 곳이라면 어디든 함께합니다.

화려한 이벤트보다는 스포츠 그 자체를 즐기며, 조용하지만 꾸준하게 활동을 이어가는 것이 저희의 자랑거리입니다. 스포츠 결과에 하루하루 웃고 우는 진정한 팬심을 가진 분들이라면 다람지에서 함께 직관의 매력에 빠져보세요!

✨ 이런 CP님, 우리와 찰떡이에요!
* ⚾ 스포츠 문화 전반에 관심이 많고 직관의 설렘을 아는 분

* 📣 경기 결과 하나에 일상의 희로애락을 느끼는 열정적인 분

* 🤝 조용하더라도 꾸준하게 활동하며 끈끈한 유대감을 쌓고 싶은 분

* 🏟️ 혼자 가는 직관보다 함께 응원하는 함성의 힘을 믿는 분`,
    leaderInfo: "리더/총무: 이병주 / 정시우",
    email: "vivame.clubs.09@visang.com",
    image: "./assets/club-daramji.png",
    badge: "스포츠 직관",
  },
  {
    name: "원모어 (One More) (운동/자기관리)",
    tagline: "압도적인 활발함으로 완성하는 건강한 루틴",
    summary:
      "주 2회 꾸준한 활동과 매력적인 자체 굿즈까지! 확실한 운동 효과는 물론, 분기별 고급 회식으로 즐거움까지 놓치지 않는 비상 최대 규모의 모임입니다.",
    detail: `비상에서 가장 활발한 에너지를 자랑하는 '원모어(One More)'입니다! 저희는 주 2회의 잦은 활동 빈도로 꾸준한 건강 관리를 지향합니다.

운동만 하는 곳이냐고요? 아닙니다! 원모어만의 매력적인 자체 굿즈와 분기별로 진행되는 고급 회식은 우리 동호회의 또 다른 자랑거리입니다. 외부인이 없는 우리만의 편안한 공간에서 땀 흘리고, 새로운 CP님들과 소통하며 활력을 충전해 보세요!

✨ 이런 CP님, 우리와 찰떡이에요!
* 💪 건강 관리에 진심이며 꾸준한 운동 습관을 만들고 싶은 분

* 🎁 동호회 한정 '매력적인 자체 굿즈'를 소장하고 싶은 분

* 🍽️ 열심히 운동한 뒤, '분기별 고급 회식'으로 보상받고 싶은 분

* 🤝 외부인 없는 쾌적한 공간에서 새로운 동료들과 친해지고 싶은 분`,
    leaderInfo: "리더/총무: 홍현우 / 이소민",
    email: "vivame.clubs.10@visang.com",
    image: "./assets/club-one-more.png",
    badge: "운동/자기관리",
  },
  {
    name: "비상다독 (독서/자기계발)",
    tagline: "함께 지식을 나누며 성장하는 즐거움",
    summary:
      '"함께 지식을 나눈다." 독서를 통해 새로운 인사이트를 얻고 싶은 CP님이라면 누구나 환영합니다! 지적 호기심을 채우고 싶은 마음 하나면 충분합니다.',
    detail: `혼자 읽기보다 함께 나눌 때 지식은 더욱 깊어집니다. '비상다독'은 책을 통해 다양한 생각과 정보를 공유하며 함께 성장하는 모임입니다.

어려운 책이 아니어도 괜찮습니다. 지식을 나누고 싶은 열정만 있다면 자격 제한 없이 "아무나!" 참여 가능합니다. 바쁜 일상 속에서 잠시 책장을 넘기며 동료들과 지적 힐링의 시간을 가져보세요.

✨ 이런 CP님, 우리와 찰떡이에요!
* 📖 책을 통해 새로운 지식을 얻고 인사이트를 나누고 싶은 분

* 🙌 가입 조건 까다로운 곳은 사절! "아무나" 환영하는 편안한 모임을 찾는 분

* 🌱 동료들과 함께 건강한 독서 습관을 만들고 싶은 분

* 🗨️ 읽은 책에 대해 자유롭게 이야기 나누는 문화를 선호하는 분`,
    leaderInfo: "리더/총무: 김동남 / 신강희",
    email: "vivame.clubs.11@visang.com",
    image: "./assets/club-bisang-dadok.png",
    badge: "독서/자기계발",
  },
  {
    name: "Focus on (사진/출사)",
    tagline: "셔터 한 번으로 일상의 온도를 기록하는 시간",
    summary:
      '"프사 바꿀 때 되셨나요? 여기서 해결해 드립니다!" 찰나의 순간을 기록하고 싶은 분이라면 기종 상관없이 누구나 환영합니다.',
    detail: `소중한 순간을 영원히 남기고 싶은 'Focus on'입니다. 거창한 장비가 없어도 괜찮습니다. 휴대폰 카메라든 전문 DSLR이든, '이건 꼭 남겨야겠다' 싶은 순간에 자연스럽게 손이 먼저 나가는 분이라면 이미 저희와 함께할 준비가 되신 거예요! 출사를 통해 멋진 풍경도 담고, 동료들과 서로 인생샷을 남겨주며 일상의 프사를 새롭게 바꿔보세요. :)

✨ 이런 CP님, 우리와 찰떡이에요!
* 🖼️ SNS 프로필 사진을 업데이트할 때가 된 사진 맛집 탐방러

* 🤳 아름다운 풍경이나 기록하고 싶은 순간을 보면 카메라부터 드는 분

* 📷 기종에 상관없이 사진 찍는 즐거움을 함께 나누고 싶은 분

* ✨ 평범한 일상을 특별한 작품으로 남기고 싶은 감성 CP님`,
    leaderInfo: "리더/총무: 김도이 / 김도이",
    email: "vivame.clubs.12@visang.com",
    image: "./assets/club-focus-on.png",
    badge: "사진/출사",
  },
  {
    name: "떼구르 (볼링/친목)",
    tagline: "2009년부터 굴려온 비상 찐 동호회, 스트레스 타파!",
    summary:
      "반짝 생겼다 사라지는 모임이 아닌 꾸준히 이어져 온 전통 있는 볼링 동호회입니다. 실력 상관없이 볼링의 희열과 인덕원 맛집 탐방을 함께 즐겨요!",
    detail: `진정한 '비상 찐 동호회' 떼구르입니다! 저희는 스트레스를 핀처럼 날려버리고 싶은 분, 다양한 부서원들과 유쾌하게 연결되고 싶은 분들을 언제나 환영합니다.
볼링을 처음 접하시나요? 준비물이나 진입장벽은 전혀 없습니다. 공만 굴릴 수 있다면 볼링 고수들의 연속 스트라이크 노하우를 무료로 전수받을 수 있는 기회까지 드립니다. 즐겁게 게임을 마친 후에는 인덕원 맛집 탐방으로 하루를 완벽하게 마무리합니다.

✨ 이런 CP님, 우리와 찰떡이에요!
* 🎳 핀이 쓰러지는 소리에 희열을 느끼며 스트레스를 날리고 싶은 분

* 🍲 볼링 후 이어지는 맛있는 저녁과 맛집 탐방이 기다려지는 분

* 🎓 볼링 고수에게 기초부터 노하우까지 제대로 배우고 싶은 입문자

* 🤝 밝고 유쾌한 분위기 속에서 사내 네트워크를 넓히고 싶은 CP님`,
    leaderInfo: "리더/총무: 정수진 / 오현식",
    email: "vivame.clubs.13@visang.com",
    image: "./assets/club-ttegureu.png",
    badge: "볼링/친목",
  },
  {
    name: "온니 플라워 (플라워/힐링)",
    tagline: "꽃과 함께 피어나는 일상의 힐링, 한 달에 한 번 나에게 주는 선물",
    summary:
      "월 참여도 90% 이상을 자랑하는 비상의 대표 힐링 모임! 직접 만든 꽃 작품으로 업무 스트레스는 해소하고, 사내 분위기까지 화사하게 업그레이드합니다.",
    detail: `"플라워 자체가 분위기!" '온니 플라워'는 꽃을 사랑하는 마음으로 모여 월 1회 정기적인 활동을 이어가고 있습니다.

동호회 회원들의 열띤 참여(참여도 90% 이상)로 만들어진 아름다운 작품들은 사내 분위기를 밝히는 에너지가 됩니다. 나 자신을 위한 한 달에 한 번의 선물은 물론, 동료나 소중한 가족(어머니, 배우자, 자녀 등)에게 직접 만든 꽃을 선물하며 일주일 이상의 깊은 힐링을 경험해 보세요. 꽃과 식물을 사랑하는 CP님이라면 누구나 환영합니다!

✨ 이런 CP님, 우리와 찰떡이에요!
* 🌸 꽃과 식물을 진심으로 사랑하고 아끼는 마음을 가진 분

* 🎁 한 달에 한 번, 나를 위한 특별한 선물로 스트레스를 해소하고 싶은 분

* 💌 직접 만든 꽃 작품으로 가족이나 동료에게 감동을 전하고 싶은 분

* 📈 높은 참여도 속에서 끈끈하고 화기애애한 분위기를 즐기고 싶은 분`,
    leaderInfo: "리더/총무: 정미화 / 김유미",
    email: "vivame.clubs.14@visang.com",
    image: "./assets/club-only-flower.png",
    badge: "플라워/힐링",
  },
  {
    name: "비상골린이들 (골프/친목)",
    tagline: "헛스윙도 웃음으로 승화하는 유쾌한 필드 나들이",
    summary:
      "실력 부담은 내려놓고 푸른 잔디 위에서 에너지를 충전하세요. 유쾌하고 좋은 사람들과 함께라면 벙커도 해저드도 즐거운 추억이 됩니다!",
    detail: `저희 '비상골린이들'의 가장 큰 자랑은 단연 사람입니다. 유쾌하고 좋은 사람들과 함께라면 헛스윙 한 번에도 웃음꽃이 피어납니다. 꼭 공을 잘 쳐야만 즐거운 건 아니잖아요? 사무실을 벗어나 탁 트인 푸른 잔디 위에서 동료들과 함께 게임을 즐기는 것 자체가 저희에게는 최고의 에너지 충전입니다. 실력 부담 없이, 필드가 주는 개방감을 만끽하고 싶은 분들이라면 우리 동호회가 정답입니다!

✨ 이런 CP님, 우리와 찰떡이에요!
* 🏌️ 긍정 파워 소유자: 벙커에 빠져도 "오히려 좋아! 모래 장난 한 번 더 하지 뭐~"라고 웃어넘길 수 있는 무한 긍정러.

* 👏 굿샷 요정: 동료의 멋진 샷에 진심 어린 박수와 "굿~샷!"을 외쳐줄 따뜻한 목소리를 가진 분.

* 🤝 함께의 가치를 아는 분: 혼자 연습장 가는 것보다, 부족해도 함께 라운딩하며 추억 쌓기를 즐기는 분.`,
    leaderInfo: "리더: 이수양",
    email: "vivame.clubs.15@visang.com",
    image: "./assets/club-golf-beginners.png",
    badge: "골프/친목",
  },
];

function escapeHtmlText(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtmlAttr(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function clubInitials(name) {
  var trimmed = name.replace(/\s+/g, " ").trim();
  var parts = trimmed.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    var a = parts[0].charAt(0);
    var b = parts[1].charAt(0);
    return (a + b).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

function buildTeamsChatUrl(email) {
  return "https://teams.microsoft.com/l/chat/0/0?users=" + encodeURIComponent(email);
}

function buildMailtoUrl(email) {
  var subject = encodeURIComponent("[비상 동호회] 문의드립니다");
  return "mailto:" + email + "?subject=" + subject;
}

/** 동호회 상세 본문에 삽입되는 ‘찰떡’ 헤드라인(스타일 분리용) */
var CLUB_MODAL_FIT_HEADLINE = "✨ 이런 CP님, 우리와 찰떡이에요!";

function escapeClubModalHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * 상세 텍스트를 HTML로 변환(헤드라인만 콜아웃). XSS 방지를 위해 이스케이프 후 줄바꿈만 허용.
 * @param {string} detail
 * @returns {string}
 */
function formatClubDetailAsHtml(detail) {
  if (detail == null || detail === "") return "";
  var d = String(detail);
  var head = CLUB_MODAL_FIT_HEADLINE;
  var idx = d.indexOf(head);
  if (idx === -1) {
    return (
      '<div class="club-modal-detail-text">' + escapeClubModalHtml(d).replace(/\n/g, "<br />") + "</div>"
    );
  }
  var before = d.slice(0, idx);
  var after = d.slice(idx + head.length);
  return (
    '<div class="club-modal-detail-text">' +
    escapeClubModalHtml(before).replace(/\n/g, "<br />") +
    "</div>" +
    '<h4 class="club-modal-section-title club-modal-section-title--fit">' +
    escapeClubModalHtml(head) +
    "</h4>" +
    '<div class="club-modal-detail-text club-modal-detail-text--after">' +
    escapeClubModalHtml(after).replace(/\n/g, "<br />") +
    "</div>"
  );
}

/**
 * 리더/총무 문구 — 라벨과 이름 분리(이름만 강조). 줄바꿈은 &lt;br /&gt;
 * @param {string} raw
 * @returns {string}
 */
function formatLeaderInfoAsHtml(raw) {
  var t = String(raw || "").trim();
  if (!t) return "";
  return t
    .split(/\r?\n/)
    .map(function (line) {
      return line.trim();
    })
    .filter(Boolean)
    .map(function (line) {
      var colon = line.indexOf(":");
      if (colon === -1) {
        return '<p class="club-modal-leader-line">' + escapeClubModalHtml(line) + "</p>";
      }
      var label = line.slice(0, colon + 1).trim();
      var rest = line.slice(colon + 1).trim();
      return (
        '<p class="club-modal-leader-line">' +
        '<span class="club-modal-leader-label">' +
        escapeClubModalHtml(label) +
        "</span> " +
        '<span class="club-modal-leader-names">' +
        escapeClubModalHtml(rest) +
        "</span>" +
        "</p>"
      );
    })
    .join("");
}

function openClubModal(/** @type {ClubPortalItem} */ club) {
  var modal = document.getElementById("clubModal");
  if (!modal) return;

  var titleEl = document.getElementById("clubModalTitle");
  var taglineEl = document.getElementById("clubModalTagline");
  var detailEl = document.getElementById("clubModalDetail");
  var leaderSection = document.getElementById("clubModalLeaderSection");
  var leaderInfoEl = document.getElementById("clubModalLeaderInfo");
  var imgEl = document.getElementById("clubModalImage");
  var initialsEl = document.getElementById("clubModalInitials");
  var mailEl = document.getElementById("clubModalMailto");
  var teamsEl = document.getElementById("clubModalTeams");

  if (titleEl) titleEl.textContent = club.name;
  if (taglineEl) taglineEl.textContent = club.tagline;
  if (detailEl) detailEl.innerHTML = formatClubDetailAsHtml(club.detail || "");

  if (leaderInfoEl) leaderInfoEl.innerHTML = formatLeaderInfoAsHtml(club.leaderInfo || "");
  if (leaderSection) {
    leaderSection.style.display = club.leaderInfo && String(club.leaderInfo).trim() ? "block" : "none";
  }

  if (imgEl && initialsEl) {
    imgEl.classList.add("hidden");
    imgEl.style.zIndex = "";
    initialsEl.textContent = clubInitials(club.name);
    imgEl.alt = club.name;
    imgEl.onload = function () {
      imgEl.classList.remove("hidden");
      imgEl.style.zIndex = "1";
      initialsEl.textContent = "";
    };
    imgEl.onerror = function () {
      imgEl.classList.add("hidden");
      imgEl.style.zIndex = "";
      initialsEl.textContent = clubInitials(club.name);
    };
    imgEl.src = club.image;
    if (imgEl.complete && imgEl.naturalWidth > 0) {
      imgEl.classList.remove("hidden");
      imgEl.style.zIndex = "1";
      initialsEl.textContent = "";
    }
  }

  if (mailEl) mailEl.href = buildMailtoUrl(club.email);
  if (teamsEl) teamsEl.href = buildTeamsChatUrl(club.email);

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", handleClubEscape);
}

function closeClubModal() {
  var modal = document.getElementById("clubModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleClubEscape);
}

function handleClubEscape(e) {
  if (e.key === "Escape") closeClubModal();
}

function renderClubCards() {
  var root = document.getElementById("clubCardsRoot");
  if (!root) return;

  var clubs =
    typeof CLUB_PORTAL_CLUBS !== "undefined" && CLUB_PORTAL_CLUBS && CLUB_PORTAL_CLUBS.length
      ? CLUB_PORTAL_CLUBS
      : [];
  if (!clubs.length) {
    root.innerHTML =
      '<p class="text-center text-gray-500 text-sm py-8">동호회 목록을 불러오지 못했습니다. 페이지를 새로고침 해 주세요.</p>';
    return;
  }

  root.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8";

  root.innerHTML = clubs.map(function (club, idx) {
    var badge = club.badge || "동호회";
    return (
      '<div class="group hover:-translate-y-2 transition-all duration-300">' +
      '<button type="button" class="club-portal-card block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5E2] focus-visible:ring-offset-2 rounded-3xl" data-club-index="' +
      idx +
      '" aria-label="' +
      escapeHtmlAttr(club.name + " 상세 보기") +
      '">' +
      '<div class="h-full bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#00B5E2] hover:shadow-xl transition-all duration-300">' +
      '<div class="relative h-40 sm:h-48 overflow-hidden">' +
      '<img src="' +
      escapeHtmlAttr(club.image) +
      '" alt="' +
      escapeHtmlAttr(club.name) +
      '" class="club-card-thumb w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" loading="lazy" />' +
      '<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>' +
      '<div class="absolute bottom-4 left-4">' +
      '<span class="px-3 py-1 bg-[#00B5E2]/90 text-white text-xs font-medium rounded-full">' +
      escapeHtmlText(badge) +
      "</span></div>" +
      "</div>" +
      '<div class="p-4 sm:p-6">' +
      '<h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 text-content">' +
      escapeHtmlText(club.name) +
      "</h3>" +
      '<p class="text-sm text-[#00B5E2] font-medium mb-3 text-content">' +
      escapeHtmlText(club.tagline) +
      "</p>" +
      '<p class="text-gray-600 leading-relaxed text-sm whitespace-pre-line text-content">' +
      escapeHtmlText(club.summary) +
      "</p>" +
      "</div></div></button></div>"
    );
  }).join("");

  root.querySelectorAll(".club-portal-card").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var i = parseInt(btn.getAttribute("data-club-index") || "0", 10);
      var club = clubs[i];
      if (club) openClubModal(club);
    });
  });
}

function initClubPortal() {
  renderClubCards();

  var modal = document.getElementById("clubModal");
  if (!modal) return;

  var backdrop = document.getElementById("clubModalBackdrop");
  var closeBtn = document.getElementById("clubModalClose");
  var content = document.getElementById("clubModalContent");

  if (backdrop) {
    backdrop.addEventListener("click", closeClubModal);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeClubModal);
  }
  if (content) {
    content.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }
}

/**
 * @param {'vivame' | 'clubs'} name
 * @param {{ skipHash?: boolean }} [opts]
 */
function setSiteTab(name, opts) {
  opts = opts || {};
  var vivamePanel = document.getElementById("tab-panel-vivame");
  var clubsPanel = document.getElementById("tab-panel-clubs");
  if (!vivamePanel || !clubsPanel) return;

  var isVivame = name === "vivame";

  if (isVivame) {
    vivamePanel.classList.remove("hidden");
    vivamePanel.removeAttribute("hidden");
    clubsPanel.classList.add("hidden");
    clubsPanel.setAttribute("hidden", "");
  } else {
    clubsPanel.classList.remove("hidden");
    clubsPanel.removeAttribute("hidden");
    vivamePanel.classList.add("hidden");
    vivamePanel.setAttribute("hidden", "");
  }

  document.querySelectorAll("[data-site-tab]").forEach(function (btn) {
    var tab = btn.getAttribute("data-site-tab");
    var active = (tab === "vivame" && isVivame) || (tab === "clubs" && !isVivame);
    btn.setAttribute("aria-selected", active ? "true" : "false");
    btn.classList.toggle("site-tab--active", active);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (!opts.skipHash && window.history && window.history.replaceState) {
    var hash = isVivame ? "#vivame" : "#clubs";
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }

  try {
    vivamePanel.style.pointerEvents = isVivame ? "" : "none";
    clubsPanel.style.pointerEvents = isVivame ? "none" : "";
  } catch (e) {
    /* noop */
  }
}

function initSiteTabs() {
  document.querySelectorAll("[data-site-tab]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tab = btn.getAttribute("data-site-tab");
      if (tab === "vivame" || tab === "clubs") setSiteTab(tab);
    });
  });

  window.addEventListener("hashchange", function () {
    var h = (window.location.hash || "").replace(/^#/, "");
    if (h === "clubs") setSiteTab("clubs", { skipHash: true });
    else setSiteTab("vivame", { skipHash: true });
  });

  var initial = (window.location.hash || "").replace(/^#/, "") === "clubs" ? "clubs" : "vivame";
  setSiteTab(initial, { skipHash: true });
}

document.addEventListener("DOMContentLoaded", function () {
  initSiteTabs();
  initClubPortal();

  var el = document.getElementById("testimonialScroll");
  var prev = document.querySelector(".testimonial-nav-prev");
  var next = document.querySelector(".testimonial-nav-next");
  if (!el || !prev || !next) return;

  function getScrollAmount() {
    var first = el.querySelector("article");
    var gap = 24;
    if (first) {
      var rect = first.getBoundingClientRect();
      return rect.width + gap;
    }
    return 304;
  }

  function updateButtons() {
    var maxScroll = el.scrollWidth - el.clientWidth;
    prev.style.opacity = el.scrollLeft <= 0 ? "0.4" : "1";
    prev.style.pointerEvents = el.scrollLeft <= 0 ? "none" : "auto";
    next.style.opacity = el.scrollLeft >= maxScroll - 1 ? "0.4" : "1";
    next.style.pointerEvents = el.scrollLeft >= maxScroll - 1 ? "none" : "auto";
  }

  prev.addEventListener("click", function () {
    el.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });
  next.addEventListener("click", function () {
    el.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  el.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);
  updateButtons();
});
