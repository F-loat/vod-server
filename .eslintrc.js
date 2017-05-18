module.exports = {
  root: true,
  parser: 'babel-eslint',
  'env': {
    'node': true,
    'mocha': true,
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // custom rules
  'rules': {
    'no-debugger': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
  }
}
