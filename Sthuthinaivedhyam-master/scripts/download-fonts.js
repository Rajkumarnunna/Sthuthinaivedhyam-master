
const https = require("https");
const fs = require("fs");
const path = require("path");

const fontUrl = "https://github.com/google/fonts/raw/main/ufl/spacemono/SpaceMono-Regular.ttf";
const fontPath = path.join(__dirname, "assets", "fonts", "SpaceMono-Regular.ttf");

if (!fs.existsSync(path.dirname(fontPath))) {
  fs.mkdirSync(path.dirname(fontPath), { recursive: true });
}

https.get(fontUrl, (response) => {
  response.pipe(fs.createWriteStream(fontPath));
});

