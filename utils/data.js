const lorum = [
  'lorem',
  'imsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'curabitur',
  'vel',
  'hendrerit',
  'libero',
  'eleifend',
  'blandit',
  'nunc',
  'ornare',
  'odio',
  'ut',
  'orci',
  'gravida',
  'imperdiet',
  'nullam',
  'purus',
  'lacinia',
  'a',
  'pretium',
  'quis',
];

const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomWord = () => `${lorum[genRandomIndex(lorum)]}`;

const getRandomThought = (words) => {
  let thought = '';
  for (let i = 0; i < words; i++) {
    thought += ` ${getRandomWord()}`;
  }
  return thought;
};
const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

module.exports = {
  getRandomWord,
  getRandomColor,
  getRandomThought,
  genRandomIndex,
};
