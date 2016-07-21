import React from "react";

export default class DatasetDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDataset: 0 };
  }

  getChildContext() {
    const { dataset } = this.props;
    const { selectedDataset } = this.state;
    return {
      dataset: dataset[this.state ? selectedDataset : 0].data
    };
  }

  onDatasetSelect(selectedIndex) {
    this.setState({ selectedDataset: selectedIndex });
  }

  render() {
    const { dataset } = this.props;
    return (
      <div>
        <div className="playgroundDatasetSelectWrapper">
          <span className="playgroundDatasetSelectLabel">Dataset:</span>
          <select
            className="playgroundDatasetSelect"
            onChange={(e) => {this.onDatasetSelect(e.target.selectedIndex);}}>
            {dataset.map((option) => (
              <option key={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
        {this.props.children}
      </div>
    );
  }
}

DatasetDropdown.childContextTypes = {
  dataset: React.PropTypes.array
};

DatasetDropdown.propTypes = {
  dataset: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.any,
    label: React.PropTypes.string,
    data: React.PropTypes.array
  })).isRequired,
  children: React.PropTypes.node.isRequired
};
