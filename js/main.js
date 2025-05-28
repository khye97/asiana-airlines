// monthly-fare-chart -----------------------------------------
let osakaPriceList = {
  "2025-05-06": 164300,
  "2025-05-07": 154300,
  "2025-05-08": 232300,
  "2025-05-09": 166300,
  "2025-05-10": 114300,
  "2025-05-11": 114300,
  "2025-05-12": 114300,
  "2025-05-13": 114300,
  "2025-05-14": 114300,
  "2025-05-15": 134300,
  "2025-05-16": 167300,
  "2025-05-17": 224300,
  "2025-05-18": 114300,
  "2025-05-19": 114300,
  "2025-05-20": 174300,
  "2025-05-21": 345900,
  "2025-05-22": 346700,
  "2025-05-23": 539000,
  "2025-05-24": 194300,
  "2025-05-25": 254300,
  "2025-05-26": 232300,
  "2025-05-27": 114300,
  "2025-05-28": 114300,
  "2025-05-29": 114300,
  "2025-05-30": 161600,
  "2025-05-31": 114300,
  "2025-06-01": 114300,
  "2025-06-02": 224300,
  "2025-06-03": 234300,
  "2025-06-04": 323300,
};

let bangkokPriceList = {
  "2025-05-06": 540700,
  "2025-05-07": 648700,
  "2025-05-08": 648700,
  "2025-05-09": 340700,
  "2025-05-10": 340700,
  "2025-05-11": 340700,
  "2025-05-12": 271700,
  "2025-05-13": 271700,
  "2025-05-14": 271700,
  "2025-05-15": 384700,
  "2025-05-16": 271700,
  "2025-05-17": 271700,
  "2025-05-18": 271700,
  "2025-05-19": 340700,
  "2025-05-20": 528700,
  "2025-05-21": 311700,
  "2025-05-22": 403700,
  "2025-05-23": 311700,
  "2025-05-24": 271700,
  "2025-05-25": 271700,
  "2025-05-26": 271700,
  "2025-05-27": 271700,
  "2025-05-28": 271700,
  "2025-05-29": 271700,
  "2025-05-30": 271700,
  "2025-05-31": 271700,
  "2025-06-01": 304700,
  "2025-06-02": 340700,
  "2025-06-03": 271700,
  "2025-06-04": 271700,
};

let taipeiPriceList = {
  "2025-05-06": 404300,
  "2025-05-07": 266000,
  "2025-05-08": 290200,
  "2025-05-09": 266000,
  "2025-05-10": 266000,
  "2025-05-11": 322300,
  "2025-05-12": 266000,
  "2025-05-13": 304300,
  "2025-05-14": 366500,
  "2025-05-15": 388500,
  "2025-05-16": 322300,
  "2025-05-17": 266000,
  "2025-05-18": 266000,
  "2025-05-19": 266000,
  "2025-05-20": 377300,
  "2025-05-21": 386500,
  "2025-05-22": 386500,
  "2025-05-23": 388500,
  "2025-05-24": 290200,
  "2025-05-25": 290200,
  "2025-05-26": 266000,
  "2025-05-27": 266000,
  "2025-05-28": 266000,
  "2025-05-29": 266000,
  "2025-05-30": 298000,
  "2025-05-31": 266000,
  "2025-06-01": 266000,
  "2025-06-02": 266000,
  "2025-06-03": 326000,
  "2025-06-04": 296000,
};

let parisPriceList = {
  "2025-05-06": 940400,
  "2025-05-07": 940400,
  "2025-05-08": 940400,
  "2025-05-09": 1120400,
  "2025-05-10": 1390400,
  "2025-05-11": 1870400,
  "2025-05-12": 1870400,
  "2025-05-13": 1340400,
  "2025-05-14": 1030400,
  "2025-05-15": 1150400,
  "2025-05-16": 1240400,
  "2025-05-17": 1390400,
  "2025-05-18": 1030400,
  "2025-05-19": 940400,
  "2025-05-20": 1030400,
  "2025-05-21": 1030400,
  "2025-05-22": 940400,
  "2025-05-23": 1030400,
  "2025-05-24": 1030400,
  "2025-05-25": 940400,
  "2025-05-26": 940400,
  "2025-05-27": 940400,
  "2025-05-28": 940400,
  "2025-05-29": 940400,
  "2025-05-30": 1030400,
  "2025-05-31": 1030400,
  "2025-06-01": 1340400,
  "2025-06-02": 1870400,
  "2025-06-03": 1870400,
  "2025-06-04": 1340400,
};

// priceList의 가격 중 최소값, 최대값을 찾는 함수
function findMinMax(priceList) {
  let arr = [];
  for (const key in priceList) {
    arr.push(priceList[key]);
  }

  let minPrice = arr[0];
  let maxPrice = arr[0];
  let length = arr.length;

  // 최소값 찾기
  for (let i = 0; i < length; i++) {
    if (arr[i] < minPrice) {
      minPrice = arr[i];
    }
  }
  // 최대값 찾기
  for (let i = 0; i < length; i++) {
    if (arr[i] > maxPrice) {
      maxPrice = arr[i];
    }
  }
  return [minPrice, maxPrice];
}

// 나라별 기본 obj 만드는 함수
function MakePriceObj(priceList) {
  let minMax = findMinMax(priceList);

  this.minPrice = minMax[0];
  this.maxPrice = minMax[1];
  this.difference = minMax[1] - minMax[0];
  this.unit = Math.floor(this.difference / 39);
}

