# 아시아나 항공 class name 코딩 컨벤션

1. block 클래스명이 3단어 이상인 경우 약어 사용, 2단어 이하인 경우 풀네임 사용

2. 약어를 사용할 경우, 해당 class-name을 사용하는 모든 부분에서 약어 사용

3. modifier는 --를 사용하지 않고 독립적인 클래스명 지정

4. selected, active modifier는 is-selected, is-active를 사용

5. booking-form의 경우 css가 복잡한 관계로 반응형 코드를 responsive.css에 포함하지 않고 booking-form.css에서 따로 관리

6. header, footer의 경우 반응형 코드를 header.css, footer.css에서 따로 관리
   <br><br><br>

## 약어 설명

- t: tab
- tp: tap-panel
- ctrl: control
- 항공권 예약 form
  - fsw: flight-services-widget
- 먼슬리 가격 차트
  - mfc: monthly-fare-chart

<br><br><br>

# 아시아나 항공 README

이 프로젝트의 상세 README는 노션으로 제작되었습니다.
자세한 내용은 아래 링크를 참조하세요.

### [노션에서 README 보기](https://www.notion.so/Asiana-Airlines-20d6a24b2b63809bb0c8d0b8aa3fa4ab?source=copy_link)<br><br><br>

## 1. 프로젝트 명

### Asiana Airlines<br><br><br>

## 목차

