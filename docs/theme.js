// .prop__name, .prop__default-value, .prop__examples-value
// .prop__type
// .prop__required
// .prop__examples
// .prop__default
// .prop__default-title, .prop__examples-title
export default {
  '*, *:before, *:after': {
    'box-sizing': 'inherit'
  },
  body: {
    backgroundColor: '#f6f2ee',
    fontFamily: '"Karla", "Helvetica Neue", Helvetica, sans-serif',
    lineHeight: '1.5em',
    marginLeft: 30,
    marginRight: 30,
    color: '#1b2633',
    boxSizing: 'border-box'
  },
  'html, body': {
    'overflow-x': 'hidden'
  },
  table: {
    border: 0,
    margin: 0,
    padding: 0,
    fontSize: '100%'
  },
  'thead, tbody': {
    border: 0,
    margin: 0,
    padding: 0,
    fontSize: '100%'
  },
  thead: {
    font: 'inherit',
    verticalAlign: 'baseline'
  },
  'tbody': {
    verticalAlign: 'middle'
  },
  /* dark: #ebe3db darker: e6dcd1 */
  'th, td': {
    border: '1px solid #ebe3db',
    padding: '0.425em 0.75em',
    verticalAlign: 'top'
  },
  'th code, td code': {
    background: 'none'
  },
  th: {
    fontWeight: 'bold',
    textAlign: 'left'
  },
  'h1,h2,h3': {
    fontFamily: '"Didot", "Cochin", serif',
    fontWeight: 'normal'
  },
  h2: {
    fontSize: 48
  },
  h3: {
    fontSize: 24
  },
  h4: {
    fontSize: 21
  },

  ".playgroundCode": {
    "background": "#2b303b",
    fontFamily: "Source Code Pro, monospace",
    // "font-size": "16px",
    // "line-height": "1.2",
    // "padding-bottom": "16px 16px 0 16px",
    // "margin-bottom": "30px"
  },

  ".playgroundPreview": {
    background: "#f6f2ee",
    marginBottom: 30,
    marginTop: 30,
    position: "relative"
  },

  ".playgroundPreview:before": {
    "content": "Live Preview",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: "1",
    position: "absolute",
    top: -18,
    textTransform: "uppercase"
  },

  "pre, .CodeMirror-code": {
    fontFamily: "Source Code Pro, monospace",
    // "font-size": "16px",
    // "line-height": "1.2"
  },

  /* Syntax Highlighting */

  /*
  Name:       Base16 Ocean Dark
  Author:     Chris Kempson (http://chriskempson.com)
  Pygments template by Jan T. Sott (https://github.com/idleberg)
  Created with Base16 Builder by Chris Kempson (https://github.com/chriskempson/base16-builder)
  */
  ".highlight .hll": { "background-color": "#4f5b66" },
  ".highlight": { "background": "#2b303b", "color": "#eff1f5" },
  ".highlight .c": { "color": "#65737e" }, /* Comment */
  ".highlight .err": { "color": "#bf616a" }, /* Error */
  ".highlight .k": { "color": "#b48ead" }, /* Keyword */
  ".highlight .l": { "color": "#d08770" }, /* Literal */
  ".highlight .n": { "color": "#eff1f5" }, /* Name */
  ".highlight .o": { "color": "#96b5b4" }, /* Operator */
  ".highlight .p": { "color": "#eff1f5" }, /* Punctuation */
  ".highlight .cm": { "color": "#65737e" }, /* Comment.Multiline */
  ".highlight .cp": { "color": "#65737e" }, /* Comment.Preproc */
  ".highlight .c1": { "color": "#65737e" }, /* Comment.Single */
  ".highlight .cs": { "color": "#65737e" }, /* Comment.Special */
  ".highlight .gd": { "color": "#bf616a" }, /* Generic.Deleted */
  ".highlight .ge": { "font-style": "italic" }, /* Generic.Emph */
  ".highlight .gh": { "color": "#eff1f5", "font-weight": "bold" }, /* Generic.Heading */
  ".highlight .gi": { "color": "#a3be8c" }, /* Generic.Inserted */
  ".highlight .gp": { "color": "#65737e", "font-weight": "bold" }, /* Generic.Prompt */
  ".highlight .gs": { "font-weight": "bold" }, /* Generic.Strong */
  ".highlight .gu": { "color": "#96b5b4", "font-weight": "bold" }, /* Generic.Subheading */
  ".highlight .kc": { "color": "#b48ead" }, /* Keyword.Constant */
  ".highlight .kd": { "color": "#b48ead" }, /* Keyword.Declaration */
  ".highlight .kn": { "color": "#96b5b4" }, /* Keyword.Namespace */
  ".highlight .kp": { "color": "#b48ead" }, /* Keyword.Pseudo */
  ".highlight .kr": { "color": "#b48ead" }, /* Keyword.Reserved */
  ".highlight .kt": { "color": "#ebcb8b" }, /* Keyword.Type */
  ".highlight .ld": { "color": "#a3be8c" }, /* Literal.Date */
  ".highlight .m": { "color": "#d08770" }, /* Literal.Number */
  ".highlight .s": { "color": "#a3be8c" }, /* Literal.String */
  ".highlight .na": { "color": "#8fa1b3" }, /* Name.Attribute */
  ".highlight .nb": { "color": "#eff1f5" }, /* Name.Builtin */
  ".highlight .nc": { "color": "#ebcb8b" }, /* Name.Class */
  ".highlight .no": { "color": "#bf616a" }, /* Name.Constant */
  ".highlight .nd": { "color": "#96b5b4" }, /* Name.Decorator */
  ".highlight .ni": { "color": "#eff1f5" }, /* Name.Entity */
  ".highlight .ne": { "color": "#bf616a" }, /* Name.Exception */
  ".highlight .nf": { "color": "#8fa1b3" }, /* Name.Function */
  ".highlight .nl": { "color": "#eff1f5" }, /* Name.Label */
  ".highlight .nn": { "color": "#ebcb8b" }, /* Name.Namespace */
  ".highlight .nx": { "color": "#fff" }, /* Name.Other */
  ".highlight .py": { "color": "#eff1f5" }, /* Name.Property */
  ".highlight .nt": { "color": "#96b5b4" }, /* Name.Tag */
  ".highlight .nv": { "color": "#bf616a" }, /* Name.Variable */
  ".highlight .ow": { "color": "#96b5b4" }, /* Operator.Word */
  ".highlight .w": { "color": "#eff1f5" }, /* Text.Whitespace */
  ".highlight .mf": { "color": "#d08770" }, /* Literal.Number.Float */
  ".highlight .mh": { "color": "#d08770" }, /* Literal.Number.Hex */
  ".highlight .mi": { "color": "#d08770" }, /* Literal.Number.Integer */
  ".highlight .mo": { "color": "#d08770" }, /* Literal.Number.Oct */
  ".highlight .sb": { "color": "#a3be8c" }, /* Literal.String.Backtick */
  ".highlight .sc": { "color": "#eff1f5" }, /* Literal.String.Char */
  ".highlight .sd": { "color": "#65737e" }, /* Literal.String.Doc */
  ".highlight .s2": { "color": "#a3be8c" }, /* Literal.String.Double */
  ".highlight .se": { "color": "#d08770" }, /* Literal.String.Escape */
  ".highlight .sh": { "color": "#a3be8c" }, /* Literal.String.Heredoc */
  ".highlight .si": { "color": "#d08770" }, /* Literal.String.Interpol */
  ".highlight .sx": { "color": "#a3be8c" }, /* Literal.String.Other */
  ".highlight .sr": { "color": "#a3be8c" }, /* Literal.String.Regex */
  ".highlight .s1": { "color": "#a3be8c" }, /* Literal.String.Single */
  ".highlight .ss": { "color": "#a3be8c" }, /* Literal.String.Symbol */
  ".highlight .bp": { "color": "#eff1f5" }, /* Name.Builtin.Pseudo */
  ".highlight .vc": { "color": "#bf616a" }, /* Name.Variable.Class */
  ".highlight .vg": { "color": "#bf616a" }, /* Name.Variable.Global */
  ".highlight .vi": { "color": "#bf616a" }, /* Name.Variable.Instance */
  ".highlight .il": { "color": "#d08770" }, /* Literal.Number.Integer.Long */

  /*
      Name:       Base16 Ocean Dark
      Author:     Chris Kempson (http://chriskempson.com)
      CodeMirror template by Jan T. Sott (https://github.com/idleberg/base16-codemirror)
      Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16)
  */

  ".cm-s-base16-ocean-dark.CodeMirror": { background: "#2b303b", color: "#dfe1e8"},
  ".cm-s-base16-ocean-dark div.CodeMirror-selected": {background: "#343d46"},
  ".cm-s-base16-ocean-dark .CodeMirror-gutters": {background: "#2b303b", "border-right": "0px"},
  ".cm-s-base16-ocean-dark .CodeMirror-linenumber": {color: "#65737e"},
  ".cm-s-base16-ocean-dark .CodeMirror-cursor": {"border-left": "1px solid #a7adba"},

  ".cm-s-base16-ocean-dark span.cm-comment": {color: "#ab7967"},
  ".cm-s-base16-ocean-dark span.cm-atom": {color: "#b48ead"},
  ".cm-s-base16-ocean-dark span.cm-number": {color: "#b48ead"},

  ".cm-s-base16-ocean-dark span.cm-property, .cm-s-base16-ocean-dark span.cm-attribute": {color: "#a3be8c"},
  ".cm-s-base16-ocean-dark span.cm-keyword": {color: "#bf616a"},
  ".cm-s-base16-ocean-dark span.cm-string": {color: "#ebcb8b"},

  ".cm-s-base16-ocean-dark span.cm-variable": {color: "#a3be8c"},
  ".cm-s-base16-ocean-dark span.cm-variable-2": {color: "#8fa1b3"},
  ".cm-s-base16-ocean-dark span.cm-def": {color: "#d08770"},
  ".cm-s-base16-ocean-dark span.cm-error": {background: "#bf616a", color: "#a7adba"},
  ".cm-s-base16-ocean-dark span.cm-bracket": {color: "#dfe1e8"},
  ".cm-s-base16-ocean-dark span.cm-tag": {color: "#bf616a"},
  ".cm-s-base16-ocean-dark span.cm-link": {color: "#b48ead"},

  ".cm-s-base16-ocean-dark .CodeMirror-matchingbracket": {"text-decoration": "underline", color: "white"}
}