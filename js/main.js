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
 * 카드용 데이터 수신 후: 각 항목의 name, tagline, summary, detail, leaderInfo, email, badge 를 교체하세요.
 * 대표 이미지: ./assets/club-image-1.png ~ club-image-15.png (파일명만 유지하면 경로는 그대로입니다.)
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

function escapeHtmlText(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtmlAttr(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** 비바미 주요 활동 섹션과 유사한 배지 문구 순환 */
var CLUB_BADGE_ROTATE = [
  "사회공헌 활동",
  "즐거운 일터 만들기",
  "우리의 믿음 내재화",
  "조직문화",
  "취미 모임",
];

function buildClubPortalData() {
  var placeholderDetail =
    "[리더 원문 전체]\n\n" +
    "리더·운영진이 보내주신 소개 글을 이 항목의 detail 필드에 말투·줄바꿈을 한 글자도 빼지 말고 그대로 붙여 넣어 주세요. (임시 안내 문구입니다.)";

  var placeholderLeader =
    "리더: (이름 / 소속)\n" + "총무: (이름 / 소속)\n" + "문의 가능 시간·채널 등을 여기에 적어 주세요.";

  var list = [];
  var i;
  for (i = 1; i <= 15; i++) {
    list.push({
      name: "동호회 " + (i < 10 ? "0" : "") + i + " (명칭 수신 예정)",
      tagline: "슬로건(한 줄) — 카드용 데이터의 tagline 으로 교체해 주세요.",
      summary:
        "리스트 카드에 들어갈 짧은 요약입니다. 비바미 주요 활동 카드의 회색 본문과 같은 역할이며, 카드용 데이터의 요약문으로 교체해 주세요.",
      detail: placeholderDetail,
      leaderInfo: placeholderLeader,
      email: "vivame.clubs." + (i < 10 ? "0" + i : String(i)) + "@visang.com",
      image: "./assets/club-image-" + i + ".png",
      badge: CLUB_BADGE_ROTATE[(i - 1) % CLUB_BADGE_ROTATE.length],
    });
  }
  return list;
}

/** @type {ClubPortalItem[]} */
var CLUB_PORTAL_CLUBS = buildClubPortalData();

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

  root.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8";

  root.innerHTML = CLUB_PORTAL_CLUBS.map(function (club, idx) {
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
      '<h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">' +
      escapeHtmlText(club.name) +
      "</h3>" +
      '<p class="text-sm text-[#00B5E2] font-medium mb-3">' +
      escapeHtmlText(club.tagline) +
      "</p>" +
      '<p class="text-gray-600 leading-relaxed text-sm whitespace-pre-line">' +
      escapeHtmlText(club.summary) +
      "</p>" +
      "</div></div></button></div>"
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

/**
 * @param {'vivame' | 'clubs'} name
 * @param {{ skipHash?: boolean }} [opts]
 */
function setSiteTab(name, opts) {
  opts = opts || {};
  var vivamePanel = document.getElementById("tab-panel-vivame");
  var clubsPanel = document.getElementById("tab-panel-clubs");
  var quickNav = document.getElementById("vivameQuickNav");
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

  if (quickNav) {
    if (isVivame) quickNav.classList.remove("hidden");
    else quickNav.classList.add("hidden");
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
