function closeLatest() {
  const latest = document.querySelector(".latest");
  const latestContent = latest.textContent.trim();

  sessionStorage.setItem("dismissedLatest", latestContent);
  latest.style.display = "none";
}

window.addEventListener("load", function () {
  document.addEventListener("DOMContentLoaded", function () {
    const latest = document.querySelector(".latest");
    const latestContent = latest.textContent.trim();

    const dismissedContent = sessionStorage.getItem("dismissedLatest");

    if (dismissedContent === latestContent) {
      latest.style.display = "none";
    } else {
      latest.style.display = "block";
    }
  });
});
