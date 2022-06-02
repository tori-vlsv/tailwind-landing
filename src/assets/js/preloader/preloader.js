import $ from "jquery";
import gsap from "gsap";

function renderPage() {
  const render = $(".render");
  gsap
    .fromTo(
      render,
      0.5,
      { opacity: "1", zIndex: "99999" },
      { opacity: "0", zIndex: "-1" }
    )
    .delay(0.4)
    .then(hideRender);
  function hideRender() {
    $(render).remove();
  }
}
renderPage();
