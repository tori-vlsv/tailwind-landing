import $ from "jquery";

function checkInternalLinks() {
  const links = $("a[href^='/']");
  Array.from(links).forEach((link) => {
    fetch(link.href, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then(function (response) {
      if (response.status == 404) {
        $(link).attr("href", "/404");
      }
    });
  });
}
checkInternalLinks();
