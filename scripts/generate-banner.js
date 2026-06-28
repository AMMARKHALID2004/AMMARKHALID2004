const figlet = require("figlet");
const fs = require("fs");

const name = "Ammar Khalid";

figlet.text(name, { font: "Standard" }, function (err, asciiArt) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }

  const lines = asciiArt.split("\n");
  const lineHeight = 18;
  const width = Math.max(...lines.map((l) => l.length)) * 9 + 40;
  const height = lines.length * lineHeight + 40;

  const svgLines = lines
    .map((line, i) => {
      const escaped = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<text x="20" y="${30 + i * lineHeight}" font-family="monospace" font-size="14" fill="#c9d1d9" xml:space="preserve">${escaped}</text>`;
    })
    .join("\n");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="#0d1117"/>
  ${svgLines}
</svg>`;

  fs.mkdirSync("assets", { recursive: true });
  fs.writeFileSync("assets/banner.svg", svg);
  console.log("Banner generated!");
});
