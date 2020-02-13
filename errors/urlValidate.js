const imgRegex = new RegExp(
  '(http(s?):|ftp:)'
+ '([/|.|\\w|\\s|-])*'
+ '(\\.)'
+ '(?:jpg|gif|png)',
);

const urlRegex = new RegExp(
  '(?:http(s)?:\\/\\/)'
+ '?[\\w.-]+'
+ '(?:\\.[\\w\\.-]+)+'
+ "[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+",
);

module.exports = [
  urlRegex,
  imgRegex,
];
