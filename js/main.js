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

[찰떡궁합] 이런 분:
* 회사 옥상을 나만의 작은 숲으로 가꿔보고 싶은 분

* 식물을 죽이는 '마이너스의 손'에서 '초록 손'으로 거듭나고 싶은 분

* 직접 키운 작물을 수확하는 정직한 성취감을 느끼고 싶은 분`,
    leaderInfo: "리더/총무: 김세별 / 심형석",
    email: "vivame.clubs.01@visang.com",
    image: "./assets/club-image-1.png",
    badge: "도시농부/가드닝",
  },
  {
    name: "AVOCADO (맛집/문화)",
    tagline: "매달 떠나는 미식 여행과 자유로운 취미 공유",
    summary:
      "매달 새로운 맛집 탐방과 즐거운 게임 한 판! 일상의 즐거움을 함께 나눌 동료를 기다립니다.",
    detail: `자유로운 활동을 지향하며 매달 1회 맛집 도장 깨기를 진행합니다(분기별 1회는 휴휘). 맛집 탐방 외에도 콘솔 종류 무관, 장르 무관하게 같이 즐길 게임 친구를 구하는 모임입니다.

[찰떡궁합] 이런 분:
* 유명 맛집 웨이팅도 즐거운 미식가 CP님

퇴근 후 함께 게임 한 판 즐길 '겜친'을 찾는 분

자유롭고 편안한 분위기에서 힐링하고 싶은 분`,
    leaderInfo: "리더/총무: 백부경 / 허수인",
    email: "vivame.clubs.02@visang.com",
    image: "./assets/club-image-2.png",
    badge: "맛집/문화",
  },
  {
    name: "그림책 놀이터 (힐링/독서)",
    tagline: "그림책으로 떠나는 따뜻한 시간과 공간의 여행",
    summary:
      "바쁜 일상 속, 상상하는 모든 곳으로 이동하는 힐링 타임. 그림책이 주는 위로가 필요한 당신을 초대합니다.",
    detail: `그림책을 통한 힐링 타임! 숲속과 바다, 때로는 우주까지 우리가 상상하는 모든 공간으로 이동이 가능합니다. 시간과 공간을 초월한 그림책의 세계에서 잠시 쉬어가세요.

[찰떡궁합] 이런 분:
* 그림과 짧은 글이 주는 깊은 울림을 아는 분

복잡한 생각에서 벗어나 동심으로 돌아가고 싶은 분

조용하지만 따뜻한 소통을 즐기는 분`,
    leaderInfo: "리더/총무: 안경영 / 최윤영",
    email: "vivame.clubs.03@visang.com",
    image: "./assets/club-image-3.png",
    badge: "힐링/독서",
  },
  {
    name: "비상틴 (운동/활동)",
    tagline: "즐거운 분위기 속에서 에너지를 채우는 운동 시간",
    summary:
      "즐거운 분위기와 자유로운 출석을 지향하며 활기차게 활동합니다. 새해 새로운 도전을 꿈꾼다면 적극 추천합니다.",
    detail: `최소 15명 이상 참여하는 높은 활동성을 자랑하며, "언니들의 운동, 운동 잘해 보이고 싶니? 여기로!"라는 슬로건 아래 활기차게 활동합니다.

[찰떡궁합] 이런 분:
* 운동을 시작하고 싶지만 혼자는 의지가 부족한 분

활기찬 에너지를 가진 동료들과 친해지고 싶은 분

'운동 잘해 보이고 싶은' 열정 넘치는 초보자`,
    leaderInfo: "리더/총무: 박준영 / 김원선",
    email: "vivame.clubs.04@visang.com",
    image: "./assets/club-image-4.png",
    badge: "운동/활동",
  },
  {
    name: "그립(Grip) (운동/퍼포먼스)",
    tagline: "짧은 시간, 압도적인 효율의 전신 운동 효과",
    summary:
      "짧은 시간에도 눈에 띄는 운동 효과를 보장합니다! 열정만 있다면 누구나 최고의 신체 변화를 경험할 수 있습니다.",
    detail: `바쁜 업무 중에도 효율적으로 운동하고 싶은 분들을 위해 준비했습니다. 압도적인 팀워크와 퍼포먼스를 통해 빠르게 목표를 달성해 드립니다.

[찰떡궁합] 이런 분:
* 짧고 굵게 집중해서 운동하고 싶은 효율 중시파

확실한 비포-애프터 변화를 경험하고 싶은 분

팀원들과 함께 땀 흘리며 성취감을 느끼고 싶은 분`,
    leaderInfo: "리더/총무: 김현섭 / 고수안",
    email: "vivame.clubs.05@visang.com",
    image: "./assets/club-image-5.png",
    badge: "운동/퍼포먼스",
  },
  {
    name: "포시즌스 (시즌 액티비티)",
    tagline: "사계절의 변화를 가장 완벽하게 즐기는 방법",
    summary:
      "봄 소풍부터 겨울 액티비티까지, 계절별 테마 활동을 함께 즐깁니다. 일상을 낭만으로 가득 채워보세요.",
    detail: `'포시즌스' 이름값 합니다! 봄에는 벚꽃과 피크닉, 여름엔 서핑과 세일링, 가을엔 캠핑, 겨울엔 스키까지! 사계절을 알차게 보내고 싶은 분들의 즐거움을 책임집니다.

