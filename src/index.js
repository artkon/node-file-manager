import { welcomeUser, messageOnExit, exitOnSignal, showCurrentPath } from './utils.js';
import { listenCommands } from './controller.js';
import { getCurrentPath } from './state.js';


const startFileManager = () => {
    welcomeUser();
    showCurrentPath(getCurrentPath());

    listenCommands();

    exitOnSignal();
    messageOnExit();
}

startFileManager();
