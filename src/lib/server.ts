import {NS} from '@ns';

export async function main(ns: NS): Promise<void> {
    await getBestTarget(ns);
}

// ------------------------------------------------------ //
// --------------- GET ALL SERVERS ROOTED --------------- //
// ------------------------------------------------------ //

export async function getAllServersRooted(ns: NS): Promise<string[]> {
    const visited = new Set<string>();
    const hasRoot = new Set<string>();

    async function getServersRecursive(server: string): Promise<void> {
        if (visited.has(server)) return;
        visited.add(server);

        if (ns.hasRootAccess(server)) hasRoot.add(server);
        const serverChilds: string[] = ns.scan(server);

        for (const s of serverChilds) {
            await getServersRecursive(s);
        }
    }

    await getServersRecursive('home');

    const hasRootFiltered = [...hasRoot].filter(s => !s.includes('home'));
    ns.tprint(hasRootFiltered);

    return hasRootFiltered;
}

// ------------------------------------------------------ //
// ------------------- GET BEST TARGET ------------------ //
// ------------------------------------------------------ //

// is server ready ?
// is server good ?

export function calculateScore(ns: NS, server: string): number {
    const maxMoney = ns.getServerMaxMoney(server);
    const growth = ns.getServerGrowth(server);

    const minSecurity = ns.getServerMinSecurityLevel(server);
    const currSecurity = ns.getServerSecurityLevel(server);

    const currMoney = ns.getServerMoneyAvailable(server);

    // Normalisers
    const moneyRatio = currMoney / maxMoney;
    const securityPenalty = currSecurity / minSecurity;

    const score = (maxMoney * growth * moneyRatio) / (minSecurity * securityPenalty);

    return score;
}

export async function getBestTarget(ns: NS): Promise<string> {
    const serversRootedArr = await getAllServersRooted(ns);

    const bestTarget = serversRootedArr.reduce((bestServer, currServer): string => {
        if (bestServer === '') return currServer;

        const bestScore = calculateScore(ns, bestServer);
        const currScore = calculateScore(ns, currServer);
        return bestScore > currScore ? bestServer : currServer;
    }, '');

    const maxMoney = ns.getServerMaxMoney(bestTarget);
    const security = ns.getServerMinSecurityLevel(bestTarget);
    const growth = ns.getServerGrowth(bestTarget);
    const availableMoney = ns.getServerMoneyAvailable(bestTarget);

    ns.tprint(`Server: ${bestTarget}`);
    ns.tprint(`Max Money: ${maxMoney}`);
    ns.tprint(`Available Money: ${availableMoney}`);
    ns.tprint(`Security Lvl: ${security}`);
    ns.tprint(`Growth: ${growth}`);

    return bestTarget;
}
