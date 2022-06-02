import $ from "jquery";

export default function isCurrentPage() {
  const page = window.location.pathname;
  if (page == page) {
    $(`a[href="${page}"]`).on("click", function (e) {
      e.preventDefault();
    });
  }
}
isCurrentPage();
