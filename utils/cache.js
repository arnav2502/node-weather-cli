const fs = require('fs');
const path = './data/cache.json';

function loadCache() {
  if (fs.existsSync(path)) {
    const fileData = fs.readFileSync(path, 'utf-8');
    return fileData ? JSON.parse(fileData) : {};
  }
  return {};
}

function saveCache(cache) {
  fs.writeFileSync(path, JSON.stringify(cache, null, 2));
}

module.exports = { loadCache, saveCache };
