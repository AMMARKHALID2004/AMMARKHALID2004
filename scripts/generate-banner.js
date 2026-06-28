const figlet = require("figlet");
const fs = require("fs");

const name = "Ammar  Khalid"; 
const tagline = "CS Student | ML & Data Science";

figlet.text(name, { font: "Standard" }, function (err, asciiArt) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }

  const lines = asciiArt.split("\n");
  const lineHeight = 18;
  const width = Math.max(...lines.map((l) => l.length), tagline.length) * 9 + 40;
  const nameBlockHeight = lines.length * lineHeight;
  const height = nameBlockHeight + 60; 

  const escape = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const svgLines = lines
    .map((line, i) => {
      return `<text x="20" y="${30 + i * lineHeight}" font-family="monospace" font-size="14" fill="#c9d1d9" xml:space="preserve">${escape(line)}</text>`;
    })
    .join("\n");

  const taglineSvg = `<text x="20" y="${30 + nameBlockHeight + 15}" font-family="monospace" font-size="16" fill="#8b949e" xml:space="preserve">${escape(tagline)}</text>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="#0d1117"/>
  ${svgLines}
  ${taglineSvg}
</svg>`;

  fs.mkdirSync("assets", { recursive: true });
  fs.writeFileSync("assets/banner.svg", svg);
  console.log("Banner generated!");
});
