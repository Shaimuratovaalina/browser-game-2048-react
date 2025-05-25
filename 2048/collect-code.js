const fs = require('fs');
const path = require('path');

const folderPath = 'src'; // Папка с кодом
const outputFilePath = 'project-code.txt';

function readAllFiles(folder) {
  let result = '';

  const files = fs.readdirSync(folder);

  for (const file of files) {
    const fullPath = path.join(folder, file);
    if (fs.statSync(fullPath).isDirectory()) {
      result += `\n\n📁 ${fullPath}\n`;
      result += fs.readFileSync(__filename, 'utf-8'); // Для теста
    } else {
      const content = fs.readFileSync(fullPath, 'utf-8');
      result += `\n\n📄 ${fullPath}\n`;
      result += content;
    }
  }

  return result;
}

fs.writeFileSync(outputFilePath, readAllFiles(folderPath));

console.log('Готово! Код сохранён в project-code.txt');