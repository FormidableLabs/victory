Victory Documentation Site
=======
Welcome to the docs site!

Victory is an opinionated set of data visualization tools built in React and based on d3. Victory relies on d3 for everything d3 does best, and lets React handle *all* the rendering. Victory's API is built around sensible defaults that make it easy to get started.

###Installation

```

```

###Set up

In your html document, add the required CodeMirror scripts at the bottom, before your bundle script:

```html
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js"></script>
```

In the head of your document, either add the css files from the demo or from a CDN like:

```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"/>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/monokai.min.css"/>
```

In your JSX, require the component as use it like this:

```javascript
'use strict';

var React = require('react/addons');
var Playground = require('component-playground');
var Button = require('./components/button');

var componentExample = require("raw!./examples/component.example");

var Index = React.createClass({
  render() {
    return (
      <div className="component-documentation">
        <Playground codeText={componentExample} scope={{React: React, Button: Button}}/>
      </div>
    );
  }
});

React.render(<Index/>, document.getElementById('root'));
```

###Props

####`codeText`
_React.PropTypes.string.isRequired_

`codeText` takes a string of JSX markup as its value. While you can just pass it a string, I find it is easier to make a separate file and use Webpack's raw loader to load in the raw source. In the example above I use the .example extension, and an examples folder to organize my samples. The only requirement for this code is that at the bottom you need to add:

```
React.render(<YourComponentName/>, mountNode);
```

An example file would look like:

```
var ComponentExample = React.createClass({
  render: function() {
    return (
        <p>Hi</p>
    )
  }
});

React.render(<ComponentExample/>, mountNode);
```

####scope
_React.PropTypes.object.isRequired_

When evaluating the JSX, it needs to be provided a scope object. At the very least, React needs to be provided to the scope, if any custom tags aren't being used. See below:

```
<Playground codeText={componentExample} scope={{React: React}}/>
```

Any module/component that is used inside the playground needs to be added to the scope object. See `/demo` for an example of how this works.

###theme
_React.PropTypes.string_

String specifying which CodeMirror theme to initialize with. Defaults to 'monokai'.

###noRender
_React.PropTypes.bool_

If set to true, removes the need to create a class or call React.render within the example code.
When true, examples should be structured as the interior of a render method, see below:

```
<Button buttonStyle={this._getButtonStyle()}>
  <p>My Button</p>
</Button>
```

####collapsableCode
_React.PropTypes.bool_

Allows the user to collapse the code block.

```
<Playground collapsableCode={true} codeText={componentExample} scope={{React: React}}/>
```

####docClass
_React.PropTypes.renderable_

A component class that will be used to auto-generate docs based on that component's `propTypes`. See `propDescriptionMap` below for how to annotate the generate prop docs.

```
<Playground docClass={MyComponent} codeText={componentExample} scope={{React: React}}/>
```

####propDescriptionMap
_React.PropTypes.string_

Annotation map for the docClass. The key is the prop to annotate, the value is the description of that prop.

```
<Playground
  docClass={MyComponent}
  propDescriptionMap={{
    collapsableCode: "Allows the user to collapse the code block"
  }}
  codeText={componentExample}
  scope={{React: React}}/>
```
