import process from 'node:process';
import path from 'node:path';

import {
    CRTL_C_SIGNAL,
    getCurrentPathMessage,
    getGoodbyeMessage,
    getWelcomeMessage,
    PROMPT_REGEXP,
    USERNAME_KEY,
} from './constants.js';
import { getCurrentPath } from './state.js';


export const getUsername = () => {
    const args = process.argv.slice(2);

    return args.find(arg => arg.includes(USERNAME_KEY))?.split('=')[1];
};
export const welcomeUser = () => {
    console.log(getWelcomeMessage(getUsername()));
};
export const exit = () => process.exit(0);
export const exitOnSignal = () => {
    process.on(CRTL_C_SIGNAL, () => exit());
};
export const messageOnExit = () => {
    process.on('exit', () => console.log(getGoodbyeMessage(getUsername())));
};
export const showCurrentPath = (path) => console.log(getCurrentPathMessage(path));
export const getAbsolutePath = newPath => path.resolve(getCurrentPath(), newPath);
const removeQuote = str => str.replace(/'/g, '');
export const getSeparatedPrompt = prompt => (prompt.match(PROMPT_REGEXP) || []).map(removeQuote);
