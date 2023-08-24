import { useState, useCallback, useEffect } from 'react';

// Interface for storing and retrieving data using a specific key in the history object's state.
interface StorageProps<T> {
    key: string;
    value: T;
    replace: boolean;
}

// Check if the current environment is a browser (window object is not present in server environments like Node.js).
const isBrowser = typeof window !== 'undefined';

let historyStorage: { get: any; set: any };

if (isBrowser) {
    // Functions to manipulate the history object.
    historyStorage = ((history) => {
        // Overwrite the default replaceState method to merge state values.
        history.replaceState = (
            (replaceState) =>
                (state = {}, title, url) => {
                    return replaceState.call(
                        history,
                        { ...history.state, ...state },
                        title,
                        url,
                    );
                }
        )(history.replaceState);

        // Retrieve a specific key's value from the page property in history.state.
        const get = (key: string) => history.state?.page?.[key];

        // Store a specific key-value pair in the page property of history.state.
        const set = <T>({ key, value, replace = false }: StorageProps<T>) => {
            history.replaceState(
                {
                    page: replace
                        ? { [key]: value }
                        : { ...history.state?.page, [key]: value },
                },
                '',
            );
        };

        return { set, get };
    })(window.history);
}

interface StateProps<T> {
    initialState: T;
    key: string;
}

type UseHistoryStateReturnType<T> = [
    historyState: T,
    setState: (state: T, replace?: boolean) => void,
];
// Interface for setting the initial value and key for the hook.

const index = <T>({initialState,key}: StateProps<T>): UseHistoryStateReturnType<T> => {
    let initialData: T = initialState;

    if (isBrowser) {
        const stateValue = historyStorage.get(key);
        if (stateValue !== undefined) {
            initialData = stateValue;
        }
    }

    const [historyState, setHistoryState] = useState<T>(initialData);

    useEffect(() => {
        if (isBrowser) {
            const stateValue = historyStorage.get(key);
            if (stateValue !== undefined && stateValue !== historyState) {
                setHistoryState(stateValue);
            }
        }
    }, [key]);

    const setState = useCallback(
        (state: T, replace = false) => {
            if (!isBrowser) return;

            const value = state instanceof Function ? state(historyState) : state;

            setHistoryState(value);
            historyStorage.set({ key, value, replace });
        },
        [historyState, key],
    );

    return [historyState, setState];
};
export default index;