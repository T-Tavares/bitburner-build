import {getTargets} from '/dir/lib/scan.js';
import {runsPerServer, singleTargetRun} from '/dir/lib/controllers.js';

const HACK_SCRIPT = '/dir/hack-loop-2.js';

/** @param {NS} ns */
export async function main(ns) {
    const isKillAllTrue = ns.args[0] || false; //                            Kill All Servers Processes if True
    if (isKillAllTrue) ns.exec('/helpers/killall.js', 'home', 10, true); //   Kill All Servers Processes if True

    const allRootServers = await getTargets(ns); //                               Get list of Root Access Servers

    const bestTarget = allRootServers.reduce((bestTarget, currTarget) => {
        if (bestTarget === '') return currTarget;
        const bestScore = getScore(bestTarget);
        const currScore = getScore(currTarget);
        return currScore > bestScore ? currTarget : bestTarget;
    }, '');

    ns.tprint(`\n\nBest Target: ${bestTarget}`);

    for (const host of allRootServers) {
        await singleTargetRun(ns, host, HACK_SCRIPT, bestTarget);
    }

    ns.tprint(`\nInit Hack Routine Update Completed\n`);

    // Early game
    // function getScore(server) {
    //     return (ns.getServerMaxMoney(server) * ns.getServerGrowth(server)) / ns.getHackTime(server)
    // }

    function getScore(server) {
        const maxMoney = ns.getServerMaxMoney(server);
        const growth = ns.getServerGrowth(server);
        const minSec = ns.getServerMinSecurityLevel(server);

        if (maxMoney <= 0) return 0;

        return (maxMoney * growth) / minSec;
    }
}
