import React from "react";

export default class DatasetDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDataset: 0 };
  }

  getChildContext() {
    const { dataset } = this.props;
    return {
      datum: dataset[this.state ? this.state.selectedDataset : 0].data
    };
  }

  onDataSetChanged(selectedIndex) {
    this.setState({ selectedDataSet: selectedIndex });
  }

  render() {
    const { dataset } = this.props;
    return (
      <div>
        <select onChange={(e) => {this.onDatasetSelect(e.target.selectedIndex);}}>
          {dataset.map((option) => (
            <option key={option.id}>{option.label}</option>
          ))}
        </select>
        {this.props.children}
      </div>
    );
  }
}

DatasetDropdown.childContextTypes = {
  datum: React.PropTypes.array
};

DatasetDropdown.propTypes = {
  dataset: React.Proptypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.any,
    label: React.PropTypes.string,
    data: React.PropTypes.array
  })).isRequired,
  children: React.PropTypes.node.isRequired
};
