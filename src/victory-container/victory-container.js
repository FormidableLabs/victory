import React, { PropTypes } from "react";

export default class VictoryContainer extends React.Component {
	static propTypes = {
		style: PropTypes.object,
		height: PropTypes.number,
		width: PropTypes.number,
		children: React.PropTypes.oneOfType([
     React.PropTypes.arrayOf(React.PropTypes.node),
     React.PropTypes.node
   	]),
   	title: PropTypes.string,
   	desc: PropTypes.string
	}

	static defaultProps = {
		title: "Victory Chart",
		desc: ""
	}

	render() {
		return (
			<svg
        style={this.props.style}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        role="img"
        aria-labelledby="title desc"
      >
      	<title id="title">{this.props.title}</title>
        <desc id="desc">{this.props.desc}</desc>
      	{this.props.children}
      </svg>
			)
	}
}