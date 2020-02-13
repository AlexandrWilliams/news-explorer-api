const imgRegex = new RegExp(
  '(?:(http(s)|sftp)?:\\/\\/)'
+ '?[\\w.-]+'
+ '(?:\\.[\\w\\.-]+)+'
+ "[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+",
);

const urlRegex = new RegExp(
  '(?:http(s)?:\\/\\/)'
+ '?[\\w.-]+'
+ '(?:\\.[\\w\\.-]+)+'
+ "[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+",
);

module.exports = {
  urlRegex,
  imgRegex,
};
