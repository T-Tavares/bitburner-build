import {NS} from '@ns';

export interface ServerContext {
    ns: NS;
    server: string;
}

export interface RecServerContext extends ServerContext {
    visited: Set<string>;
    action: ({ns, server}: ServerContext) => void | Promise<void>;
}
