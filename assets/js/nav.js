let oldIndex = 0;
updateDash(0);

function updateDash(index) {
  const squiggle = document.querySelector(".squiggle");
  const pathLength = squiggle.getTotalLength();
  const start = pathLength * 0.25 * index;
  const end = pathLength * 0.25 * (index + 1);
  squiggle.style.setProperty("--factor", Math.abs(oldIndex - index));
  oldIndex = index;
  squiggle.setAttribute(
    "stroke-dasharray",
    `1, ${start}, ${end - start}, ${pathLength}`
  );
}

const links = document.querySelectorAll("a");
links.forEach((link, i) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    updateDash(i);
  });
});