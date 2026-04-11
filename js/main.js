/**
 * VIVAME 랜딩 페이지 메인 스크립트
 * - 부드러운 스크롤 (고정 헤더 오프셋)
 * - 후기 캐러셀 네비게이션
 * - 사내 동호회 포털 카드 및 모달
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

/** @typedef {{ name: string, tagline: string, detail: string, email: string, image: string }} ClubPortalItem */

/** @type {ClubPortalItem[]} */
var CLUB_PORTAL_CLUBS = [
  {
    name: "비상 러닝 크루",
    tagline: "아침을 깨우는 러닝, 함께라서 더 즐겁습니다.",
    detail:
      "주 1~2회 아침 러닝으로 하루를 시작하는 동호회입니다. 난이도는 페이스에 맞춰 조절하며, 러닝 후 가벼운 스트레칭과 커피 타임으로 동료들과 소통합니다.\n\n신입도 환영이며, 운동화만 챙기시면 됩니다.",
    email: "vivame.clubs.running@visang.com",
    image: "./assets/belief-test.png",
  },
  {
    name: "북클럽 '날개짓'",
    tagline: "책 한 권이 만드는 작은 대화의 날개.",
    detail:
      "월 1회 선정 도서를 읽고 모여 이야기를 나눕니다. 업무 서적뿐 아니라 에세이·소설 등 다양한 장르를 오가며, 각자의 관점을 존중하는 토론 문화를 지향합니다.\n\n다음 모임 도서와 일정은 팀즈 공지로 안내드립니다.",
    email: "vivame.clubs.book@visang.com",
    image: "./assets/writing-room.png",
  },
  {
    name: "필름 · 사진 소모임",
    tagline: "일상의 순간을 프레임에 담아 나눕니다.",
    detail:
      "필름·디지털 가리지 않고 촬영과 현상(또는 보정) 경험을 공유합니다. 분기별로 소규모 전시나 촬영 워크숍을 기획하기도 합니다.\n\n장비 유무와 관계없이 관심만 있으시면 환영입니다.",
    email: "vivame.clubs.photo@visang.com",
    image: "./assets/film-festival.png",
  },
];

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
  var imgEl = document.getElementById("clubModalImage");
  var initialsEl = document.getElementById("clubModalInitials");
  var mailEl = document.getElementById("clubModalMailto");
  var teamsEl = document.getElementById("clubModalTeams");

  if (titleEl) titleEl.textContent = club.name;
  if (taglineEl) taglineEl.textContent = club.tagline;
  if (detailEl) detailEl.textContent = club.detail;

  if (imgEl && initialsEl) {
    imgEl.classList.add("hidden");
    initialsEl.textContent = clubInitials(club.name);
    imgEl.alt = club.name;
    imgEl.onload = function () {
      imgEl.classList.remove("hidden");
      initialsEl.textContent = "";
    };
    imgEl.onerror = function () {
      imgEl.classList.add("hidden");
      initialsEl.textContent = clubInitials(club.name);
    };
    imgEl.src = club.image;
    if (imgEl.complete && imgEl.naturalWidth > 0) {
      imgEl.classList.remove("hidden");
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

  root.innerHTML = CLUB_PORTAL_CLUBS.map(function (club, idx) {
    var safeName = club.name.replace(/"/g, "&quot;");
    var safeImg = club.image.replace(/"/g, "&quot;");
    return (
      '<div class="group hover:-translate-y-2 transition-all duration-300">' +
      '<button type="button" class="club-portal-card w-full h-full text-left bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#00B5E2] hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5E2] focus-visible:ring-offset-2" data-club-index="' +
      idx +
      '" aria-label="' +
      safeName +
      " 상세 보기" +
      '">' +
      '<div class="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-[#00B5E2]/10 to-blue-50">' +
      '<img src="' +
      safeImg +
      '" alt="' +
      safeName +
      '" class="club-card-thumb w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" loading="lazy" />' +
      '<div class="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none"></div>' +
      "</div>" +
      '<div class="p-4 sm:p-6">' +
      '<h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">' +
      club.name +
      "</h3>" +
      '<p class="text-sm text-[#00B5E2] font-medium leading-snug">' +
      club.tagline +
      "</p>" +
      '<p class="text-xs text-gray-400 mt-4">자세히 보려면 카드를 눌러 주세요.</p>' +
      "</div>" +
      "</button>" +
      "</div>"
    );
  }).join("");

  root.querySelectorAll(".club-portal-card").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var i = parseInt(btn.getAttribute("data-club-index") || "0", 10);
      var club = CLUB_PORTAL_CLUBS[i];
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

document.addEventListener("DOMContentLoaded", function () {
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
