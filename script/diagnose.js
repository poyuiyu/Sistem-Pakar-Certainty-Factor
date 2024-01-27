const resultContainer = document.querySelector(".result-container");
const result = document.querySelector(".result");
const warning = document.querySelector(".warning");

let cfCombine = 0;
let diagnostic = "";
const redBg = "#fff3cd";
const redBorder = "#ffeeba";
const redColor = "#856404";
const greenBg = "#f8d7da";
const greenBorder = "#f5c6cb";
const greenColor = "#721c24";

function diagnose(cfUser, cfPakar) {
  let cfPerQuestion = [0, 0, 0, 0, 0, 0, 0, 0];

  cfPerQuestion.forEach((cf, index) => {
    cf = cfPakar[index] * cfUser[index];
    index === 0
      ? (cfCombine = cfCombine + cf)
      : (cfCombine = cfCombine + cf * (1 - cfCombine));
  });

  cfCombine = (Math.round(cfCombine * 10000) * 100) / 10000;

  if (cfCombine >= 0 && cfCombine <= 40) {
    diagnostic = "TIDAK TERINFEKSI PENYAKIT DBD";

    setBannerColor(warning, "#cce5ff", "#b8daff", "#004085");
  } else if (cfCombine > 41 && cfCombine <= 80) {
    diagnostic = "TERINFEKSI PENYAKIT DBD RINGAN";
    setBannerColor(result, redBg, redBorder, redColor);
    setBannerColor(warning, redBg, redBorder, redColor);

    warning.textContent =
      "Perlu diperhatikan Anda harus konsultasi kepada dokter Anda untuk pemeriksaan lebih lanjut.";
  } else if (cfCombine > 81 && cfCombine <= 100) {
    diagnostic = "TERINFEKSI PENYAKIT DBD BERAT";
    setBannerColor(result, greenBg, greenBorder, greenColor);
    setBannerColor(warning, greenBg, greenBorder, greenColor);

    warning.textContent =
      "Segera Periksakan Keadaan Anda Langsung Kepada Dokter";
  } else {
    diagnostic = "SANGAT YAKIN";
    setBannerColor(result, redBg, redBorder, redColor);
    setBannerColor(warning, redBg, redBorder, redColor);
  }

  resultContainer.scrollIntoView();
  result.classList.toggle("disable");
  warning.classList.toggle("disable");
  result.innerHTML = `
  <h3>Hasil Diagnosis Anda</h3>
  Dari gejala-gejala yang Anda rasakan, 
  sistem mendiagnosis Anda memiliki <strong>${diagnostic}</strong> 
  | persentase hasil sistem pakar Anda <strong>${cfCombine}%.</strong>`;
  cfPerQuestion = [0, 0, 0, 0, 0, 0, 0, 0];
  cfCombine = 0;
}

const setBannerColor = (item, bgColor, borderColor, color) => {
  item.style.backgroundColor = bgColor;
  item.style.borderColor = borderColor;
  item.style.color = color;
};

export { diagnose };
