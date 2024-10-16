import * as fs from 'fs';
import * as path from 'path';

interface FileTree {
  [key: string]: string | FileTree;
}

export function readDirToObject(dirPath: string): FileTree {
  const result: FileTree = {};
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      result[item] = readDirToObject(itemPath);
    } else if (stats.isFile()) {
      result[item] = fs.readFileSync(itemPath, 'utf-8');
    }
  }
  
  return result;
}

export function writeFilesFromObject(basePath: string, fileTree: FileTree): void {
  for (const key in fileTree) {
    const fullPath = path.join(basePath, key)

    if (typeof fileTree[key] === 'string') {
      const dirPath = path.dirname(fullPath)
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
        console.log(`Directory created: ${dirPath}`)
      }
      fs.writeFileSync(fullPath, fileTree[key] as string, 'utf-8')
      console.log(`File created: ${fullPath}`)
    } else {
      writeFilesFromObject(fullPath, fileTree[key] as FileTree);
    }
  }
}
