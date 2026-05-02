import {NS} from '@ns';
import {myPortOpeners, openPorts} from '../ports';
import {recServerScanAction} from './rec-scan';

// export async function main(ns: NS): Promise<void> {}

// ------------------------------------------------------ //
// --------------------- ROOT ACCESS -------------------- //
// ------------------------ BLOCK ----------------------- //
// ------------------------------------------------------ //

import {ServerContext} from 'models/t-servers';

export async function getServersRootAccess(ns: NS) {
    async function action({ns, server}: ServerContext): Promise<void> {
        const canRoot = await canRootServer(ns, server);
        if (canRoot) await getServerAccess(ns, server);
    }

    const visited = new Set<string>();
    await recServerScanAction({ns, server: 'home', visited, action});
}

// -------------- CAN THIS SERVER BE ROOTED ------------- //

export async function canRootServer(ns: NS, server: string) {
    const myPorts: number = myPortOpeners(ns);
    const myHackingLevel: number = ns.getHackingLevel();

    const neededPorts: number = ns.getServerNumPortsRequired(server);
    const neededHackingLevel: number = ns.getServerRequiredHackingLevel(server);

    return myPorts >= neededPorts && myHackingLevel >= neededHackingLevel;
}

// ------------------ GET SERVER ACCESS ----------------- //

export async function getServerAccess(ns: NS, server: string): Promise<void> {
    const hasRoot = ns.hasRootAccess(server);
    if (hasRoot) {
        ns.tprint(`Server: ${server} already has Root Access 🆗`);
    } else {
        await openPorts(ns, server);
        ns.nuke(server);
        const gainedAccess = ns.hasRootAccess(server);
        ns.tprint(`Server: ${server} Root Hacking Status: ${gainedAccess ? 'Success 🟢' : 'Fail 🔴'}`);
    }
}
