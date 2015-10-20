// .prop__name, .prop__default-value, .prop__examples-value
// .prop__type
// .prop__required
// .prop__examples
// .prop__default
// .prop__default-title, .prop__examples-title
export default {
	'*, *:before, *:after': {
		webkitboxsizing: 'inherit',
		mozboxsizing: 'inherit',
		boxSizing: 'inherit'
	},
	html: {
		msTextSizeAdjust: '100%',
		webkittextsizeadjust: '100%'
	},
	body: {
		backgroundColor: '#f6f2ee',
		fontFamily: '"Karla", "Helvetica Neue", Helvetica, Arial, sans-serif',
		lineHeight: 1.5,
		margin: 0,
		color: '#1b2633',
		webkitboxsizing: 'border-box',
		mozboxsizing: 'border-box',
		boxSizing: 'border-box',
		mozosxfontsmoothing: 'grayscale',
		webkitfontsmoothing: 'antialiased'
	},
	'html, body': {
		overflowX: 'hidden'
	},
	'article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary': {
		display: 'block'
	},
	table: {
		borderCollapse: 'collapse',
		display: 'block',
		overflow: 'auto',
		width: '100%'
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
	tbody: {
		verticalAlign: 'middle'
	},
	'th, td': {
		border: '1px solid #ebe3db',
		padding: '0.425em 0.75em',
		verticalAlign: 'top'
	},
	'th code, td code': {
		background: 'none',
		color: '#111'
	},
	th: {
		fontWeight: 'bold',
		textAlign: 'left'
	},
	'h1,h2,h3,h4,h5,h6,hgroup, ul,ol,dd, p,figure, pre,table,fieldset,hr, .highlight': {
		marginTop: 0,
		marginBottom: '1.5rem'
	},
	img: {
		maxWidth: '100%'
	},
	'svg, img': {
		fill: 'currentColor'
	},
  h1: {
    fontSize: '3rem'
  },
	h2: {
		fontSize: '2.75rem'
	},
	h3: {
		fontSize: '1.5rem'
	},
	h4: {
		fontSize: '1.3125rem'
	},
  'h1,h2,h3,h4': {
		fontFamily: '"Didot", "Cochin", serif',
    fontWeight: 'normal'
  },
  /*
   * Headlines/Headings
   */
	'.Headline': {
		fontFamily: '"Didot", "Cochin", serif',
		fontSize: '3rem',
		fontWeight: 'normal'
	},
	'.Headline--major': {
		lineHeight: 1.3,
		fontStyle: 'italic'
	},
	mediaQueries: {
		'only screen and (min-width: 44em)': {
			'.Headline--major': {
				fontSize: '3.5rem',
				lineHeight: 1.2,
				fontStyle: 'italic'
			},
			'.Header': {
				paddingTop: 135,
				paddingBottom: 45
			},
			'.Logo img': {
				width: 230
			},
			'.Installer': {
				padding: '24px 48px',
				marginTop: 24,
				marginBottom: 24
			},
			'.Copy': {
				fontSize: '1.125rem'
			},
			'.Copy .highlight': {
				margin: '36px -24px'
			},
			'.Copy .highlight pre': {
				padding: 24
			},
			'.u-size1of2-l': {
				width: '50%'
			},
			'.u-size1of3-l': {
				width: '33.3333%'
			},
			'.u-size2of3-l': {
				width: '66.6666%'
			},
			'.u-margin-l': {
				marginBottom: 24
			},
			'.u-noMargin-l': {
				marginBottom: 0
			}
		}
	},
	'.Smallcaps': {
		textTransform: 'uppercase',
		fontSize: '0.85em',
		fontWeight: 'bold',
		color: '#91887e'
	},
  /*
   * Layout/Grid
   */
	'.Container': {
		margin: '0 auto',
		maxWidth: 960,
		paddingLeft: '1em',
		paddingRight: '1em'
	},
	'.Row': {
		padding: '2rem 0'
	},
	'.Grid': {
		display: 'block',
		margin: 0,
		padding: 0,
		textAlign: 'left',
		fontSize: 0
	},
	'.Grid--padded': {
		marginRight: -18,
		marginLeft: -18
	},
	'.Grid--padded > .Grid-unit': {
		paddingRight: 18,
		paddingLeft: 18
	},
	'.Grid-unit': {
		fontSize: '1rem',
		display: 'inline-block',
		margin: 0,
		padding: 0,
		textAlign: 'left',
		verticalAlign: 'top',
		width: '100%'
	},
  /*
   * Header & Footer
   */
	'.Header': {
		position: 'relative',
		paddingTop: 40,
		paddingBottom: 24
	},
	'.Logo': {
		fontSize: '1.5rem',
		lineHeight: 1,
		margin: '0 auto',
		textAlign: 'center'
	},
	'.Logo img': {
		width: 150
	},
	'.Footer': {
		background: '#2b303b',
		color: '#fff'
	},
	'.Footer a': {
		fontWeight: 700,
		color: '#FF4136'
	},
	'.Footer a:hover, .Footer a:focus': {
		color: '#fff'
	},
	'.FooterLogo': {
		display: 'block',
		margin: '16px 0'
	},
	'.FooterLogo img': {
		display: 'block',
		margin: '0 auto'
	},
	'.Installer': {
		display: 'inline-block',
		background: '#2b303b',
		border: '1px solid #16191F',
		color: '#fff',
		fontFamily: '"Source Code Pro", monospace',
		fontSize: 18,
		lineHeight: 1.2,
		margin: '0 auto',
		padding: '16px 32px'
	},
  /*
   * Copy
   */
	'.Copy .highlight': {
		marginLeft: -16,
		marginRight: -16
	},
	'.Copy .highlight pre': {
		marginBottom: 0,
		background: '#2b303b',
		color: '#fff',
		fontFamily: '"Source Code Pro", monospace',
		fontSize: 16,
		lineHeight: 1.2,
		overflow: 'auto',
		padding: 16
	},
	'.Copy ul': {
		paddingLeft: 24,
		listStyle: 'none'
	},
	'.Copy ul > li': {
		position: 'relative'
	},
	'.Copy ul > li + li': {
		marginTop: 10
	},
	'.Copy ul > li:before': {
		content: '""',
		width: '1em',
		height: '1em',
		display: 'block',
		position: 'absolute',
		fontSize: 8,
		borderRadius: '50%',
		border: '1px solid #B22D26',
		left: -24,
		top: 11
	},
	'.Copy li > ul': {
		marginTop: 10,
		marginBottom: 0
	},
	'.Copy a': {
		color: '#2b303b',
		fontWeight: 700
	},
	'.Copy a:hover, .Copy a:focus': {
		color: '#c33b33'
	},
	'.Copy code': {
		fontFamily: '"Source Code Pro", monospace',
		background: '#ede7e1',
    color: '#34302e',
		borderRadius: 3,
		padding: '0 5px'
	},
	'.CopySmall': {
		fontSize: 16
	},
	'.highlight code': {
		background: 'transparent',
		padding: 0
	},
	'.Formidabanner': {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		padding: 10,
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: 'rgb(29, 34, 39)',
		color: 'rgb(255, 255, 255)',
		fontWeight: 700,
		textDecoration: 'none',
		textAlign: 'center',
		background: 'rgb(43, 48, 59)'
	},
  /*
   * Interactive/Component Playground
   */
	'.Row .Interactive': {
		marginTop: '-1.5rem'
	},
  '.Interactive:before, .Interactive .playgroundPreview:before': {
    fontFamily: '"Karla", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: 1,
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  },
	'.Interactive:before': {
		content: '"Interactive Code"'
	},
	'.Interactive .playgroundCode': {
		background: '#2b303b',
		fontFamily: '"Source Code Pro", monospace',
		fontSize: 16,
		lineHeight: 1.2,
		paddingBottom: '16px 16px 0 16px',
		marginBottom: 30
	},
	'.Interactive .playgroundPreview': {
		background: '#fff',
		marginBottom: 24,
		position: 'relative'
	},
	'.Interactive .playgroundPreview:before': {
		content: '"Live Preview"',
		position: 'absolute',
		top: -18
	},
	'.Interactive pre, .CodeMirror-code': {
		fontFamily: '"Source Code Pro", monospace',
		fontSize: 16,
		lineHeight: 1.2
	},
  '.CodeMirror': {
    height: 'auto'
  },
  /*
  * Documentation/Props
  */
	'.Documentation h1, .Documentation h2, .Documentation h3': {
		fontFamily: '"Didot", "Cochin", serif',
		fontWeight: 'normal'
	},
  '.Prop-name': {
    fontFamily: '"Source Code Pro", monospace'
  },
  '.Prop-type': {
    color: '#91887e',
    display: 'block',
    fontStyle: 'italic',
    lineHeight: '1em'
  },
  '.Prop-description': {
    display: 'block',
    lineHeight: '1.3em',
    marginBottom: '0.5em'
  },
  '.Prop-examples, .Prop-default': {
    display: 'block',
    lineHeight: '1.3em'
  },
  '.Prop-examples-title, .Prop-default-title': {
    textTransform: 'uppercase',
    fontSize: '0.85em',
    fontWeight: 'bold',
    color: '#91887e',
    letterSpacing: '0.04em'
  },
  '.Prop-examples-value': {
    fontFamily: '"Source Code Pro", monospace'
  },
  '.Prop-default-value': {
    fontFamily: '"Source Code Pro", monospace',
    color: '#4d4945'
  },
  /*
   * Size utilities
   */
	'.u-size1of2': {
		width: '50%'
	},
	'.u-size1of3': {
		width: '33.3333%'
	},
	'.u-size2of3': {
		width: '66.6666%'
	},
	'.u-noMargin': {
		marginBottom: 0
	},
	'.u-textCenter': {
		textAlign: 'center'
	},
	'.u-textLeft': {
		textAlign: 'left'
	},
	'.u-textIndent': {
		marginLeft: 12
	},
	'.u-marginModule > *:last-child': {
		marginBottom: 0
	},
  /*
   * Arrange Utility
   */
	'.Arrange': {
		webkitboxsizing: 'border-box',
		mozboxsizing: 'border-box',
		boxSizing: 'border-box',
		display: 'table',
		margin: 0,
		minWidth: '100%',
		padding: 0,
		tableLayout: 'auto'
	},
	'.Arrange-fill, .Arrange-fit': {
		display: 'table-cell',
		padding: 0,
		verticalAlign: 'top'
	},
	'.Arrange-fill': {
		width: '100%'
	},
	'.Arrange-fill img': {
		height: 'auto',
		maxWidth: '100%'
	},
	'.Arrange-fit img': {
		maxWidth: 'none',
		width: 'auto'
	},
	'.Arrange--middle > .Arrange-fill, .Arrange--middle > .Arrange-fit': {
		verticalAlign: 'middle'
	},
	'.Arrange--bottom > .Arrange-fill, .Arrange--bottom > .Arrange-fit': {
		verticalAlign: 'bottom'
	},
	'.Arrange--equal': {
		tableLayout: 'fixed',
		width: '100%'
	},
	'.Arrange--equal > .Arrange-fill, .Arrange--equal > .Arrange-fit': {
		width: '1%'
	},
	'.Arrange--withGutter': {
		margin: '0 calc(-0.5 * 24px)'
	},
	'.Arrange--withGutter > .Arrange-fit, .Arrange--withGutter > .Arrange-fill': {
		padding: '0 calc(0.5 * 24px)'
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

    (The default theme for component playground is .cm-s-monokai, so you
     can hackily rename any theme class name to apply its colors.) */
  ".cm-s-monokai.CodeMirror": { background: "#2b303b", color: "#dfe1e8"},
  ".cm-s-monokai div.CodeMirror-selected": {background: "#343d46"},
  ".cm-s-monokai .CodeMirror-gutters": {background: "#2b303b", "border-right": "0px"},
  ".cm-s-monokai .CodeMirror-linenumber": {color: "#65737e"},
  ".cm-s-monokai .CodeMirror-cursor": {"border-left": "1px solid #a7adba"},

  ".cm-s-monokai span.cm-comment": {color: "#ab7967"},
  ".cm-s-monokai span.cm-atom": {color: "#b48ead"},
  ".cm-s-monokai span.cm-number": {color: "#b48ead"},

  ".cm-s-monokai span.cm-property, .cm-s-monokai span.cm-attribute": {color: "#a3be8c"},
  ".cm-s-monokai span.cm-keyword": {color: "#bf616a"},
  ".cm-s-monokai span.cm-string": {color: "#ebcb8b"},

  ".cm-s-monokai span.cm-variable": {color: "#a3be8c"},
  ".cm-s-monokai span.cm-variable-2": {color: "#8fa1b3"},
  ".cm-s-monokai span.cm-def": {color: "#d08770"},
  ".cm-s-monokai span.cm-error": {background: "#bf616a", color: "#a7adba"},
  ".cm-s-monokai span.cm-bracket": {color: "#dfe1e8"},
  ".cm-s-monokai span.cm-tag": {color: "#bf616a"},
  ".cm-s-monokai span.cm-link": {color: "#b48ead"},

  ".cm-s-monokai .CodeMirror-matchingbracket": {"text-decoration": "underline", color: "white"}
}
