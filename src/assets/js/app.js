require("./preloader/preloader");
require("./linksChecker/checkInternalLinks/checkInternalLinks");
require("./routing/routing");
require("./scroll/smoothScroll/smoothScroll");
require("./scroll/scrollReveal/scrollReveal");
require("./linksChecker/checkTarget/checkTarget");

// import feather from "feather-icons";
// import lottie from "lottie-web";

// // feather icons init
// feather.replace();

// // lottie animation for feather icons
// function drawSvgByLottie() {
//   let container = document.querySelector(".animation");
//   let button = $(".test");

//   let animation = lottie.loadAnimation({
//     container: container,
//     renderer: "svg",
//     loop: false,
//     autoplay: false,
//     path: "assets/js/animations/activity.json",
//   });
//   animation.onComplete = function () {
//     animation.stop();
//   };
//   button.on("click", function () {
//     animation.play();
//   });
//   button.on("mouseover", function () {
//     animation.play();
//   });
//   button.on("mouseleave", function () {
//     animation.play();
//   });
// }
// drawSvgByLottie();