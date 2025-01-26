/**
 * This is intended to replace a hook with a version that does the same thing, but
 * first records the return value from the hook into an object that a unit test can
 * access. This allows interacting with the hook while *also* interacting with the
 * component.
 *
 * IMPORTANT: If you do not need to interact with the rendered component, please
 * use the renderHook function from @testing-library/react instead. That will test
 * the hook in a more pure manner.
 *
 * @param hookWatcher - an object with a results property that will store what the
 *  hook returns so you can observe or manipulate it.
 * @param hookToSpy - the hook you wish to spy on
 * @returns the spied hook for the unit test to use in place of the real hook
 */
export function getSpiedHook<T>(
    hookWatcher: { results: T },
    hookToSpy: (...hookArgs) => T
): (...hookArgs) => T {
    function spiedHook(...args) {
        hookWatcher.results = hookToSpy(...args);
        return hookWatcher.results;
    }
    return spiedHook;
}
