import os from 'node:os';


let currentPath = os.homedir();
export const getCurrentPath = () => currentPath;
export const setCurrentPath = (newPath) => {
    currentPath = newPath;
};
