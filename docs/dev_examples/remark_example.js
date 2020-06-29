/* eslint-disable */
const remark = require("remark");

remark()
  .data("settings", { commonmark: true, emphasis: "*", strong: "*" })
  .process("_Emphasis_ and __importance__", function(err, file) {
    if (err) throw err;
    console.log("as file: ", file);
    console.log("as string: ", String(file));
  });
