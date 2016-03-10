export default {
  getY0(datasets, datum, index) {
    const y = datum.y;
    const previousDataSets = datasets.slice(0, index);
    const previousPoints = previousDataSets.reduce((prev, dataset) => {
      return prev.concat(dataset.data
        .filter((previousDatum) => datum.x instanceof Date
          ? previousDatum.x.getTime() === datum.x.getTime()
          : previousDatum.x === datum.x)
        .map((previousDatum) => previousDatum.y || 0)
      );
    }, []);
    return previousPoints.reduce((memo, value) => {
      const sameSign = (y < 0 && value < 0) || (y >= 0 && value >= 0);
      return sameSign ? memo + value : memo;
    }, 0);
  }
};
