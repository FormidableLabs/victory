var marked = require("marked");
var docs = require("./docs/pie.md");

document.getElementById("markdown").innerHTML =
  marked(docs);
