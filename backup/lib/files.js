const HACK_FILE = '/dir/hack-loop-2.js';

// DELETE AND UPDATE MULTIPLE FILES

export async function updateFilesOnTarget(ns, target) {
    // Clean Target Server of Old Files
    const targetFiles = ns.ls(target, '/dir/');
    for (const file of targetFiles) {
        await ns.rm(file, target);
    }

    // Copy New Files to Server
    const files = ns.ls('home', '/dir/');
    await ns.scp(files, target);
    ns.tprint(`${files.length} Copied scessfully to ${target}`);
}

// DELETE AND UPDATE SINGLE FILE

export async function updateHackFileOnTarget(ns, target, script = HACK_FILE) {
    // Clean Target Server of Old File
    if (ns.fileExists(script, target)) {
        ns.rm(script, target);
    }

    // Copy New File to Server
    await ns.scp(script, target);

    // ns.tprint(`${script} - Copied scessfully to ${target}`)
}
