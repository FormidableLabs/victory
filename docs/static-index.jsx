import React from 'react';

class Index extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta dangerouslySetInnerHTML={{ __html: `<!--[if lt IE 9]>
            <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.7/es5-shim.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.7/es5-sham.min.js"></script>
          <![endif]-->` }} />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title>Victory</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"/>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/monokai.min.css"/>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css"/>
          <link href="https://fonts.googleapis.com/css?family=Karla:400,700,400italic" rel="stylesheet" type="text/css" />
        </head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: `<!--[if lt IE 8]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser.
            Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
          <![endif]-->` }} />
          <div id="content" dangerouslySetInnerHTML={{ __html: this.props.content }} />
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js"></script>
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js"></script>
          <script src={this.props.bundle}></script>
        </body>
      </html>
    );
  }
}

module.exports = Index;
