import ScrollReveal from "scrollreveal";

function scrollInit() {
  const options = {
    distance: "20%",
    origin: "bottom",
    opacity: 0,
    mobile: false,
  };
  ScrollReveal().reveal(".reveal", options);
}
scrollInit();
