const html2canvas = require("html2canvas");
// Define the function
// to screenshot the div
function takeshot() {
  let div = document.getElementById("canvas-wrapper");

  // Use the html2canvas
  // function to take a screenshot
  // and append it
  // to the output div
  html2canvas(div).then(function (canvas) {
    const link = document.createElement("a");
    link.href = canvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream");
    link.download = "canvas.jpg";
    link.click();
  });
}

export default takeshot;
