import {RecServerContext} from '../../models/t-servers';

// ------------------------------------------------------ //
// ---------------- RECURSIVE SERVER SCAN --------------- //
// -------------------------- + ------------------------- //
// ------------------- ACTION FUNCTION ------------------ //
// ------------------------------------------------------ //

/**
 * Recursive Function that loops through all servers and run a callback function on each
 * @param ns BitBurner NS Obj
 * @param server String - Server Name
 * @param visited Set List of visited Servers to prevent unecessary runs.
 * IMPORTANT: Please Create a new Set for visited before you initialise the first recServerScanAction and pass it to the first call.
 * @returns void | Promise<void>
 */
export async function recServerScanAction({ns, server, visited, action}: RecServerContext): Promise<void> {
    if (visited.has(server)) return;
    visited.add(server);

    await action({ns, server});

    const neighbours = ns.scan(server);
    for (const s of neighbours) {
        await recServerScanAction({ns, server: s, action, visited});
    }
}