[1. 프로젝트 명](#1-프로젝트-명)<br>
[2. 프로젝트 개요](#2-프로젝트-개요)<br>
[3. 웹 사이트 구성 및 주요 기능](#3-웹-사이트-구성-및-주요-기능)<br>
[4. 폴더 구조](#4-폴더-구조)<br>
[5. 기술 스택](#5-기술-스택)<br>
[6. 배운 점](#6-배운-점)<br>
[7. 개선 사항](#7-개선-사항)<br>
[8. 프로젝트를 마치며 (느낀점)](#8-프로젝트를-마치며-느낀점)<br><br><br>

## 2. 프로젝트 개요

여러 항공사 웹 사이트를 레퍼런스로 아시아나 항공 메인 페이지를 리뉴얼 하였습니다. 항공사 웹 사이트에서 볼 수 있는 여러 카테고리들을 페이지에 담아 풍성한 웹 사이트를 구성하였습니다.  
<br><br>

### ✅ 프로젝트 제작 기간

- 2025.04.14 ~ 2025.06.03 (약 6주)

### ✅ 프로젝트 제작 인원

- 1인 (기획부터 퍼블리싱까지 개인 진행)
  <br><br><br>

## 3. 웹 사이트 구성 및 주요 기능

### ✅ 각 섹션 별 주요 기능

### 🔷 공통 기능

#### 1. Header와 Footer

- 공통 기능
  - 모바일 버전에서 상세 메뉴를 숨기고, 클릭시 아코디언 메뉴가 펼쳐지도록 함
  - 아코디언 메뉴는 jQuery의 .slideUp(), .slideDown() 메서드 활용해 구현
    <br><br>

#### 2. Header

- Header의 대메뉴에 hover 하면 그 아래로 인디케이터가 슬라이드되며 움직이도록 함
- jQuery를 이용해 대메뉴의 길이에 따라 인디케이터의 넓이가 달라지도록 함

  <br><br><br><br>

### 🔷 Front Page

#### 1. 여러 Section 에서 공통되는 기능

- Main Slider, 추천 항공권 섹션에서 Swiper를 이용한 슬라이드 인터렉션 구현
- 항공권 예매 Form, 한 눈에 보는 항공권 가격 섹션에서 jQuery를 이용해 tab 메뉴 구현
- 부가서비스, 제휴서비스 섹션은 같은 버튼 구조로 이루어져있으며, display: grid를 사용해 섹션의 구조를 설계하고, display: flex를 사용해 버튼이 뷰포트 사이즈에 맞게 변경되도록 함

#### 2. 항공권 예매 Form

- jQuery를 통해 출발지/도착지 선택, 가는 날/오는 날 선택(캘린더), 승객 수 선택, 좌석 등급 선택 모달을 구현함
- 사용자의 행동에 따라 여러 경우의 수를 최대로 대응할 수 있도록 기능을 구현함
- display: grid를 사용해 Form의 구조를 설계하고, display: flex를 이용해 각각의 버튼 및 input이 뷰포트 사이즈에 맞게 채워지도록 함

#### 3. 한 눈에 보는 항공권 가격

- 막대 그래프에 hover시 그 날의 항공권 가격이 툴팁으로 표시되도록 함
- 그 날의 가격이 한 달 간의 가격 중 최저가인 경우 막대와 툴팁을 빨간색으로 표시함
- HTML의 data 속성을 이용해 값을 저장하고 jQuery를 통해 그 값을 가져와 사용함

#### 4. 이 달의 추천 여행지

- 뷰포트 전체를 꽉 채우도록 구성된 섹션
- display: flex를 이용해 hover시 이미지가 확대대고 숨겨져 있던 텍스트가 떠오르도록 함

### 5. 자주 묻는 질문

- jQuery의 .slideUp(), .slideDown() 메서드를 사용해 아코디언 메뉴를 구현

### ✅ 재사용 코드를 독립적 HTML 파일로 분리 (모듈화)

- Header와 Footer를 각각의 독립된 HTML 파일로 나누어 세부 페이지 제작 시 페이지에 공통으로 포함되는 Section을 추가 코드 작성 없이 재사용할 수 있도록 설계하였습니다.
- 각 HTML 파일을 include 하기 위해 jQuery의 .load() 메서드를 사용하였습니다.

### ✅ 반응형 대응

- 뷰포트 사이즈를 총 4 구간의 break-point로 나누었습니다.
- 항공권 예매 form, 부가서비스, 제휴서비스 섹션을 grid를 사용해 설계하였습니다.
- 여러 섹션 내부 요소(grid 내부 아이템 등)들을 flex를 사용해 구현하였습니다.

#### Break Point

```
@media screen and (max-width: 576px) {
  /* sm */
  /* 모바일 */
}

@media screen and (min-width: 577px) and (max-width: 768px) {
  /* md  */
  /* 태블릿, 대형 모바일 */
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  /* lg  */
  /* 소형 데스크탑, 랩탑, 대형 태블릿 */
}

@media screen and (min-width: 1025px) {
  /* xl */
  /* 대형 데스크탑 */
}
```

<br><br><br>

## 4. 폴더 구조

모든 파일들은 기본적으로 역할에 따른 네이밍을 가지고 있으며, 역할에 따라 각각 다른 파일로 분리되도록 설계했습니다.

#### HTML

- index 등 페이지 전체 코드를 담고있는 파일은 특정 폴더 내부가 아닌 root에 독립적으로 존재합니다.
- 별도의 HTML로 분리된 파일(Header, Footer)은 include 폴더에 포함되도록 설계하였습니다.

#### CSS

- 모든 CSS 파일은 CSS 폴더에 포함되도록 설계하였습니다.

#### JavaScript

- 모든 Javascript 코드는 js 폴더에 포함되도록 설계하였습니다.

```
ASIANA-AIRLINES/
├── css/
│   ├── base/
│   │   ├── common.css      // 페이지 전반에 걸쳐 공통으로 사용되는 css 코드
│   │   ├── reset.css
│   │   ├── responsive.css  // 반응형 관련 코드
│   │   ├── typograpy.css
│   │   └── variables.css
│   ├── components/        // 페이지에서 재사용되는 UI 컴포넌트 코드 모음
│   │   ├── booking-forms.css  // 항공권 예매 form에 관련된 코드
│   │   └── card.css        // card UI 관련 코드
│   ├── layout/             // 웹 페이지의 레이아웃에 관련된 코드 모음
│   │   ├── footer.css
│   │   └── header.css
│   └── main.css            // base, components, layout을 제외하고 front-page에 사용되는 모든 css 코드
│
├── image/
│
├── include/                // 분리된 HTML 파일 모음
│   ├── booking-form.html   // 항공권 예매 form
│   ├── footer.html
│   └── header.html
│
├── js
│   ├── booking-form.js  // booking-form 동작에 관련된 js 코드
│   ├── common.js        // 모든 페이지에서 사용되는 공통된 js 코드
│   ├── main.js          // booking-form, common.js의 코드 외의, front-page에서 사용되는 코드
│   └── slider.js        // swiper에 관련된 코드
│
├── index.html
└── README.md
```

<br><br><br>

## 5. 기술 스택

### ✅ HTML5

### ✅ CSS (BEM)

### ✅ JavaScript (jQuery)

### ✅ jQuery Plugin (Swiper)

### ✅ Bootstrap Icons, Google Material Icons

### ✅ Figma

<br><br><br>

## 6. 배운 점

### ✅ BEM 방식을 사용한 CSS 코드 설계

- CSS 코드를 작성할 때 클래스 선택자가 길어지는 것을 방지하기 위해 BEM 방식을 선택하였습니다.
- BEM 방식을 효과적으로 적용하기 위해 선행되어야 하는 체계적인 HTML 설계에 대해 배웠습니다.
- HTML 설계시 Block, Element, modifier를 어떻게 구분하는 것이 좋은지 배웠습니다.
  <br><br>

### ✅ 사용자의 입력을 직접 받는 UI 설계

- 항공권 예매 form 설계를 통해 직접적으로 사용자의 입력을 받고, 행동과 반응을 긴밀히 예측해야 하는 UI 설계 방식을 배웠습니다.
- UI를 설계할 때는 어떤 사용자의 행동에도 UI가 망가지거나 기능이 무너지지 않도록 해야한다는 사실을 배웠습니다.
- 사용자의 편의성을 최우선으로 해 인터렉션을 구현하는 방법을 배웠습니다.
  <br><br>

### ✅ JavaScript 함수 설계

- 코드의 역할에 따라 코드를 함수 단위로 분류하고 그 함수를 재사용하기 위한 설계 방법을 배웠습니다.
  <br><br>

### ✅ HTML의 data 속성 사용

- HTML의 data 속성에 값을 저장하고 그 값을 jQuery로 꺼내 사용하는 방법을 배웠습니다.
- data 속성값을 jQuery를 이용해 조작하는 방법을 배웠습니다.
  <br><br><br>

## 7. 개선 사항

### ✅ 항공권 예약 Form의 편도/다구간 tab의 좌석 등급 선택 모달에서 조건에 따른 체크박스 비활성화 여부

- 항공권 예약 Form에서 편도/다구간 tab의 경우, 좌석 등급 선택 모달에서 “출도착편 다른 좌석 등급 선택” 체크박스가 비활성화 되어야합니다.
- 편도/다구간 tab에서 최초로 좌석 등급 모달을 열면 해당 체크박스가 비활성화되어 있지만, “좌석 승급 가능한 운임만 조회” 체크박스를 체크한 뒤 해제하면 다른 좌석 등급 선택 체크박스의 비활성화가 해제되는 문제가 있습니다.
- 이 문제는 사용자의 행동을 예측했으나 대응하지 못한 부분이므로, 차후 프로젝트를 개선하게 된다면 해당 경우를 대응할 수 있는 로직을 추가할 예정입니다.

<br><br><br>

## 8. 프로젝트를 마치며 (느낀점)

저의 두 번째 프로젝트인 Asiana Airlines는 사용자와의 상호작용이 매우 중요한 UI를 가지고 있습니다. 항공권 예매 From을 제작하며, 사용자의 행동을 하나하나 예측해 UI를 설계하는 경험을 통해 많은 것을 배울 수 있었습니다. 그 과정에서 실제로 HTML을 설계하고 CSS를 입히는 것 뿐만 아니라, 다양한 테스트를 통해 실제로 웹 사이트에서 벌어질 수 있는 경우의 수를 최대한 예측하고 대응해야 한다는 것을 알게되었습니다. 이러한 과정은 쉽지 않았지만 사용자의 관점을 보다 더 깊게 생각할 수 있는 태도를 길러주었습니다. 앞으로 실제 현장에서 퍼블리셔로 근무할 때도, 어떻게 해야 사용자가 더 편리하게 웹 사이트를 이용할 수 있을지에 대해 고민한다면 보다 더 나은 사용자 경험을 설계할 수 있는 퍼블리셔가 될 수 있을거라 생각합니다.
