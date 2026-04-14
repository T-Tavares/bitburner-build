/** @param {NS} ns */

const SECURITY_LEVEL_BASELINE = 2; // if script are stalling make it 0.8 or lower
const MONEY_BASELINE = 0.9; // if income is slow make it 0.95 or higher

export async function main(ns) {
    const target = ns.args[0];

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const minSecurityLevel = ns.getServerMinSecurityLevel(target);
        const currentSecurityLevel = ns.getServerSecurityLevel(target);
        const securityLevelDiff = currentSecurityLevel - minSecurityLevel;

        const maxMoney = ns.getServerMaxMoney(target);
        const availableMoney = ns.getServerMoneyAvailable(target);

        if (maxMoney === 0) {
            await ns.sleep(200);
            continue;
        }

        if (securityLevelDiff > SECURITY_LEVEL_BASELINE) {
            await ns.weaken(target);
            continue;
        } else if (availableMoney < maxMoney * MONEY_BASELINE) {
            await ns.grow(target);
            continue;
        }

        await ns.hack(target);
    }
}
