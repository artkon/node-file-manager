export const USERNAME_KEY = 'username';
export const DEFAULT_USERNAME = 'Username';
export const getWelcomeMessage = username => `Welcome to the File Manager, ${username || DEFAULT_USERNAME}!`;
export const EXIT_COMMAND = '.exit';
export const CRTL_C_SIGNAL = 'SIGINT';
export const getGoodbyeMessage = username =>
    `Thank you for using File Manager, ${username || DEFAULT_USERNAME}, goodbye!`;
export const getCurrentPathMessage = path => `You are currently in ${path}`;
export const INVALID_INPUT_MESSAGE = 'Invalid input';
export const OPERATION_FAILED_MESSAGE = 'Operation failed';

export const PROMPT_REGEXP = /'([^']+)'|\S+/g;
