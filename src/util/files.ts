declare global {
  interface Window {
    showOpenFilePicker: any;
  }
}

interface AcceptType {
  [key: string]: string[];
}
interface FileType {
  description: string;
  accept: AcceptType;
}
interface FileSystemOption {
  types: FileType[];
}

export async function readFile(option: FileSystemOption) {
  let fileHandle;
  [fileHandle] = await window.showOpenFilePicker(option);
  const file = await fileHandle.getFile();
  const data = await file.text();
  return data;
}

export async function writeFile(contents: string, option: FileSystemOption) {
  let fileHandle;
  [fileHandle] = await window.showOpenFilePicker(option);
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}
