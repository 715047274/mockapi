import { ResponseResultType } from '@models/common/ResponseResultType';
import { GetUrl } from '@utils/ApiUrlUtils';
import {
    HEADER_MEDIA_TYPE_ACCEPT,
    HEADER_MEDIA_TYPE_CONTENT_TYPE,
} from '@models/constants/RequestHeaderConstants';
import { getLabel, LabelGroup } from '@utils/LocalizationUtils';
import { fetchData } from './FetchData';

export async function getModuleData<T>(
    module: string,
    options: any = {},
    headers: any = {},
    isPolling = false
): Promise<ResponseResultType<T>> {
    const fetchOptions = {
        method: 'GET',
        ...options,
        headers: {
            'Content-Type': HEADER_MEDIA_TYPE_CONTENT_TYPE,
            Accept: HEADER_MEDIA_TYPE_ACCEPT,
            ...headers,
        },
    };

    try {
        const response = await fetchData(
            GetUrl(module),
            fetchOptions,
            undefined,
            isPolling
        );
        const data = await response.json();
        if (response.ok) {
            return {
                status: response.status,
                data: data as T,
            };
        }
        throw new Error(response.statusText);
    } catch (err) {
        return Promise.reject(
            err.message
                ? err.message
                : getLabel(LabelGroup.Basic, 'UnknownError')
        );
    }
}

export async function postModuleData<T>(
    url: string,
    body: Record<string, unknown>,
    options: any = {},
    headers: any = {},
    isPolling = false,
    signal: AbortSignal = undefined
): Promise<ResponseResultType<T>> {
    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        ...options,
        headers: {
            'Content-Type': HEADER_MEDIA_TYPE_CONTENT_TYPE,
            Accept: HEADER_MEDIA_TYPE_ACCEPT,
            ...headers,
        },
        signal: signal,
    };

    try {
        const response = await fetchData(
            url,
            fetchOptions,
            body?.operationName as string,
            isPolling
        ).catch((err) => {
            return Promise.reject(
                err.message
                    ? err.message
                    : getLabel(LabelGroup.Basic, 'UnknownError')
            );
        });
        const data = response.json();
        if (response.ok) {
            return data;
        }
    } catch (err) {
        return Promise.reject(
            err.message
                ? err.message
                : getLabel(LabelGroup.Basic, 'UnknownError')
        );
    }
}

export async function postModuleStreamData(
    url: string,
    body: Record<string, unknown>,
    options: any = {},
    headers: any = {},
    isPolling = false
): Promise<ResponseResultType<Blob>> {
    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        ...options,
        headers: {
            'Content-Type': HEADER_MEDIA_TYPE_CONTENT_TYPE,
            ...headers,
        },
    };

    try {
        const response = await fetchData(
            url,
            fetchOptions,
            body?.operationName as string,
            isPolling
        );
        const data = await response.blob();
        if (response.ok) {
            return { data: data, status: response.status };
        }
        throw new Error(response.statusText);
    } catch (err) {
        return Promise.reject(
            err.message
                ? err.message
                : getLabel(LabelGroup.Basic, 'UnknownError')
        );
    }
}

export async function getModuleStreamData(
    url: string,
    options: any = {},
    headers: any = {},
    isPolling = false
): Promise<ResponseResultType<Blob>> {
    const fetchOptions = {
        method: 'GET',
        ...options,
        headers: {
            'Content-Type': HEADER_MEDIA_TYPE_CONTENT_TYPE,
            ...headers,
        },
    };

    try {
        const response = await fetchData(
            url,
            fetchOptions,
            undefined,
            isPolling
        );
        const data = await response.blob();
        if (response.ok) {
            return { data: data, status: response.status };
        }
        throw new Error(response.statusText);
    } catch (err) {
        return Promise.reject(
            err.message
                ? err.message
                : getLabel(LabelGroup.Basic, 'UnknownError')
        );
    }
}
