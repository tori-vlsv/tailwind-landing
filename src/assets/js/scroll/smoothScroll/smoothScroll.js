import SmoothScroll from "smooth-scroll";

function smoothScroll() {
  new SmoothScroll('a[href*="#"]', {
    speed: 1500,
    after: function () {
      $("body").css("overflow", "");
    },
  });
}
smoothScroll();
