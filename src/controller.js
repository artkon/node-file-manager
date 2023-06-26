import { stdin as input } from 'node:process';
import readline from 'node:readline/promises';
import os from 'node:os';

import { exit, getSeparatedPrompt, showCurrentPath } from './utils.js';
import { EXIT_COMMAND, INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE } from './constants.js';
import { navigateUp, showDirectoryContent, changeDirectory } from './commands/navigation.js'
import { renameFile, moveFile, removeFile, copyFile, showFileContent, createFile } from './commands/files.js'
import { hashFile } from './commands/hash.js'
import { showEOL, showCpuData } from './commands/os.js'
import { compressFile, decompressFile } from './commands/compressing.js'
import { getCurrentPath } from './state.js';


export const listenCommands = () => {
    const rl = readline.createInterface({ input });

    rl.on('line', async (prompt) => {
        if (prompt === EXIT_COMMAND) exit();

        const [command, arg1, arg2] = getSeparatedPrompt(prompt);

        try {
            switch (command) {
                case 'up': await navigateUp(); break;
                case 'cd': await changeDirectory(arg1); break;
                case 'ls': await showDirectoryContent(); break;
                case 'cat': await showFileContent(arg1); break;
                case 'add': await createFile(arg1); break;
                case 'rn': await renameFile(arg1, arg2); break;
                case 'cp': await copyFile(arg1, arg2); break;
                case 'mv': await moveFile(arg1, arg2); break;
                case 'rm': await removeFile(arg1); break;
                case 'os': { switch (arg1) {
                    case '--EOL': showEOL(); break;
                    case '--cpus': showCpuData(); break;
                    case '--homedir': console.log(os.homedir()); break;
                    case '--username': console.log(os.userInfo().username); break;
                    case '--architecture': console.log(os.arch()); break;
                    default: console.log(INVALID_INPUT_MESSAGE); }
                    break; }
                case 'hash': await hashFile(arg1); break;
                case 'compress': await compressFile(arg1, arg2); break;
                case 'decompress': await decompressFile(arg1, arg2); break;
                default: console.log(INVALID_INPUT_MESSAGE);
            }
        } catch (e) {
            console.log(OPERATION_FAILED_MESSAGE)
        }

        showCurrentPath(getCurrentPath());
    });
};
