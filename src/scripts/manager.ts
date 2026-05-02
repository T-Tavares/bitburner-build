import {NS} from '@ns';
import {getServersRootAccess} from '../lib/servers/root-access';

export async function main(ns: NS): Promise<void> {
    const manager = [
        {delay: 3000, fn: () => ns.print('scan for better targets')},
        {delay: 10000, fn: () => ns.print('scan to get root access')},
    ];

    // eslint-disable-next-line no-constant-condition
    while (true) {
        // await getServersRootAccess(ns);
        for (const t of manager) {
            await ns.sleep(t.delay);
            await t.fn();
        }
    }
}
