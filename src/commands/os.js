import os from 'node:os';


export const showEOL = () => {
    console.log(JSON.stringify(os.EOL));
    console.log(os.EOL);
};

export const showCpuData = () => {
    const rawCpuData = os.cpus();
    const numOfCpu = rawCpuData.length;
    const cpuData = rawCpuData.map(({ model, speed }) =>
        ({ Model: model.trim(), 'Clock rate': `${speed / 1000}GHz` }));

    console.log(`Number of CPUs: ${numOfCpu}`);
    console.table(cpuData);
};
