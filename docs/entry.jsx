// entry.js with no routing
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var Docs = require('./docs.jsx')

var IndexTemplate = require('./index.jsx');

const Index = React.createFactory(IndexTemplate);
const renderIndex = (component) => `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(component)}`;

module.exports = function render(locals, callback) {
  var content = ReactDOMServer.renderToStaticMarkup(<Docs />);
  var html = renderIndex(new Index({
    content: content
  }));
  callback(null, '<!DOCTYPE html>' + html)
}
