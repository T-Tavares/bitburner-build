import {NS} from '@ns';
import {openPorts, myPortOpeners} from '/lib/ports';

export async function main(ns: NS): Promise<void> {}

async function getAccess(ns: NS, server: string): Promise<void> {
    const myPorts: number = myPortOpeners(ns);
    const myHackingLevel: number = ns.getHackingLevel();

    const neededPorts: number = ns.getServerNumPortsRequired(server);
    const neededHackingLevel: number = ns.getServerRequiredHackingLevel(server);

    if (myPorts >= neededPorts && myHackingLevel >= neededHackingLevel) {
        ns.nuke(server);
        await openPorts(ns, server);
    }
}

interface ServerContext {
    ns: NS;
    server: string;
}
interface ServerAction extends ServerContext {
    action: ({ns, server}: ServerContext) => void | Promise<void>;
}

async function recServerScanAction({ns, server, action}: ServerAction): Promise<void> {
    const hasRoot = ns.hasRootAccess(server);

    action({ns, server});

    const neighbours: string[] = ns.scan(server);
    for (const s of neighbours) {
        recServerScanAction({ns, server: s, action});
    }
}
