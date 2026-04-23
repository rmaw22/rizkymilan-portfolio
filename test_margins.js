const fs = require('fs');
['About', 'Skills', 'Projects', 'Contact'].forEach(f => {
  const file = './src/components/sections/' + f + '.tsx';
  let content = fs.readFileSync(file, 'utf8');
  // uniform py-32 padding instead of py-24 to add lots of breathing room
  content = content.replace(/py-24/g, 'py-32');
  // uniform gaps
  content = content.replace(/gap-6/g, 'gap-8 lg:gap-12');
  fs.writeFileSync(file, content);
});
console.log('Padding adjusted');
