const getNumberOfSongs = () => songs.length;

const setLabelProbabilities = () => {
  Object.keys(labelCounts).forEach((label) => {
    const numberOfSongs = getNumberOfSongs();
    labelProbabilities[label] = labelCounts[label] / numberOfSongs;
  });
}
