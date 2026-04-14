import {getAvailableThreads} from '/dir/lib/scan.js';
import {updateHackFileOnTarget} from '/dir/lib/files.js';

export async function runsPerServer(ns, runs = 1, serversArr, script) {
    for (let i = 0; i < serversArr.length; i++) {
        const server = serversArr[i]; //                                   Target Server
        ns.killall(server); //                                             Clean Up
        await updateHackFileOnTarget(ns, server); //                       Updating Files

        for (let n = 1; n <= runs; n++) {
            const target = serversArr[(i + n) % serversArr.length];
            const availableThreads = await getAvailableThreads(ns, server, script);

            if (availableThreads === 0) {
                ns.tprint(`🟡 -- WARNING -- 🟡 : No RAM / Threads available on ${server}`);
            } else {
                const pid = ns.exec(script, server, availableThreads, target);
                pid == 0
                    ? ns.tprint(
                          `❌ --   FAIL  -- ❌ : To start script on ${server} targetting ${target} - Threads ${availableThreads}`,
                      )
                    : ns.tprint(
                          `✅ -- SUCCESS -- ✅ : Started Script on ${server} targetting ${target} - Threads ${availableThreads}`,
                      );
            }
        }
    }
}

export async function singleTargetRun(ns, host, script, target) {
    ns.killall(host); //                                             Clean Up
    await updateHackFileOnTarget(ns, host); //                       Updating Files

    const availableThreads = await getAvailableThreads(ns, host, script);
    if (availableThreads === 0) {
        ns.tprint(`🟡 -- WARNING -- 🟡 : No RAM / Threads available on ${host}`);
    } else {
        const pid = ns.exec(script, host, availableThreads, target);
        pid == 0
            ? ns.tprint(
                  `❌ --   FAIL  -- ❌ : To start script on ${host} targetting ${target} - Threads ${availableThreads}`,
              )
            : ns.tprint(
                  `✅ -- SUCCESS -- ✅ : Started Script on ${host} targetting ${target} - Threads ${availableThreads}`,
              );
    }
}
