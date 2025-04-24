$("header").load("/include/header.html", function () {
  // 헤더 인디케이터
  $(".header__gnb-title").hover(
    (e) => {
      let $indicator = $(".header__gnb-indicator");
      let indicatorWidth = $(e.target).outerWidth();
      let left = $(e.target).position().left;

      $(e.target).each(function () {
        $indicator.css({
          opacity: 1,
          width: indicatorWidth,
          transform: `translateX(${left}px)`,
        });
      });
    },
    () => {
      $(".header__gnb-indicator").css({
        opacity: 0,
      });
    }
  );

  // 검색창 열기/닫기
  $(".header__nav-btn-search").on("click", function () {
    if ($(".header__nav-search-input").is(":hidden")) {
      $(".header__nav-search-input").show();
    } else {
      if ($(".header__nav-search-input").val() !== "") {
        // 검색어가 입력되어 있을 경우 동작할 코드
        return;
      } else {
        $(".header__nav-search-input").hide();
      }
    }
  });

  // 모바일 gnb 열기
  $(".header__gnb-mobile-open").on("mouseup", function () {
    $(".header__gnb").addClass("active");
    $(".overlay").addClass("is-active");
  });

  // 모바일 gnb 닫기
  $(".header__gnb-mobile-close").on("mouseup", function () {
    $(".header__gnb").removeClass("active");
    $(".overlay").removeClass("is-active");
  });

  // 사이드바 외부 클릭하면 닫힘
  $(".overlay").on("click", function () {
    $(".header__gnb").removeClass("active");
    $(".overlay").removeClass("is-active");
  });

  // 모바일 gnb 상세 메뉴 열기
  if (window.matchMedia("(max-width: 1024px)").matches) {
    $(".header__gnb-title-group").on("touchend", function () {
      let $allSubmenuGroup = $(".center");
      let $allChevron = $(".header__gnb-title-group").children("i");
      let $submenuGroup = $(this).next(".center");
      let $chevron = $(this).children("i");

      if ($submenuGroup.is(":hidden")) {
        $allSubmenuGroup.slideUp();
        $allChevron.css("transform", "rotate(0deg)");
        $submenuGroup.slideDown();
        $chevron.css("transform", "rotate(180deg)");
      } else {
        $submenuGroup.slideUp();
        $chevron.css("transform", "rotate(0deg)");
      }
    });
  }

  // 모바일 사이드바 상세 메뉴 열기/닫기

  // 서브메뉴 리스트가 없는 경우 border-bottom 해제
  $(".header__gnb-submenu").each(function () {
    let el = $(this).children(".header__gnb-submenu-list");

    if (el.length === 0) {
      $(this).children(".header__gnb-submenu-title").css({
        "border-bottom": "none",
      });
    }
  });
});

// flight-services-widget ----------------------------------------
// tab
$(".fsw__t").on("click", function () {
  if ($(this).hasClass("reservation-lookup")) {
    changeTabPanel($(this), "tp-reservation-lookup");
  } else if ($(this).hasClass("flight-booking")) {
    changeTabPanel($(this), "tp-flight-booking");
  } else if ($(this).hasClass("check-in")) {
    changeTabPanel($(this), "tp-check-in");
  } else {
    changeTabPanel($(this), "tp-flight-status");
  }
});

// tab 변경 함수
function changeTabPanel(selectedTab, panelName) {
  // tab
  $(".fsw__t.is-selected").removeClass("is-selected");
  $(selectedTab).addClass("is-selected");

  // tabPanel
  $(".fsw__tp.is-active").removeClass("is-active");
  $(`.${panelName}`).addClass("is-active");
}

// 항공권 예약 내부 tab
// 일반 예매 / 마일리지 예매
$(".tp-flight-booking__ctrl-booking-type").on("click", function () {
  $(".tp-flight-booking__ctrl-booking-type.is-selected").removeClass(
    "is-selected"
  );
  $(this).addClass("is-selected");
});

// 왕복 / 편도 / 다구간 tab 변경 함수
function ChangePanelFlightBookingActiveField(selectedControl, fieldName) {
  $(".tp-flight-booking__ctrl-trip-type.is-selected").removeClass(
    "is-selected"
  );
  $(selectedControl).addClass("is-selected");

  $(".tp-flight-booking .field-group.is-active").removeClass("is-active");
  $(`.tp-flight-booking__${fieldName}-field-group`).addClass("is-active");
}

$(".tp-flight-booking .fsw__ctrl").on("click", function () {
  if ($(this).hasClass("round-trip")) {
    // 왕복
    ChangePanelFlightBookingActiveField($(this), "round-trip");
  } else if ($(this).hasClass("one-way")) {
    // 편도
    ChangePanelFlightBookingActiveField($(this), "one-way");
  } else if ($(this).hasClass("multi-city")) {
    // 다구간
    ChangePanelFlightBookingActiveField($(this), "multi-city");
  }
});

// 출도착 조회 내부 tab 변경 함수
function ChangePanelFlightStatusActiveField(selectedControl, fieldName) {
  $(".tp-flight-status__ctrl.is-selected").removeClass("is-selected");
  $(selectedControl).addClass("is-selected");

  $(".tp-flight-status__field.is-active").removeClass("is-active");
  $(`.tp-flight-status__${fieldName}`).addClass("is-active");
}

$(".tp-flight-status .fsw__ctrl").on("click", function () {
  if ($(this).hasClass("route-search")) {
    // 노선조회
    ChangePanelFlightStatusActiveField($(this), "route-field");
  } else if ($(this).hasClass("number-search")) {
    // 편명조회
    ChangePanelFlightStatusActiveField($(this), "number-field");
  }
});
