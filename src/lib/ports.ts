import {NS} from '@ns';

const PORT_PROGRAMS = [
    {file: 'BruteSSH.exe', fn: (ns: NS, s: string) => ns.brutessh(s)},
    {file: 'FTPCrack.exe', fn: (ns: NS, s: string) => ns.ftpcrack(s)},
    {file: 'relaySMTP.exe', fn: (ns: NS, s: string) => ns.relaysmtp(s)},
    {file: 'HTTPWorm.exe', fn: (ns: NS, s: string) => ns.httpworm(s)},
    {file: 'SQLInject.exe', fn: (ns: NS, s: string) => ns.sqlinject(s)},
];

export function myPortOpeners(ns: NS): number {
    return PORT_PROGRAMS.filter(prog => ns.fileExists(prog.file)).length;
}

export async function openPorts(ns: NS, server: string): Promise<void> {
    for (const prog of PORT_PROGRAMS) {
        if (ns.fileExists(prog.file)) {
            prog.fn(ns, server);
        }
    }
}
