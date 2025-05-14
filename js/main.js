// flight-services-widget --------------------------------------------------
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

  // modal --------------------------------------------------------------------
  // modal 닫기
  $(".fsw-modal__close, .overlay").on("click", function () {
    $(".fsw-modal").removeClass("is-active");
    $(".overlay").removeClass("is-active");

    resetCityAirport();
    resetCalendar();
  });

  // city/airport -------------------------------------------------------------
  // modal 열기 - 출발지
  $(".fsw__tp-field-area.flight-origin").on("click", function () {
    $(".fsw-modal__airport .fsw-modal__header-title").text("출발지 선택");
    $(".fsw-modal__airport").addClass("is-active");
    $(".overlay").addClass("is-active");
  });

  // modal 열기 - 도착지
  $(".fsw__tp-field-area.flight-destination").on("click", function () {
    $(".fsw-modal__airport .fsw-modal__header-title").text("도착지 선택");
    $(".fsw-modal__airport").addClass("is-active");
    $(".overlay").addClass("is-active");
  });

  // modal 내부 도시/공항 변경 함수
  function filterRegion(e) {
    let targetRegion = $(e.target).data("region");
    let selectedElement = $(".fsw-modal__city-airport-wrap").filter(function (
      index,
      element
    ) {
      let region = $(element).data("region");
      return region === targetRegion ? element : undefined;
    });

    return selectedElement;
  }

  // 출발지/도착지 reset 함수
  function resetCityAirport() {
    $(".fsw-modal__select-region.is-active").removeClass("is-active");
    $(".fsw-modal__select-region[data-region=korea]").addClass("is-active");
    $(".fsw-modal__city-airport-wrap.is-active").removeClass("is-active");
    $(".fsw-modal__city-airport-wrap[data-region=korea]").addClass("is-active");
    $(".fsw-modal__select-city-airport.is-active").removeClass("is-active");
  }

  // modal 내부 도시/공항 변경
  $(".fsw-modal__select-region").on("click", function (e) {
    $(".fsw-modal__select-region.is-active").removeClass("is-active");
    $(this).addClass("is-active");
    $(".fsw-modal__city-airport-wrap.is-active").removeClass("is-active");

    let el = filterRegion(e);
    el.addClass("is-active");

    $(".fsw-modal__select-city-airport.is-active").removeClass("is-active");
  });

  // 도시/공항 개별 선택
  $(".fsw-modal__select-city-airport").on("click", function () {
    $(".fsw-modal__select-city-airport.is-active").removeClass("is-active");
    $(this).addClass("is-active");
  });

  // calendar --------------------------------------------------------------------
  // modal 열기 - calendar
  $(".fsw__tp-field-area.departure-date, .fsw__tp-field-area.return-date").on(
    "click",
    function () {
      $(".fsw-modal__calendar").addClass("is-active");
      $(".overlay").addClass("is-active");

      if ($(this).data("trip") === "round-trip") {
        console.log("왕복임");
        $(".fsw-modal__return-date").css("display", "inline-block");
        $(".fsw-modal__calendar").attr("data-calendar-type", "round-trip");
      } else {
        console.log("편도임");
        $(".fsw-modal__return-date").css("display", "none");
        $(".fsw-modal__calendar").attr("data-calendar-type", "one-way");
      }
    }
  );

  let fromDayIndex;
  let returnDayIndex;

  // dayList 배열 생성 함수
  function pushDayList(fromDayIndex, returnDayIndex) {
    let dayList = [];

    for (let i = fromDayIndex + 4; i <= returnDayIndex + 4; i++) {
      dayList.push($(".fsw-modal__calendar-table td")[i]);
    }

    $.each(dayList, function (index, item) {
      $(item).addClass("middle");
    });
  }

  // 캘린더 상단 날짜 값 설정 함수
  function setDateValue(target, className) {
    let dateValue = target.children("input").val();
    $(`.fsw-modal__${className}-date`).text(dateValue);
  }

  // 캘린더 날짜 설정 reset 함수
  function resetCalendar() {
    $(".from-day").removeClass("from-day");
    $(".return-day").removeClass("return-day");
    $(".middle").removeClass("middle");
    $(".fsw-modal__calendar-item button.date").css("pointer-events", "auto");
    $(".fsw-modal__departure-date").text("가는 날");
    $(".fsw-modal__return-date").text("오는 날");
  }

  // 왕복 티켓 날짜 선택 기능
  function setRoundTripDate(target) {
    let fromDay = $(".fsw-modal__calendar-table td").filter(function (
      index,
      element
    ) {
      return $(element).hasClass("from-day") ? element : undefined;
    });

    // 오는 날
    if (fromDay.length >= 1) {
      target.parents("td").addClass("return-day");
      returnDayIndex = $(".fsw-modal__calendar-item button.date").index(target);

      pushDayList(fromDayIndex, returnDayIndex);
      setDateValue(target, "return");

      $(".fsw-modal__calendar-item button.date").css("pointer-events", "none");
    } else {
      // 가는 날
      target.parents("td").addClass("from-day");
      fromDayIndex = $(".fsw-modal__calendar-item button.date").index(target);

      setDateValue(target, "departure");
    }
  }

  // 캘린더 날짜 클릭 기능
  $(".fsw-modal__calendar-item button.date").on("click", function () {
    let calendarType = $(".fsw-modal__calendar").attr("data-calendar-type");
    if (calendarType === "round-trip") {
      // 왕복
      setRoundTripDate($(this));
    } else {
      // 편도
      $(this).parents("td").addClass("from-day");
      $(".fsw-modal__calendar-item button.date").css("pointer-events", "none");
      setDateValue($(this), "departure");
    }
  });

  // reset 버튼
  $(".fsw-modal__btn-reset").on("click", function () {
    resetCalendar();
  });

  // modal 열기 - 탑승객
  $(".fsw__tp-field-area.passenger-count").on("click", function () {
    $(".fsw-modal__passenger").addClass("is-active");
    $(".overlay").addClass("is-active");
  });

  // modal - 탑승객
  const $adultForm = $("[data-passenger-type=adult]");
  const $childForm = $("[data-passenger-type=child]");
  const $infantForm = $("[data-passenger-type=infant]");

  const $adultNumElement = $adultForm.find(".fsw-modal__passenger-count-num");
  const $childNumElement = $childForm.find(".fsw-modal__passenger-count-num");
  const $infantNumElement = $infantForm.find(".fsw-modal__passenger-count-num");

  const $addAdultBtn = $adultForm.find(".add");
  const $decreaseAdultBtn = $adultForm.find(".decrease");
  const $addChildBtn = $childForm.find(".add");
  const $decreaseChildBtn = $childForm.find(".decrease");
  const $addInfantBtn = $infantForm.find(".add");
  const $decreaseInfantBtn = $infantForm.find(".decrease");

  // 초기 Num값
  let adultNum = +$adultNumElement.text();
  let childNum = +$childNumElement.text();
  let infantNum = +$infantNumElement.text();

  // 버튼 disable 처리 함수
  function changeDisabled($btn, isDisabled) {
    $btn
      .prop("disabled", isDisabled)
      .css("pointer-events", isDisabled ? "none" : "auto")
      .css("color", isDisabled ? "var(--gray-text)" : "var(--body-text)");
  }

  // 각 버튼 상태를 한 번에 갱신하는 함수
  function refreshButtons() {
    const totalCount = adultNum + childNum;

    changeDisabled($addAdultBtn, totalCount >= 9);
    changeDisabled($addChildBtn, totalCount >= 9);
    changeDisabled($addInfantBtn, adultNum === 0 || infantNum >= adultNum);
    changeDisabled($decreaseAdultBtn, adultNum === 0);
    changeDisabled($decreaseChildBtn, childNum === 0);
    changeDisabled($decreaseInfantBtn, infantNum === 0);
  }

  // 화면에 숫자 반영 함수
  function updateDisplay() {
    $adultNumElement.text(adultNum);
    $childNumElement.text(childNum);
    $infantNumElement.text(infantNum);
  }

  // 버튼 클릭 이벤트 핸들러
  $(".fsw-modal__btn-passenger").on("click", function () {
    const $btn = $(this);
    const type = $btn
      .closest(".fsw-modal__passenger-count-form")
      .data("passenger-type");
    const isAdd = $btn.hasClass("add");

    if (isAdd) {
      // + 버튼
      if ((type === "adult" || type === "child") && adultNum + childNum >= 9) {
        return;
      }
      if (type === "infant" && infantNum >= adultNum) {
        return;
      }

      if (type === "adult") adultNum++;
      if (type === "child") childNum++;
      if (type === "infant") infantNum++;
    } else {
      // - 버튼
      if (type === "adult" && adultNum - 1 < infantNum) {
        alert("유아가 동반 성인보다 많을 수 없습니다.");
        return;
      }

      if (type === "adult" && adultNum > 0) adultNum--;
      if (type === "child" && childNum > 0) childNum--;
      if (type === "infant" && infantNum > 0) infantNum--;
    }

    updateDisplay();
    refreshButtons();
  });

  // 초기 상태 세팅
  refreshButtons();
});
