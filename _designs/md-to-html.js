var marked = require("marked");
var fs = require("fs");
​
fs.readFile("./docs/pie.md", "utf8", function(err, data){
    if (err) { console.log(err) }
​
    fs.writeFile("pie.html", marked(data), function(err) {
      if(err) {
          return console.log(err);
      }
​
      console.log("The file was saved!");
    });
});
