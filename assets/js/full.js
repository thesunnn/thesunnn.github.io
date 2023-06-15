$(document).ready(function() {
  $('#fullpage').fullpage({
    navigation: true,
    navigationPosition: 'right',
    // navigationTooltips: ['section1', 'section2','section3','section4', 'section5'],
    showActiveTooltip: true,
    slidesNavigation: true,
      slidesNavPosition: 'bottom',
    controlArrows:false,
  });
});

   // 메인에서 상단이동
   $('#last').click(function () {
    //$.fn.fullpage.setScrollingSpeed(0); 효과를 없애고싶을때
    $.fn.fullpage.moveTo(5, 5); // 이동하고싶은 페이지
    //$.fn.fullpage.setScrollingSpeed(700); 효과를 없애고싶을때
  });

