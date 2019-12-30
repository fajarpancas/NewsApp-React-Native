module.exports = function(api) {
  api.cache(true);
  if (process.env.NODE_ENV === 'production' || process.env.BABEL_ENV === 'production') {
    return {
      "presets": ["module:metro-react-native-babel-preset"],
      "plugins": ["ignite-ignore-reactotron", "transform-remove-console"]
    }
  } else {
    return {
      "presets": ["module:metro-react-native-babel-preset"],
    }
  }
}
