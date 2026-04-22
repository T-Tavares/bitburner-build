import {NS, Server} from '@ns';

// ------------------------------------------------------ //
// ------- SCAN AND PRINT SERVERS WITH ROOT ACCESS ------ //
// ------------------------------------------------------ //

export async function main(ns: NS): Promise<void> {
    let STRING: string;

    const visited = new Set<string>();
    const hasRoot = new Set<string>();

    interface RecursiveScan {
        server: string;
        branches: boolean[];
    }

    async function recursiveScan({server, branches}: RecursiveScan): Promise<void> {
        if (visited.has(server)) return;
        visited.add(server);

        if (ns.hasRootAccess(server)) {
            hasRoot.add(server);

            const serverNode = getNode(ns, server);
        }
    }
}

// ------------------------------------------------------ //
// ----------------------- HELPERS ---------------------- //
// ------------------------------------------------------ //

// ------------------- GET SERVER NODE ------------------ //

interface ServerNode {
    server: string;
    baseSecurityLevel: number;
    availableMoney: number;

    maxMoney: number;
    growth: number;
    minSecurityLevel: number;

    growthTime: number;
    weakenTime: number;
    hackingTime: number;

    availableRam: number;
}

function getNode(ns: NS, server: string): ServerNode {
    return {
        server: server,
        baseSecurityLevel: ns.getServerBaseSecurityLevel(server),
        availableMoney: ns.getServerMoneyAvailable(server),

        maxMoney: ns.getServerMaxMoney(server),
        growth: ns.getServerGrowth(server),
        minSecurityLevel: ns.getServerMinSecurityLevel(server),

        growthTime: ns.getGrowTime(server),
        weakenTime: ns.getWeakenTime(server),
        hackingTime: ns.getHackTime(server),

        availableRam: ns.getServerMaxRam(server) - ns.getServerUsedRam(server),
    };
}
