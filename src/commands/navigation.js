import fs from 'fs/promises';

import { getAbsolutePath } from '../utils.js';
import { getCurrentPath, setCurrentPath } from '../state.js';


export const navigateUp = () => {
    const newPath = getAbsolutePath('..');

    setCurrentPath(newPath);
};

export const changeDirectory = async (addedPath) => {
    const newPath = getAbsolutePath(addedPath);

    const dir = await fs.opendir(newPath);
    dir.close();

    setCurrentPath(newPath);
};

export const showDirectoryContent = async () => {
    const dirContent = await fs.readdir(getCurrentPath(), { withFileTypes: true });

    const files = [];
    const dirs = [];

    dirContent.forEach(content => content.isDirectory()
        ? dirs.push({ Name: content.name, Type: 'Directory'})
        : files.push({ Name: content.name, Type: 'File'}))

    const dataToPrint = dirs.concat(files);

    if (dataToPrint.length) {
        console.table(dataToPrint);
    } else {
        console.log('This folder is empty');
    }
};
