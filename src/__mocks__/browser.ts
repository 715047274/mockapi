import { setupWorker, rest, graphql } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// https://mswjs.io/docs/api/setup-worker/use#examples
//
// Make the `worker` and `rest` references available globally,
// so they can be accessed in both runtime and test suites.

declare global {
    interface Window {
        msw: any;
    }
}

window.msw = window.msw || {
    worker,
    rest,
    graphql,
};
