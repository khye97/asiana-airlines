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
  });

  // 모바일 gnb 닫기기
  $(".header__gnb-mobile-close").on("mouseup", function () {
    $(".header__gnb").removeClass("active");
  });

  // 사이드바 외부 클릭하면 닫힘
  $(document).on("mouseup", function (event) {
    let button = document.querySelector(".header__gnb-mobile-open");
    let icon = button.querySelector("i");

    if (
      event.target != button &&
      event.target != icon &&
      $(".header__gnb").has(event.target).length === 0
    ) {
      console.log("확인");
      $(".header__gnb").removeClass("active");
    }
  });

  // 모바일 사이드바 상세 메뉴 열기/닫기
  $(".header__gnb-title-group").on("touchend", function () {
    let $allSubmenuGroup = $(".header__gnb-submenu-group");
    let $allChevron = $(".header__gnb-title-group").children("i");
    let $submenuGroup = $(this).next(".header__gnb-submenu-group");
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

  // 서브메뉴 리스트가 없는 경우 border-bottom 해제
  $(".header__gnb-submenu").each(function () {
    let el = $(".header__gnb-submenu-list");

    if (!$(this).is(el)) {
      $(this).children(".header__gnb-submenu-title").css({
        "border-bottom": "none",
      });
    }
  });
});
