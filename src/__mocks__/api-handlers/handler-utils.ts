import {
    ModuleEnum,
    moduleEndPointMapping,
    DEFAULT_ENDPOINT,
} from '@models/enums/ModuleEnum';

const base_api =
    'http://localhost:8003/MicrofrontendGraphqlGateway/PayrollFrontEndBridgeServiceAPI';

const base_get_api =
    'http://localhost:8003/PayrollMicroFrontendGetGateway/PayrollFrontEndBridgeServiceAPI';

export function getEndpoint(module: ModuleEnum): string {
    return `${base_api}/${moduleEndPointMapping[module] ?? DEFAULT_ENDPOINT}`;
}

export function getEndpointForGet(module: ModuleEnum): string {
    return `${base_get_api}/${
        moduleEndPointMapping[module] ?? DEFAULT_ENDPOINT
    }`;
}
