import * as React from "react";

const subscribe = () => () => {};

/**
 * Returns `false` during SSR and hydration, `true` once mounted on the client.
 * Uses useSyncExternalStore so no setState-in-effect is needed.
 */
export function useMounted(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
