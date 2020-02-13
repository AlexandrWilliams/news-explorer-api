const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    required: true,
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

articleSchema.path('link').validate((val) => {
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g;
  return urlRegex.test(val);
}, 'Invalid URL.');
articleSchema.path('image').validate((val) => {
  const urlRegex = /^(http(s?):|ftp:)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/g;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('Article', articleSchema);