// min, max 구간 리스트 만드는 함수
function calcMinMaxUnit(minPrice, unit) {
  let newObj = {};
  for (let i = 0; i <= 39; i++) {
    newObj[i + 1] = {
      min: minPrice + unit * i,
      max: minPrice + unit * (i + 1) - 1,
    };
  }
  return newObj;
}

// chart height 계산 함수
function calcHeight(minMaxList, price) {
  // obj로 min max List를 넘겨야 함
  for (let i = 0; i <= 39; i++) {
    if (minMaxList[i + 1].min <= price && price <= minMaxList[i + 1].max) {
      return 2.25 * (i + 1);
    }
  }
}

// height 값을 모은 list 만드는 함수
function makeHeightList(minMaxList, priceList) {
  let heightList = [];

  for (const key in priceList) {
    let price = priceList[key];
    let height = calcHeight(minMaxList, price);
    heightList.push(height);
  }

  return heightList;
}

// height 값을 실제로 적용하는 함수
function setHeight(chartName, heightList) {
  for (let i = 0; i < 31; i++) {
    $($(`.mfc__tp[data-chart=${chartName}] .mfc__chart-item`)[i])
      .find(".mfc__chart-bar-fill")
      .css("height", heightList[i] + 30);
  }
}

// 최저가 날짜만 찾아서 list로 만드는 함수
function makeLowestPriceList(priceList, minPrice) {
  let lowestPriceList = [];

  for (const key in priceList) {
    if (priceList[key] === minPrice) {
      lowestPriceList.push(key);
    }
  }
  return lowestPriceList;
}

// monthly-fare-chart에 필요한 모든 변수들을 한데 묶는 함수
function setVariables(priceList) {
  let variables = {};

  variables[`obj`] = new MakePriceObj(priceList);
  variables[`minMaxObj`] = calcMinMaxUnit(
    variables[`obj`].minPrice,
    variables[`obj`].unit
  );
  variables[`heightList`] = makeHeightList(variables[`minMaxObj`], priceList);
  variables[`lowestList`] = makeLowestPriceList(
    priceList,
    variables[`obj`].minPrice
  );

  return variables;
}

let osaka = setVariables(osakaPriceList);
let bangkok = setVariables(bangkokPriceList);
let taipei = setVariables(taipeiPriceList);
let paris = setVariables(parisPriceList);

// lowest-price 클래스 추가 함수
function addLowestClass(lowestList, element) {
  lowestList.forEach(function (item) {
    if ($(element).data("chart-date") === item) {
      $(element).addClass("lowest-price");
    }
  });
}

// 툴팁 만들어 적용하는 함수
function setTooltip(priceList, element, minPrice) {
  for (const key in priceList) {
    if ($(element).data("chart-date") === key) {
      let tooltip = `KRW ${priceList[key].toLocaleString("ko-kr")}`;

      if (priceList[key] === minPrice) {
        tooltip = `최저가 KRW ${priceList[key].toLocaleString("ko-kr")}`;
      }

      $(element).attr("data-tooltip", tooltip);
    }
  }
}

// tabPanel 실제로 setting 하는 함수
function setTabPanel(cityName, priceList, cityObj) {
  let $element = $(`.mfc__tp[data-chart=${cityName}] .mfc__chart-item`);
  setHeight(cityName, cityObj.heightList);
  $element.removeClass("lowest-price");
  $element.each(function (index, element) {
    addLowestClass(cityObj.lowestList, element);
    setTooltip(priceList, element, cityObj.obj.minPrice);
  });
}

// 오사카 최초 실행
setTabPanel("osaka", osakaPriceList, osaka);

// tab 클릭 이벤트
$(".mfc__t").on("click", function () {
  $(".mfc__t.is-selected").removeClass("is-selected");
  $(this).addClass("is-selected");
  let chart = $(this).data("chart");
  $(".mfc__tp").attr("data-chart", chart);

  if (chart === "osaka") {
    setTabPanel(chart, osakaPriceList, osaka);
  } else if (chart === "bangkok") {
    setTabPanel(chart, bangkokPriceList, bangkok);
  } else if (chart === "taipei") {
    setTabPanel(chart, taipeiPriceList, taipei);
  } else if (chart === "paris") {
    setTabPanel(chart, parisPriceList, paris);
  }
});

// 툴팁 hover 이벤트
$(document).on("mouseenter", ".mfc__chart-item", function () {
  let item = $(this)[0];
  let offsetLeft = $(this).offset().left;
  let top = item.getBoundingClientRect().top;
  const itemWidth = $(this).outerWidth();

  $(".tooltip-layer .tooltip").remove();
  let $tooltip = $('<div class="tooltip"></div>');

  if ($(this).hasClass("lowest-price")) {
    $tooltip.css({
      backgroundColor: "var(--red)",
      color: "var(--white)",
      width: "170px",
      "--tooltip-color": "#c40b40",
    });
  }

  $tooltip.css({
    top: top - 50,
    left: offsetLeft + itemWidth / 2,
  });

  $tooltip.html($(this).attr("data-tooltip"));
  $(".tooltip-layer").append($tooltip);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      $tooltip.addClass("show");
    });
  });
});

$(document).on("mouseleave", ".mfc__chart-item", function () {
  let $tooltip = $(".tooltip-layer .tooltip");
  $tooltip.removeClass("show");
  $tooltip.css({
    transform: "translate(-50%, 0)",
  });
  setTimeout(() => {
    $tooltip.remove();
  }, 300);
});
