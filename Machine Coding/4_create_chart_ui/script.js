const pieChart = document.querySelector(".piechart");
const rangeSlider = document.querySelector(".range");

window.addEventListener("load", (e) => {
  pieChart.style.background = `conic-gradient(lightgreen ${rangeSlider.value}deg, green ${rangeSlider.value}deg 360deg)`;

  rangeSlider.addEventListener("input", (e) => {
    pieChart.style.background = `conic-gradient(lightgreen ${e.target.value}deg, green ${e.target.value}deg 360deg)`;
  });
});
