module.exports = (config) => {
  const csvRule = {
    test: /\.csv$/,
    loader: 'csv-loader',
    options: {
      delimiter: ',',
      dynamicTyping: true,
      skipEmptyLines: true
    }
  };
  config.module.rules[config.module.rules.length-1].oneOf.splice(0, 0, csvRule);
  if (process.env.REACT_APP_GHPAGES) {
    config.output.publicPath = ''
  }
  return config;
};
