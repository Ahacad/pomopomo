declare global {
  interface Window {
    showOpenFilePicker: any;
    showSaveFilePicker: any;
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
  types?: FileType[];
}

async function readFile(option: FileSystemOption) {
  let fileHandle;
  [fileHandle] = await window.showOpenFilePicker(option);
  const file = await fileHandle.getFile();
  const data = await file.text();
  return data;
}

async function writeFile(contents: string, option?: FileSystemOption) {
  let fileHandle;
  fileHandle = await window.showSaveFilePicker(option);
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}

export async function writeJson(contents: string) {
  const option: FileSystemOption = {
    types: [
      { description: "Json data", accept: { "application/json": [".json"] } },
    ],
  };
  await writeFile(contents, option);
}
