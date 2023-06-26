import path from 'node:path';
import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';

import { getAbsolutePath } from '../utils.js';


export const showFileContent = async (fileName) => {
    const filePath = getAbsolutePath(fileName);
    const content = await fs.readFile(filePath, { encoding: 'utf8' });

    console.log(content);
};

export const createFile = async (fileName) => {
    const filePath = getAbsolutePath(fileName);
    await fs.writeFile(filePath, '', { flag: 'wx' });
};

export const renameFile = async (sourceFilePath, fileName) => {
    const absoluteSourceFilePath = getAbsolutePath(sourceFilePath);
    const targetFilePath = path.join(path.dirname(absoluteSourceFilePath), fileName);

    await fs.rename(absoluteSourceFilePath, targetFilePath);
};

export const copyFile = async (sourceFilePath, targetDirPath) => {
    const fileName = path.basename(sourceFilePath);

    const absoluteSourceFilePath = getAbsolutePath(sourceFilePath)
    const absoluteTargetDirPath =  getAbsolutePath(targetDirPath);
    const absoluteTargetFilePath = path.join(absoluteTargetDirPath, fileName);

    const dir = await fs.opendir(absoluteTargetDirPath);
    dir.close();
    await fs.writeFile(absoluteTargetFilePath, '', { flag: 'wx' });

    const sourceFileReadStream = createReadStream(absoluteSourceFilePath);
    const targetFileWriteStream = createWriteStream(absoluteTargetFilePath);

    await sourceFileReadStream.pipe(targetFileWriteStream);
};

export const removeFile = async (filePath) => {
    const absoluteFilePath = getAbsolutePath(filePath);

    await fs.rm(absoluteFilePath);
};

export const moveFile = async (sourceFilePath, targetDirPath) => {
    await copyFile(sourceFilePath, targetDirPath);

    await removeFile(sourceFilePath);
};