[찰떡궁합] 이런 분:
* 제철(?) 액티비티는 꼭 해봐야 직성이 풀리는 분

매달 새로운 장소에서 새로운 경험을 하고 싶은 분

계절의 낭만을 놓치고 싶지 않은 '감성 사냥꾼'`,
    leaderInfo: "리더/총무: 박세인 / 김현진",
    email: "vivame.clubs.06@visang.com",
    image: "./assets/club-image-6.png",
    badge: "시즌 액티비티",
  },
  {
    name: "팝게팅 (트렌드/문화)",
    tagline: "서울의 가장 핫한 팝업 스토어와 트렌드 탐방",
    summary:
      "지금 가장 뜨거운 팝업 현장과 스토어를 직접 경험해 보세요. 트렌디한 사우들과 함께 영감을 나누는 모임입니다.",
    detail: `서울 핫플레이스 팝업 스토어부터 SNS에서 난리 난 힙한 공간까지! 트렌드에 민감한 사우들과 함께 가장 핫한 현장을 직접 경험하고 영감을 나눕니다.

[찰떡궁합] 이런 분:
* 주말마다 핫플 투어를 즐기는 '트렌드 세터'

새로운 공간 디자인과 마케팅에서 영감을 얻고 싶은 분

웨이팅마저 즐거운 SNS 사진 맛집 탐험가`,
    leaderInfo: "리더/총무: 이현솔 / 김인주",
    email: "vivame.clubs.07@visang.com",
    image: "./assets/club-image-7.png",
    badge: "트렌드/문화",
  },
  {
    name: "퐁당디이브클 (수영/문화)",
    tagline: "물속에서의 힐링과 다채로운 문화 경험",
    summary:
      "물의 편안함과 다채로운 문화 활동을 병행합니다. 활기찬 에너지가 필요한 분들을 환영합니다.",
    detail: `다른 사람들이 쉽게 접근할 수 없는 미지의 세계를 탐험하는 듯한 즐거움! 수영을 통한 신체적 힐링은 물론, 회원들 간의 끈끈한 유대감을 중시합니다.

[찰떡궁합] 이런 분:
* 물속에서 고요하게 스트레스를 풀고 싶은 분

수영뿐만 아니라 다양한 문화 생활도 놓치고 싶지 않은 분

평범하지 않은 특별한 취미를 가지고 싶은 분`,
    leaderInfo: "리더: 제정식",
    email: "vivame.clubs.08@visang.com",
    image: "./assets/club-image-8.png",
    badge: "수영/문화",
  },
  {
    name: "티람치 (스포츠 관람)",
    tagline: "뜨거운 함성과 함께하는 스포츠 직관의 즐거움",
    summary:
      "야구, 축구 등 스포츠 현장의 열기를 직접 느끼고 응원의 재미를 공유하는 에너제틱한 모임입니다.",
    detail: `[다양한 스포츠 관람을 시상하는 모임] 소용돌이치며 꾸준한 활동을 이어가는 '티람치'입니다. 같은 팀을 응원하며 끈끈한 동료애를 느낄 수 있습니다.

[찰떡궁합] 이런 분:
* 집관보다 '직관'! 경기장의 함성이 그리운 분

응원가와 치맥, 열정적인 응원 문화를 사랑하는 분

스포츠를 잘 몰라도 함께 즐기는 에너지를 좋아하는 분`,
    leaderInfo: "리더/총무: 이병주 / 정지우",
    email: "vivame.clubs.09@visang.com",
    image: "./assets/club-image-9.png",
    badge: "스포츠 관람",
  },
  {
    name: "원모어(One More) (운동/건강)",
    tagline: "주 2회 꾸준한 활동으로 만드는 건강한 습관",
    summary:
      "확실한 운동 효과와 지속 가능한 건강 관리를 지향합니다. 압도적인 활발함 속에서 변화를 체험해 보세요.",
    detail: `압도적인 활발함! 주 2회의 잦은 활동 빈도로 확실한 운동 효과를 보장하며, 매력적인 자체 굿즈와 고품격 휴식을 통해 건강을 관리합니다.

[찰떡궁합] 이런 분:
* 매일매일 운동하는 습관을 만들고 싶은 '성실파'

예쁜 자체 굿즈와 함께 운동 의욕을 불태우고 싶은 분

지치지 않는 체력을 기르고 싶은 무한 에너지 소유자`,
    leaderInfo: "리더/총무: 홍연우 / 이소빈",
    email: "vivame.clubs.10@visang.com",
    image: "./assets/club-image-10.png",
    badge: "운동/건강",
  },
  {
    name: "비상미식회 (미식/식도락)",
    tagline: "함께 나누는 시식의 즐거움, 진정한 미식 탐구",
    summary:
      "업무에 지친 마음을 맛있는 음식으로 치유하는 시간. 사우들과 함께하는 미식 경험을 제공합니다.",
    detail: `"함께 시식을 나눕니다." 맛집을 찾아다니며 즐거운 미식 경험을 공유하고 담소를 나누며 업무 스트레스를 해소하는 식도락 동호회입니다.

