아시아나 항공 class name 코딩 컨벤션

1. block 클래스명이 3단어 이상인 경우 약어 사용, 2단어 이하인 경우 풀네임 사용

2. 약어를 사용할 경우, 해당 class-name을 사용하는 모든 부분에서 약어 사용

3. modifier는 --를 사용하지 않고 독립적인 클래스명 지정

4. selected, active modifier는 is-selected, is-active를 사용

5. booking-form의 경우 css가 복잡한 관계로 반응형 코드를 responsive.css에 포함하지 않고 booking-form.css에서 따로 관리

6. header, footer의 경우 반응형 코드를 header.css, footer.css에서 따로 관리

---

약어 설명

t: tab
tp: tap-panel
ctrl: control

// 항공권 예약 form
fsw: flight-services-widget
// 먼슬리 가격 차트
mfc: monthly-fare-chart
