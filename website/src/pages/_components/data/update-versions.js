const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const sortByVersion = (a, b) => {
  let i = 0;
  const aVersionParts = a.version.split(".");
  const bVersionParts = b.version.split(".");

  // Compare each part of the version number
  while (i < aVersionParts.length || i < bVersionParts.length) {
    const aPart = Number(aVersionParts[i] || "0");
    const bPart = Number(bVersionParts[i] || "0");

    if (aPart < bPart) return 1;
    if (aPart > bPart) return -1;

    i++;
  }

  return 0;
};

const output = execSync("npm view victory time --json");
const data = JSON.parse(output.toString());

delete data.modified;
delete data.created;

const downloads = Object.keys(data)
  .map((version) => ({
    version,
    // eslint-disable-next-line no-magic-numbers
    date: data[version].substr(0, 10),
  }))
  .filter((v) => !(v.version.includes("next") || v.version.includes("alpha")))
  .sort(sortByVersion);

const contents = `
const data = {
  data: ${JSON.stringify(downloads, null, 2)}
};

export default data;
`;

fs.writeFileSync(
   
  path.resolve(__dirname, "versions.js"),
  contents,
  "utf8",
);