[찰떡궁합] 이런 분:
* 음식을 사랑하고 새로운 맛을 탐구하는 분

맛있는 요리와 함께 즐거운 대화를 나누고 싶은 분

'먹는 게 남는 거다!'라는 철학을 가진 CP님`,
    leaderInfo: "리더/총무: 김동남 / 신광희",
    email: "vivame.clubs.11@visang.com",
    image: "./assets/club-image-11.png",
    badge: "미식/식도락",
  },
  {
    name: "Focus on (볼링)",
    tagline: "핀을 쓰러뜨리는 쾌감, 즐거운 볼링 동호회",
    summary:
      '"쓰사 비상 띠 되셨다면 여기서 해결 가능합니다!" 핀이 쓰러지는 소리와 함께 스트레스를 날려보세요.',
    detail: `스트레스 타파에 최적인 볼링! 핀이 쓰러지는 소리와 함께 직장 생활의 피로를 잊어보세요. 볼링 후 이어지는 즐거운 대화가 삶의 활력소가 됩니다.

[찰떡궁합] 이런 분:
* 스트레스를 한 방에 날리고 싶은 CP님

볼링을 기초부터 차근차근 배우고 싶은 분

가벼운 운동 후 친목 도모를 즐기는 분`,
    leaderInfo: "리더/총무: 김도이 / 김도희",
    email: "vivame.clubs.12@visang.com",
    image: "./assets/club-image-12.png",
    badge: "볼링",
  },
  {
    name: "떼구르 (볼링/전통)",
    tagline: "2009년부터 이어온 비상의 끈끈한 볼링 모임",
    summary:
      "전통 있는 모임에서 타 부서 동료들과 자연스럽게 친해져 보세요. 초보자도 고수의 노하우를 배울 수 있습니다.",
    detail: `번쩍 생겼다 사라지는 모임이 아닌 꾸준함을 자랑합니다. 준비물은 '진입장벽 없는 마음'뿐입니다. 실력 무관하게 시작하려는 마음만 있다면 환영합니다!

[찰떡궁합] 이런 분:
* 부서 상관없이 폭넓은 사내 네트워크를 만들고 싶은 분

오랫동안 유지되어 온 안정적인 모임을 찾는 분

볼링 실력은 부족해도 배우려는 의지가 넘치는 분`,
    leaderInfo: "리더/총무: 정수진 / 오현식",
    email: "vivame.clubs.13@visang.com",
    image: "./assets/club-image-13.png",
    badge: "볼링/전통",
  },
  {
    name: "온니 플라워 (플라워/힐링)",
    tagline: "한 달에 한 번, 꽃으로 전하는 나만의 힐링 선물",
    summary:
      "플라워 제작 활동을 통해 감성을 충전하고 사내 분위기를 UP 시킵니다. 나에게 주는 마법 같은 선물 시간입니다.",
    detail: `월 1회 정기 활동으로 참여도 90% 이상을 자랑합니다! 직접 꽃 작품을 만들며 힐링하고, 나 자신이나 소중한 사람에게 행복을 선물하세요.

[찰떡궁합] 이런 분:
* 꽃과 식물을 사랑하며 감성을 충전하고 싶은 분

바쁜 일상 속 정적인 취미로 마음의 여유를 찾고 싶은 분

직접 만든 작품으로 특별한 기념일을 챙기고 싶은 분`,
    leaderInfo: "리더/총무: 정미화 / 김유미",
    email: "vivame.clubs.14@visang.com",
    image: "./assets/club-image-14.png",
    badge: "플라워/힐링",
  },
  {
    name: "비상골린이들 (골프)",
    tagline: "헛스윙도 웃음으로 승화하는 유쾌한 필드 나들이",
    summary:
      "실력 부담은 내려놓고 푸른 잔디 위에서 에너지를 충전하세요. 좋은 사람들과 함께라면 즐거움이 두 배가 됩니다.",
    detail: `꼭 공을 잘 쳐야만 즐거운 건 아니잖아요? 사무실을 벗어나 탁 트인 푸른 잔디 위에서 동료들과 함께 라운딩을 즐기는 것 자체가 최고의 에너지 충전입니다.

[찰떡궁합] 이런 분:
* 벙커에 빠져도 "오히려 좋아!"라고 웃어넘길 수 있는 무한 긍정러

동료의 멋진 샷에 진심 어린 "굿~샷!"을 외쳐줄 수 있는 분

부족한 실력이라도 함께 라운딩하며 추억을 쌓고 싶은 분`,
    leaderInfo: "리더/총무: 수양 / 이비상",
    email: "vivame.clubs.15@visang.com",
    image: "./assets/club-image-15.png",
    badge: "골프",
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
  if (detailEl) detailEl.textContent = club.detail;

  if (leaderInfoEl) leaderInfoEl.textContent = club.leaderInfo || "";
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
