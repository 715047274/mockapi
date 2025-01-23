const pollingOperations = [];

export async function fetchData(
    url: string,
    options?: RequestInit,
    operationName: string = undefined,
    isPolling = false
): Promise<Response> {
    if (isPolling && operationName) {
        if (pollingOperations.indexOf(operationName) > -1) {
            return;
        } else {
            pollingOperations.push(operationName);
        }
    }

    try {
        return await fetch(url, options).finally(() => {
            if (isPolling && operationName) {
                pollingOperations.splice(
                    pollingOperations.indexOf(operationName),
                    1
                );
            }
        });
    } catch (err) {
        if (isPolling && operationName) {
            pollingOperations.splice(
                pollingOperations.indexOf(operationName),
                1
            );
        }
        return err;
    }
}
