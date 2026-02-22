
const fs = require("fs");

const channels = [
  { id: "1tv", name: "1TV HD" },
  { id: "rustavi2", name: "Rustavi 2" },
  { id: "imedi", name: "Imedi TV" }
];

function formatDate(date) {
  return date.toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d+/, "") + " +0400";
}

function generateEPG() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<tv>\n`;

  const now = new Date();

  channels.forEach(channel => {

    xml += `\n  <channel id="${channel.id}">
    <display-name>${channel.name}</display-name>
  </channel>\n`;

    for (let i = 0; i < 24; i++) {

      let start = new Date(now.getTime() + (i * 60 * 60 * 1000));
      let stop = new Date(now.getTime() + ((i + 1) * 60 * 60 * 1000));

      xml += `
  <programme channel="${channel.id}"
    start="${formatDate(start)}"
    stop="${formatDate(stop)}">
    <title>Program ${i + 1}</title>
  </programme>\n`;
    }

  });

  xml += `</tv>`;

  fs.writeFileSync("epg-ge.xml", xml);
  console.log("EPG Updated Successfully");
}

generateEPG();
