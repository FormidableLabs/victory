// Settings
import settings from "../settings";

// Stylesheet
export default {
  /*
   * Normalize & Element Selectors
   */
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
    fontFamily: settings.sansSerif,
    lineHeight: 1.5,
    margin: 0,
    color: settings.deepNavy,
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
    border: '1px solid ' + settings.palestSand,
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
    fontFamily: settings.serif,
    fontWeight: 'normal'
  },
  'a': {
    color: settings.navy,
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: 'inset 0 -0.05em 0 ' + settings.sand,
    transition: 'color 0.2s ease, box-shadow 0.5s ease'
  },
  'a:hover, a:focus': {
    color: settings.red,
    boxShadow: 'inset 0 -0.05em 0 ' + settings.paleRed,
    transition: 'color 0.2s ease, box-shadow 0.5s ease'
  },
  /*
   * Headlines/Headings
   */
  '.Headline': {
    fontFamily: settings.serif,
    fontSize: '3rem',
    fontWeight: 'normal'
  },
  '.Headline--major': {
    lineHeight: 1.3,
    fontStyle: 'italic'
  },
  '.Smallcaps': {
    textTransform: 'uppercase',
    fontSize: '0.85em',
    fontWeight: 'bold',
    color: settings.darkSand
  },
  /*
   * Layout/Grid
   */
  '.Container': {
    margin: '0 auto',
    maxWidth: '960px',
    paddingLeft: '1em',
    paddingRight: '1em'
  },
  '.Row': {
    padding: '36px 0'
  },
  '.Row .Interactive': {
    marginTop: '-24px'
  },
  /*
   * Copy
   */
  '.Copy': {
    margin: '0 auto',
    maxWidth: '640px'
  },
  '.Copy .highlight': {
    marginLeft: '-16px',
    marginRight: '-16px'
  },
  '.Copy .highlight pre': {
    marginBottom: 0,
    background: settings.navy,
    color: '#fff',
    fontFamily: '"Source Code Pro", monospace',
    fontSize: '16px',
    lineHeight: 1.2,
    overflow: 'auto',
    padding: '16px'
  },
  '.Copy ul': {
    paddingLeft: '24px',
    listStyle: 'none'
  },
  '.Copy ul > li': {
    position: 'relative'
  },
  '.Copy ul > li + li': {
    marginTop: '0.25em'
  },
  '.Copy ul > li:before': {
    content: '""',
    width: '1em',
    height: '1em',
    display: 'block',
    position: 'absolute',
    fontSize: '8px',
    borderRadius: '50%',
    border: '1px solid ' + settings.red,
    left: '-24px',
    top: '11px'
  },
  '.Copy li > ul': {
    marginTop: '0.25em',
    marginBottom: '0px'
  },
  '.Copy code': {
    fontFamily: settings.codeFont,
    background: settings.whiteSand,
    color: settings.mud,
    borderRadius: 3,
    padding: '0 5px'
  },
  '.highlight code': {
    background: 'transparent',
    padding: 0
  },
  '.Installer': {
    display: 'inline-block',
    background: settings.navy,
    border: '1px solid #16191F',
    color: '#fff',
    fontFamily: '"Source Code Pro", monospace',
    fontSize: '18px',
    lineHeight: 1.2,
    margin: '0 auto',
    padding: '16px 32px'
  },
  /*
   * Interactive/Component Playground
   */
  '.Interactive .playground': {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '24px'
  },
  '.Interactive:before, .Interactive .playgroundPreview:before': {
    fontFamily: settings.sansSerif,
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
    flex: '0 0 100%',
    verticalAlign: 'top',
    background: '#fff',
    fontFamily: settings.codeFont,
    fontSize: '1rem',
    lineHeight: 1.2,
    marginBottom: '30px',
    padding: '16px 16px 0 16px',
    border: '1px solid #ebe3db'
  },
  '.Interactive .playgroundPreview': {
    flex: '0 0 100%',
    verticalAlign: 'top',
    background: '#fff',
    position: 'relative',
    border: '1px solid #ebe3db'
  },
  '.Interactive .playgroundPreview:before': {
    content: '"Live Preview"',
    position: 'absolute',
    top: '-18px'
  },
  '.Interactive pre, .CodeMirror-code': {
    fontFamily: settings.codeFont,
    fontSize: '1rem',
    lineHeight: 1.2
  },
  '.CodeMirror': {
    height: 'auto'
  },
  /*
  * Documentation/Props
  */
  '.Documentation h1, .Documentation h2, .Documentation h3': {
    fontFamily: settings.serif,
    fontWeight: 'normal'
  },
  '.Prop-name': {
    fontFamily: settings.codeFont
  },
  '.Prop-type': {
    color: settings.darkSand,
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
    color: settings.darkSand,
    letterSpacing: '0.04em'
  },
  '.Prop-examples-value': {
    fontFamily: '"Source Code Pro", monospace'
  },
  '.Prop-default-value': {
    fontFamily: '"Source Code Pro", monospace',
    color: '#4d4945'
  },
  /* Utilities */
  '.u-textCenter': {
    textAlign: 'center'
  },
  '.u-textLeft': {
    textAlign: 'left'
  },
  '.u-textRight': {
    textAlign: 'right'
  },
  '.u-marginModule > *:last-child': {
    marginBottom: 0
  },
  mediaQueries: {
    'only screen and (min-width: 44em)': {
      '.Headline--major': {
        fontSize: '3.5rem',
        lineHeight: 1.2,
        fontStyle: 'italic'
      },
      '.Header': {
        paddingTop: '65px',
        paddingBottom: '0'
      },
      '.Logo img': {
        width: '230px'
      },
      '.Copy': {
        fontSize: '1.125rem'
      },
      '.Copy .highlight': {
        margin: '36px -24px'
      },
      '.Copy .highlight pre': {
        padding: '24px'
      },
      '.Installer': {
        padding: '24px 48px',
        marginTop: '24px',
        marginBottom: '24px'
      },
      '.Interactive .playground': {
        display: 'flex',
        flexWrap: 'wrap'
      },
      '.Interactive .playgroundCode': {
        display: 'flex',
        flex: '1',
        marginRight: '12px',
        marginBottom: '0'
      },
      '.Interactive .playgroundPreview': {
        display: 'flex',
        flex: '1',
        marginLeft: '12px'
      }
    }
  },
  /* Syntax Highlighting */
  /*
  Name:       Base16 Ocean Dark
  Author:     Chris Kempson (http://chriskempson.com)
  Pygments template by Jan T. Sott (https://github.com/idleberg)
  Created with Base16 Builder by Chris Kempson (https://github.com/chriskempson/base16-builder)
  */
  '.highlight .hll': { 'background-color': '#4f5b66' },
  '.highlight': { 'background': settings.navy, 'color': '#eff1f5' },
  '.highlight .c': { 'color': '#65737e' }, /* Comment */
  '.highlight .err': { 'color': '#bf616a' }, /* Error */
  '.highlight .k': { 'color': '#b48ead' }, /* Keyword */
  '.highlight .l': { 'color': '#d08770' }, /* Literal */
  '.highlight .n': { 'color': '#eff1f5' }, /* Name */
  '.highlight .o': { 'color': '#96b5b4' }, /* Operator */
  '.highlight .p': { 'color': '#eff1f5' }, /* Punctuation */
  '.highlight .cm': { 'color': '#65737e' }, /* Comment.Multiline */
  '.highlight .cp': { 'color': '#65737e' }, /* Comment.Preproc */
  '.highlight .c1': { 'color': '#65737e' }, /* Comment.Single */
  '.highlight .cs': { 'color': '#65737e' }, /* Comment.Special */
  '.highlight .gd': { 'color': '#bf616a' }, /* Generic.Deleted */
  '.highlight .ge': { 'font-style': 'italic' }, /* Generic.Emph */
  '.highlight .gh': { 'color': '#eff1f5', 'font-weight': 'bold' }, /* Generic.Heading */
  '.highlight .gi': { 'color': '#a3be8c' }, /* Generic.Inserted */
  '.highlight .gp': { 'color': '#65737e', 'font-weight': 'bold' }, /* Generic.Prompt */
  '.highlight .gs': { 'font-weight': 'bold' }, /* Generic.Strong */
  '.highlight .gu': { 'color': '#96b5b4', 'font-weight': 'bold' }, /* Generic.Subheading */
  '.highlight .kc': { 'color': '#b48ead' }, /* Keyword.Constant */
  '.highlight .kd': { 'color': '#b48ead' }, /* Keyword.Declaration */
  '.highlight .kn': { 'color': '#96b5b4' }, /* Keyword.Namespace */
  '.highlight .kp': { 'color': '#b48ead' }, /* Keyword.Pseudo */
  '.highlight .kr': { 'color': '#b48ead' }, /* Keyword.Reserved */
  '.highlight .kt': { 'color': '#ebcb8b' }, /* Keyword.Type */
  '.highlight .ld': { 'color': '#a3be8c' }, /* Literal.Date */
  '.highlight .m': { 'color': '#d08770' }, /* Literal.Number */
  '.highlight .s': { 'color': '#a3be8c' }, /* Literal.String */
  '.highlight .na': { 'color': '#8fa1b3' }, /* Name.Attribute */
  '.highlight .nb': { 'color': '#eff1f5' }, /* Name.Builtin */
  '.highlight .nc': { 'color': '#ebcb8b' }, /* Name.Class */
  '.highlight .no': { 'color': '#bf616a' }, /* Name.Constant */
  '.highlight .nd': { 'color': '#96b5b4' }, /* Name.Decorator */
  '.highlight .ni': { 'color': '#eff1f5' }, /* Name.Entity */
  '.highlight .ne': { 'color': '#bf616a' }, /* Name.Exception */
  '.highlight .nf': { 'color': '#8fa1b3' }, /* Name.Function */
  '.highlight .nl': { 'color': '#eff1f5' }, /* Name.Label */
  '.highlight .nn': { 'color': '#ebcb8b' }, /* Name.Namespace */
  '.highlight .nx': { 'color': '#fff' }, /* Name.Other */
  '.highlight .py': { 'color': '#eff1f5' }, /* Name.Property */
  '.highlight .nt': { 'color': '#96b5b4' }, /* Name.Tag */
  '.highlight .nv': { 'color': '#bf616a' }, /* Name.Variable */
  '.highlight .ow': { 'color': '#96b5b4' }, /* Operator.Word */
  '.highlight .w': { 'color': '#eff1f5' }, /* Text.Whitespace */
  '.highlight .mf': { 'color': '#d08770' }, /* Literal.Number.Float */
  '.highlight .mh': { 'color': '#d08770' }, /* Literal.Number.Hex */
  '.highlight .mi': { 'color': '#d08770' }, /* Literal.Number.Integer */
  '.highlight .mo': { 'color': '#d08770' }, /* Literal.Number.Oct */
  '.highlight .sb': { 'color': '#a3be8c' }, /* Literal.String.Backtick */
  '.highlight .sc': { 'color': '#eff1f5' }, /* Literal.String.Char */
  '.highlight .sd': { 'color': '#65737e' }, /* Literal.String.Doc */
  '.highlight .s2': { 'color': '#a3be8c' }, /* Literal.String.Double */
  '.highlight .se': { 'color': '#d08770' }, /* Literal.String.Escape */
  '.highlight .sh': { 'color': '#a3be8c' }, /* Literal.String.Heredoc */
  '.highlight .si': { 'color': '#d08770' }, /* Literal.String.Interpol */
  '.highlight .sx': { 'color': '#a3be8c' }, /* Literal.String.Other */
  '.highlight .sr': { 'color': '#a3be8c' }, /* Literal.String.Regex */
  '.highlight .s1': { 'color': '#a3be8c' }, /* Literal.String.Single */
  '.highlight .ss': { 'color': '#a3be8c' }, /* Literal.String.Symbol */
  '.highlight .bp': { 'color': '#eff1f5' }, /* Name.Builtin.Pseudo */
  '.highlight .vc': { 'color': '#bf616a' }, /* Name.Variable.Class */
  '.highlight .vg': { 'color': '#bf616a' }, /* Name.Variable.Global */
  '.highlight .vi': { 'color': '#bf616a' }, /* Name.Variable.Instance */
  '.highlight .il': { 'color': '#d08770' }, /* Literal.Number.Integer.Long */

  /* Elegant CodeMirror theme */
  /* https://codemirror.net/theme/elegant.css */

  '.cm-s-elegant span.cm-number, .cm-s-elegant span.cm-string, .cm-s-elegant span.cm-atom': {
    color: '#762'
   },
  '.cm-s-elegant span.cm-comment': {
    color: '#262',
    fontStyle: 'italic',
    lineHeight: 1
   },
  '.cm-s-elegant span.cm-meta': {
    color: '#555',
    fontStyle: 'italic',
    lineHeight: 1,
   },
  '.cm-s-elegant span.cm-variable': {
    color: 'black'
   },
  '.cm-s-elegant span.cm-variable-2': {
    color: '#b11'
   },
  '.cm-s-elegant span.cm-qualifier': {
    color: '#555'
   },
  '.cm-s-elegant span.cm-keyword': {
    color: '#730'
   },
  '.cm-s-elegant span.cm-builtin': {
    color: '#30a'
   },
  '.cm-s-elegant span.cm-link': {
    color: '#762'
   },
  '.cm-s-elegant span.cm-error': {
    backgroundColor: '#fdd'
   },
  '.cm-s-elegant .CodeMirror-activeline-background': {
    background:' #e8f2ff'
   },
  '.cm-s-elegant .CodeMirror-matchingbracket': {
    outline: '1px solid grey',
    color: 'black !important'
   }
}
