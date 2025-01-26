import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import {
    mainCldrHandlers,
    supplementalCldrHandlers,
    availableLocalesCldrHandlers,
} from './passthrough-handlers/cldr-handlers';
import { payRunHandlers } from './api-handlers/pay-run-handlers';

export const server = setupServer(
    ...handlers,
    ...availableLocalesCldrHandlers,
    ...mainCldrHandlers,
    ...supplementalCldrHandlers
);

export const mockQAJsonServer = setupServer(
    ...availableLocalesCldrHandlers,
    ...mainCldrHandlers,
    ...supplementalCldrHandlers,
    ...payRunHandlers //temporary introduce it due to useQuery not be mocked, better remove it.
);
