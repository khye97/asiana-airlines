// header -----------------------------------------------------
$("header").load("/include/header.html", function () {
  // pc: gnb mouse hover 함수
  function gndMouseHover(e, target) {
    if (e.type === "mouseenter") {
      target.children(".center").css("display", "block");
    } else if (e.type === "mouseleave") {
      target.children(".center").css("display", "none");
    }
  }

  // 인디케이터 움직임 함수
  function moveIndicator(e, target) {
    let $submenu = target.children(".center");
    let $indicator = $(".header__gnb-indicator");
    let indicatorWidth = $(e.target).outerWidth();
    let left = $(e.target).position().left;

    if (!$submenu.is(":hidden")) {
      $indicator.css({
        opacity: 1,
        width: indicatorWidth,
        transform: `translateX(${left}px)`,
      });
    } else {
      target.children(".center").css("display", "none");
      $(".header__gnb-indicator").css({
        opacity: 0,
      });
    }
  }

  // 모바일 사이드바 열기/닫기 함수
  function toggleSidebar() {
    if ($(".header__gnb").hasClass("active")) {
      $(".header__gnb").removeClass("active");
      $(".overlay").removeClass("is-active");
      $(".header__gnb-title-group").next(".center").hide();
      $(".header__gnb-title-group")
        .children("i")
        .css("transform", "rotate(0deg)");
    } else {
      if (window.matchMedia("screen and (max-width: 1024px)").matches) {
        $(".header__gnb").addClass("active");
        $(".overlay").addClass("is-active");
      }
    }
  }

  // 모바일 사이드바 상세 메뉴 열기/닫기 함수
  function gnbSubmenuOpen(target) {
    let $allSubmenus = $(".center");
    let $allChevron = $(".header__gnb-title-group").children("i");
    let $submenu = $(target).next(".center");
    let $chevron = $(target).children("i");

    if ($submenu.is(":hidden")) {
      $allSubmenus.slideUp();
      $allChevron.css("transform", "rotate(0deg)");
      $submenu.slideDown();
      $chevron.css("transform", "rotate(180deg)");
    } else {
      $submenu.slideUp();
      $chevron.css("transform", "rotate(0deg)");
    }
  }

  // pc: gnb hover 이벤트
  $(".header__gnb-item").on("mouseenter mouseleave", function (e) {
    gndMouseHover(e, $(this));
    moveIndicator(e, $(this));
  });

  // resize시 이벤트리스너 추가/제거
  $(window).resize(function () {
    if (window.matchMedia("screen and (min-width: 1024px)").matches) {
      $(".header__gnb-item").on("mouseenter mouseleave", function (e) {
        gndMouseHover(e, $(this));
        moveIndicator(e, $(this));
      });
      toggleSidebar();
    } else {
      $(".header__gnb-item").off("mouseenter mouseleave");
    }
  });

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

  // 모바일 gnb 열기/닫기, overlay 클릭시 닫기
  $(".header__gnb-mobile-open, .header__gnb-mobile-close, .overlay").on(
    "mouseup",
    function () {
      toggleSidebar();
    }
  );

  // 모바일 gnb 상세 메뉴 열기
  $(".header__gnb-title-group").on("touchend click", function (e) {
    if (e.type === "touchend") {
      // 터치용 로직
      e.preventDefault();
      gnbSubmenuOpen($(this));
    } else {
      // 클릭(마우스)용 로직
      gnbSubmenuOpen($(this));
    }
  });

  // css 조정: gnb에서 서브메뉴 리스트가 없는 경우 border-bottom 해제
  $(".header__gnb-submenu").each(function () {
    let el = $(this).children(".header__gnb-submenu-list");

    if (el.length === 0) {
      $(this).children(".header__gnb-submenu-title").css({
        "border-bottom": "none",
      });
    }
  });
});
