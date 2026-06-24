const fs = require('fs');
const path = require('path');

const dir = './packages/theme/src/themes';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

let imports = '';
let exportArray = 'export const wallpapers = [\n';

files.forEach((file, index) => {
  const varName = `img${index}`;
  imports += `import ${varName} from './${file}';\n`;
  
  const isDark = file.includes('dark');
  const type = isDark ? 'dark' : 'light';
  
  // Create readable name from filename
  // pihu-dark-city-rain-romance.jpg -> City Rain Romance
  let name = file.replace('pihu-dark-', '').replace('pihu-light-', '').replace('.jpg', '').replace('.png', '');
  name = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  exportArray += `  { id: '${file}', name: '${name}', mode: '${type}', source: ${varName} },\n`;
});

exportArray += '];\n';

fs.writeFileSync(path.join(dir, 'wallpapers.ts'), imports + '\n' + exportArray);
console.log('wallpapers.ts generated');
