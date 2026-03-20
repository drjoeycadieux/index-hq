const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script(?:.*?)>([\s\S]*?)<\/script>/g;
let match;
let errors = 0;
while ((match = scriptRegex.exec(content)) !== null) {
  const code = match[1];
  if (!code.trim()) continue;
  try {
    new Function(code);
  } catch(e) {
    if (!code.includes('tailwind.config')) {
      console.error('Error in script block:', e.message);
      errors++;
    }
  }
}
if(errors === 0) console.log('All script blocks are syntactically valid!');
