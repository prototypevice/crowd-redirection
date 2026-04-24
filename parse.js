const fs = require('fs');
const babel = require('@babel/core');

try {
  const code = fs.readFileSync('src/App.jsx', 'utf8');
  babel.transformSync(code, {
    presets: ['@babel/preset-react'],
    filename: 'src/App.jsx'
  });
  console.log('Parsed successfully!');
} catch (e) {
  console.error(e.message);
}
