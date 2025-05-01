// flight-services-widget ----------------------------------------
$(".fsw").load("/include/booking-form.html", function () {
  // 전체 tab 변경 함수
  function changeTabPanel(target) {
    let clickedTabData = target.data("tab");
    let selectedTabPanel = $(".fsw__tp").filter(function (index, element) {
      let currentElementData = $(element).data("tab-panel");
      return clickedTabData === currentElementData ? element : undefined;
    });

    // tab
    $(".fsw__t.is-selected").removeClass("is-selected");
    target.addClass("is-selected");

    // tab-panel
    $(".fsw__tp.is-active").removeClass("is-active");
    selectedTabPanel.addClass("is-active");
  }

  // tab 내부 세부 탭 변경 함수
  function changeDetailTab(targetCtrl, targetTabPanel) {
    let clickedCtrlData = targetCtrl.data("ctrl");

    // tab
    $(`.tp-${targetTabPanel}__ctrl.is-selected`).removeClass("is-selected");
    targetCtrl.addClass("is-selected");

    // tab-panel
    $(`.tp-${targetTabPanel} .fsw__tp-field-group.is-active`).removeClass(
      "is-active"
    );
    $(`.tp-${targetTabPanel}__${clickedCtrlData}`).addClass("is-active");
  }

  // 전체 tab 변경
  $(".fsw__t").on("click", function () {
    changeTabPanel($(this));
  });

  // 항공권 예약 내부 tab
  // 일반 예매 / 마일리지 예매
  $(".tp-flight-booking__ctrl-booking-type").on("click", function () {
    $(".tp-flight-booking__ctrl-booking-type.is-selected").removeClass(
      "is-selected"
    );
    $(this).addClass("is-selected");
  });

  // 왕복/편도/다구간 탭 변경
  $(".tp-flight-booking__ctrl-trip-type").on("click", function () {
    changeDetailTab($(this), "flight-booking");
  });

  // 출도착 조회 내부 tab
  // 노선조회/편명조회 탭 변경
  $(".tp-flight-status__ctrl").on("click", function () {
    changeDetailTab($(this), "flight-status");
  });
});
