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
  });

  // city/airport -------------------------------------------------------------
  // 출발지/도착지 reset 함수
  function resetCityAirport() {
    $(".fsw-modal__select-region.is-active").removeClass("is-active");
    $(".fsw-modal__select-region[data-region=korea]").addClass("is-active");
    $(".fsw-modal__city-airport-wrap.is-active").removeClass("is-active");
    $(".fsw-modal__city-airport-wrap[data-region=korea]").addClass("is-active");
    $(".fsw-modal__select-city-airport.is-active").removeClass("is-active");
  }

  let clickedBtnLocation;

  // modal 열기 - 출발지
  $(".fsw__tp-field-area.flight-origin").on("click", function () {
    clickedBtnLocation = $(this);
    $(".fsw-modal__airport .fsw-modal__header-title").text("출발지 선택");
    $(".fsw-modal__airport").attr("data-location", "origin");
    $(".fsw-modal__airport").addClass("is-active");
    $(".overlay").addClass("is-active");

    resetCityAirport();
  });

  // modal 열기 - 도착지
  $(".fsw__tp-field-area.flight-destination").on("click", function () {
    clickedBtnLocation = $(this);
    $(".fsw-modal__airport .fsw-modal__header-title").text("도착지 선택");
    $(".fsw-modal__airport").attr("data-location", "destination");
    $(".fsw-modal__airport").addClass("is-active");
    $(".overlay").addClass("is-active");

    resetCityAirport();
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

  // modal 내부 지역 변경
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

  // 도시/공항 확인 버튼
  $(".fsw-modal__airport .fsw-modal__btn-confirm").on("click", function () {
    let cityName = $(".fsw-modal__city-airport-name.is-active")
      .children(".city-name")
      .text();
    let airportCode = $(".fsw-modal__city-airport-name.is-active")
      .children(".airport-code")
      .text();
    if (cityName === "" || airportCode === "") {
      alert("지역 또는 공항을 선택하세요.");
    } else {
      clickedBtnLocation.html(`${airportCode} ${cityName}`);

      $(".fsw-modal").removeClass("is-active");
      $(".overlay").removeClass("is-active");
    }

    if (clickedBtnLocation.hasClass("flight-origin")) {
      departureAirport = airportCode + " " + cityName;
    } else if (clickedBtnLocation.hasClass("flight-destination")) {
      destinationAirport = airportCode + " " + cityName;
    }
  });

  // switch 버튼
  let reverse = null;
  let departureAirport;
  let destinationAirport;

  $(".fsw__tp-switch-location").on("click", function () {
    let departureBtn = $(this).prev();
    let destinationBtn = $(this).next();

    if (reverse === null) {
      departureBtn.text(destinationAirport);
      destinationBtn.text(departureAirport);
      reverse = "reverse";
    } else {
      departureBtn.text(departureAirport);
      destinationBtn.text(destinationAirport);
      reverse = null;
    }
  });

  // calendar --------------------------------------------------------------------
  // modal 열기 - calendar
  let clickedBtnCalendar;

  // 캘린더 날짜 설정 reset 함수
  function resetCalendar() {
    $(".from-day").removeClass("from-day");
    $(".return-day").removeClass("return-day");
    $(".middle").removeClass("middle");
    $(".fsw-modal__calendar-item button.date").css("pointer-events", "auto");
    $(".fsw-modal__departure-date").text("가는 날");
    $(".fsw-modal__return-date").text("오는 날");
  }

  // 가는 날/오는 날/탑승일 모달 열기
  $(
    ".fsw__tp-field-area.departure-date, .fsw__tp-field-area.return-date, .boarding-date"
  ).on("click", function () {
    clickedBtnCalendar = $(this);

    $(".fsw-modal__calendar").addClass("is-active");
    $(".overlay").addClass("is-active");

    if (
      $(this).data("trip") === "round-trip" ||
      $(this).data("trip") === "boarding-date"
    ) {
      $(".fsw-modal__return-date").css("display", "inline-block");
      $(".fsw-modal__calendar").attr("data-calendar-type", "round-trip");
    } else {
      $(".fsw-modal__return-date").css("display", "none");
      $(".fsw-modal__calendar").attr("data-calendar-type", "one-way");
    }

    resetCalendar();
  });

  // 모달 내부 확인 버튼
  $(".fsw-modal__calendar .fsw-modal__btn-confirm").on("click", function () {
    let tripData = clickedBtnCalendar.data("trip");

    if (tripData === "round-trip") {
      let departureDate = $(".fsw-modal__calendar.is-active")
        .find(".fsw-modal__departure-date")
        .text();
      let returnDate = $(".fsw-modal__calendar.is-active")
        .find(".fsw-modal__return-date")
        .text();

      if (departureDate === "가는 날" || returnDate === "오는 날") {
        alert("가는 날, 오는 날을 모두 선택해주세요.");
      } else {
        $(".tp-flight-booking__round-trip .departure-date").text(departureDate);
        $(".tp-flight-booking__round-trip .return-date").text(returnDate);
        $(".fsw-modal").removeClass("is-active");
        $(".overlay").removeClass("is-active");
      }
    } else {
      let departureDate = $(".fsw-modal__calendar.is-active")
        .find(".fsw-modal__departure-date")
        .text();
      clickedBtnCalendar.text(departureDate);
      $(".fsw-modal").removeClass("is-active");
      $(".overlay").removeClass("is-active");
    }
  });

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
      let $allTd = $(".fsw-modal__calendar-table td");
      let arr = [];

      for (let i = 0; i < fromDayIndex; i++) {
        arr.push($allTd[i + 4]);
      }

      arr.forEach(function (item) {
        $(item).children("button").css({
          "pointer-events": "none",
        });
      });

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

  // modal - passenger-count ---------------------------
  let clickedBtnPassenger;

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

  // modal 열기 - 탑승객
  $(".fsw__tp-field-area.passenger-count").on("click", function () {
    clickedBtnPassenger = $(this);

    adultNum = 1;
    childNum = 0;
    infantNum = 0;
    updateDisplay();
    refreshButtons();

    $(".fsw-modal__passenger").addClass("is-active");
    $(".overlay").addClass("is-active");
  });

  // 탑승객 확인 버튼
  $(".fsw-modal__passenger .fsw-modal__btn-confirm").on("click", function () {
    let arr = [adultNum, childNum, infantNum];
    let massage = [];

    if (adultNum === 0 && childNum === 0) {
      alert("성인 혹은 소아를 1명 이상 선택하세요.");
      return;
    }

    arr.forEach(function (item, index) {
      let passenger =
        index === 0
          ? `성인 ${adultNum}`
          : index === 1
          ? `소아 ${childNum}`
          : `유아 ${infantNum}`;

      if (item != 0) {
        massage.push(`${passenger}`);
      }
    });

    clickedBtnPassenger.text(massage.join(", "));
    $(".fsw-modal").removeClass("is-active");
    $(".overlay").removeClass("is-active");
  });

  // 버튼 disable 처리 함수
  function PasseChangeDisabled($btn, isDisabled) {
    $btn
      .prop("disabled", isDisabled)
      .css("pointer-events", isDisabled ? "none" : "auto")
      .css("color", isDisabled ? "var(--gray-text)" : "var(--body-text)");
  }

  // 각 버튼 상태를 한 번에 갱신하는 함수
  function refreshButtons() {
    const totalCount = adultNum + childNum;

    PasseChangeDisabled($addAdultBtn, totalCount >= 9);
    PasseChangeDisabled($addChildBtn, totalCount >= 9);
    PasseChangeDisabled($addInfantBtn, adultNum === 0 || infantNum >= adultNum);
    PasseChangeDisabled($decreaseAdultBtn, adultNum === 0);
    PasseChangeDisabled($decreaseChildBtn, childNum === 0);
    PasseChangeDisabled($decreaseInfantBtn, infantNum === 0);
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

  // modal 열기 - 좌석 등급 -------------------------------------------
  let clickedBtnSeat;

  // 모달 열기
  $(".fsw__tp-field-area.seat-grade-option").on("click", function () {
    clickedBtnSeat = $(this);
    $(".fsw-modal__seat-grade").addClass("is-active");
    $(".overlay").addClass("is-active");
    let clickedBtnData = clickedBtnSeat
      .parents(".fsw__tp-field-group")
      .data("ctrl-panel");

    seatGradeReset();

    if (clickedBtnData === "one-way" || clickedBtnData === "multi-city") {
      toggleCheckbox("#separate-round-trip", true);
    }
  });

  // 좌석 등급 모달 확인 버튼
  $(".fsw-modal__seat-grade .fsw-modal__btn-confirm").on("click", function () {
    let $departure = $(
      ".fsw-modal__seat-grade-form-wrap[data-flight-type=departure]"
    );
    let $return = $(
      ".fsw-modal__seat-grade-form-wrap[data-flight-type=return]"
    );
    let $roundTrip = $(
      ".fsw-modal__seat-grade-form-wrap[data-flight-type=round-trip]"
    );

    if ($("#separate-round-trip").is(":checked")) {
      let seatGradeDeparture = $departure
        .find(".fsw-modal__seat-grade-btn-option.is-selected")
        .text()
        .trim();
      let seatGradeReturn = $return
        .find(".fsw-modal__seat-grade-btn-option.is-selected")
        .text()
        .trim();
      let text = `${seatGradeDeparture}, ${seatGradeReturn}`;
      clickedBtnSeat.text(text);
    } else {
      let seatGrade = $roundTrip
        .find(".fsw-modal__seat-grade-btn-option.is-selected")
        .text()
        .trim();
      clickedBtnSeat.text(seatGrade);
    }

    $(".fsw-modal").removeClass("is-active");
    $(".overlay").removeClass("is-active");
  });

  let btnOption = ".fsw-modal__seat-grade-btn-option";
  let btnWrap = ".fsw-modal__seat-grade-form-wrap";
  let $roundForm = $(`${btnWrap}[data-flight-type=round-trip]`);
  let $departureForm = $roundForm;
  let $returnForm = $(`${btnWrap}[data-flight-type=return`);

  // 유틸 함수
  // is-selected, <i> 제거 함수
  function seatClearClass($wrap) {
    $wrap.find(`${btnOption}.is-selected i`).remove();
    $wrap.find(`${btnOption}.is-selected`).removeClass("is-selected");
  }

  // is-selected, <i> 추가 함수
  function seatAddClass($btn) {
    $btn.addClass("is-selected");
    $btn.prepend("<i class='bi bi-check-lg'></i>");
  }

  // 버튼 disabled 처리 함수
  function seatToggleDisabled($element, bool) {
    $element.prop("disabled", bool);
    let textColor = bool ? "gray" : "body";
    $($element).css({
      color: `var(--${textColor}-text)`,
    });
  }

  // 체크박스 disabled 처리 함수
  function toggleCheckbox($checkbox, bool) {
    $($checkbox).prop("disabled", bool);
    $($checkbox)
      .next("label")
      .css({ color: `var(--${bool ? "gray" : "body"}-text)` });
  }

  // 출도착편 다른 등급 선택 화면에서 등급 버튼 클릭 기능
  function clickDifferentBtn($target) {
    let targetGrade = $target.attr("data-seat-grade");
    let thisPartType = $target.parents(`${btnWrap}`).attr("data-flight-type");
    let otherPartType = thisPartType === "departure" ? "return" : "departure";
    let $otherPart = $(`${btnWrap}[data-flight-type=${otherPartType}]`);
    let $otherSameBtn = $otherPart.find(
      `${btnOption}[data-seat-grade=${targetGrade}]`
    );
    let $otherAllBtns = $otherPart.find(`${btnOption}`);

    seatClearClass($(`${btnWrap}[data-flight-type=${thisPartType}]`));
    seatAddClass($target);
    seatToggleDisabled($otherAllBtns, false);
    seatToggleDisabled($otherSameBtn, true);
  }

  // 좌석 등급 reset 함수
  function seatGradeReset() {
    toggleCheckbox("#upgrade-only", false);
    toggleCheckbox("#separate-round-trip", false);
    $("#upgrade-only").prop("checked", false);
    $("#separate-round-trip").prop("checked", false);
    $departureForm.attr("data-flight-type", "round-trip");
    $roundForm.children(".fsw-modal__seat-grade-form-title").text("출도착편");
    $returnForm.hide();
    seatToggleDisabled(
      $roundForm.find(".fsw-modal__seat-grade-btn-option[disabled]"),
      false
    );
    seatClearClass($roundForm);
    seatAddClass(
      $roundForm.find(`${btnOption}[data-seat-grade=economy-standard]`)
    );
  }

  // 체크박스: 업그레이드 가능한 좌석만 보기
  $("#upgrade-only").on("change", function () {
    if ($(this).is(":checked")) {
      let $economyStandardBtn = $roundForm.find(
        `${btnOption}[data-seat-grade=economy-standard]`
      );

      toggleCheckbox("#separate-round-trip", true);
      seatToggleDisabled($(`${btnOption}`), true);
      seatToggleDisabled($economyStandardBtn, false);
      seatClearClass($roundForm);
      seatAddClass($economyStandardBtn);
    } else {
      toggleCheckbox("#separate-round-trip", false);
      seatToggleDisabled($(`${btnOption}`), false);
    }
  });

  // 모달 내 세부 클릭: 좌석 등급 옵션 버튼 클릭
  $(".fsw-modal__seat-grade-btn-option").on("click", function () {
    let type = $(this).parents(btnWrap).attr("data-flight-type");

    if (type === "round-trip") {
      // 출도착편인 경우
      seatClearClass($roundForm);
      seatAddClass($(this));
    } else if (type === "departure" || type === "return") {
      // 가는 편 or 오는 편인 경우
      clickDifferentBtn($(this));
    }
  });

  // 체크박스: 출도착편 다른 등급 선택
  $("#separate-round-trip").on("change", function () {
    let departureSelectedGrade = $departureForm
      .find(`${btnOption}.is-selected`)
      .attr("data-seat-grade");
    let returnSelectedGrade = $returnForm
      .find(`${btnOption}.is-selected`)
      .attr("data-seat-grade");

    if ($(this).is(":checked")) {
      toggleCheckbox("#upgrade-only", true);
      $roundForm.children(".fsw-modal__seat-grade-form-title").text("가는 편");
      $roundForm.attr("data-flight-type", "departure");
      $(`${btnWrap}[data-flight-type="return"]`).show();

      if (departureSelectedGrade === returnSelectedGrade) {
        seatToggleDisabled(
          $returnForm.find(
            `${btnOption}[data-seat-grade=${departureSelectedGrade}]`
          ),
          true
        );
        seatClearClass($returnForm);
        seatAddClass($returnForm.find(`${btnOption}:not(:disabled)`).first());
        $returnForm
          .find(`${btnOption}:not(:disabled)`)
          .css("color", "var(--body-text)");
        returnSelectedGrade = $returnForm
          .find(`${btnOption}.is-selected`)
          .attr("data-seat-grade");
      }

      seatToggleDisabled(
        $departureForm.find(
          `${btnOption}[data-seat-grade=${returnSelectedGrade}]`
        ),
        true
      );
      $returnForm.find(btnOption).prop("disabled", false);
      seatToggleDisabled(
        $returnForm.find(
          `${btnOption}[data-seat-grade=${departureSelectedGrade}]`
        ),
        true
      );
      let notDisabledBtns = $returnForm.find(btnOption).filter(function () {
        return !$(this).prop("disabled");
      });
      notDisabledBtns.css("color", "var(--body-text)");
    } else {
      // 출도착 편
      toggleCheckbox("#upgrade-only", false);
      $roundForm
        .children(".fsw-modal__seat-grade-form-title")
        .text("출도착 편");
      $roundForm.attr("data-flight-type", "round-trip");
      $(`${btnWrap}[data-flight-type="return"]`).hide();
      seatToggleDisabled($roundForm.find(btnOption), false);
    }
  });
});
