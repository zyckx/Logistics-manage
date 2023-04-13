module.exports = {
  "*.{js,jsx,ts,tsx,vue}": ["eslint --fix"],
  "*.{js,jsx,ts,tsx,vue,css,less,scss,html}": ["prettier --write", "git add ."],
};
