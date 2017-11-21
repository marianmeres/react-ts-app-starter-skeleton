
export interface BrowserLocationObj {
    key?: string;
    pathname: string; // The path of the URL
    search: string; // The URL query string
    hash: string; // The URL hash fragment
    state: any; // location-specific state that was provided to e.g.
}

export interface RouteProps {
    match?: {
        params: any;
        isExact: boolean;
        path: string;
        url: string;
    };
    location?: BrowserLocationObj;
    history?: {
        length: number; // The number of entries in the history stack
        action: string; // The current action (PUSH, REPLACE, or POP)
        location: BrowserLocationObj; // The current location.
        push: (path, state) => any; // Pushes a new entry onto the history stack
        replace: (path, state?) => any; // Replaces the current entry on the history stack
        go: (n) => any; //  Moves the pointer in the history stack by n entries
        goBack: () => any; // Equivalent to go(-1)
        goForward: () => any; // Equivalent to go(1)
        block: (prompt) => any; // Prevents navigation
    };
}
