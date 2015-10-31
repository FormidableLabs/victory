import React from 'react';

class Index extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title>Demo</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"/>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/monokai.min.css"/>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css"/>
          <link href="https://fonts.googleapis.com/css?family=Karla:400,700,400italic" rel="stylesheet" type="text/css" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: this.props.content }} />
          <script src="https://fb.me/react-0.13.3.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.25/browser.js"></script>
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js"></script>
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js"></script>
          <script async defer type="text/javascript" src="main.js"></script>
          <script src="bundle.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Index;
