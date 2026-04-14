export async function getTargets(ns) {
    const visited = new Set();
    const hasRoot = new Set();
    const purchasedServers = ns.getPurchasedServers();

    const scanAndGetAccess = async server => {
        if (visited.has(server)) return; //          Avoid Repeated Scans
        visited.add(server); //                       Avoid Repeated Scans
        if (ns.hasRootAccess(server)) {
            //           Add to List if Alredy has Root Access

            if (!purchasedServers.includes(server) && server !== 'home') {
                hasRoot.add(server);
            }
        }

        // Recursive for Neigthbours Servers

        const neightbours = ns.scan(server);
        for (const s of neightbours) {
            await scanAndGetAccess(s);
        }
    };

    await scanAndGetAccess('home'); //                Home Server as Starting Point
    return [...hasRoot]; //                           Return Arr of Targets (Servers with Root Access)
}

export async function getAvailableThreads(ns, server, script) {
    const scriptRam = ns.getScriptRam(script);
    const serverMaxRam = ns.getServerMaxRam(server);
    const serverUsedRam = ns.getServerUsedRam(server);

    const availableThreads = Math.floor((serverMaxRam - serverUsedRam) / scriptRam);
    return availableThreads;
}
