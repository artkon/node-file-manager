import fs from 'fs/promises';
import { createHash } from 'node:crypto';

import { getAbsolutePath } from '../utils.js';


export const hashFile = async (filePath) => {
    const fileBuffer = await fs.readFile(getAbsolutePath(filePath));
    const hash = createHash('sha256').update(fileBuffer).digest('hex');

    console.log(hash);
};
