module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      __dirname + '/.mock/file.js',
    '\\.(css|scss)$': __dirname + '/.mock/style.js',
  },
};
