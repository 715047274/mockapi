export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * This makes functions for mocking object return values, with default values
 * based on the argument provided to makeOverridableObjectFactory. The return
 * value is a function that can be used to get the desired return value for a
 * mocked call that would return an object, such as a context.
 *
 * ----How To Use It---- :)
 * See the examples in @mocks/contexts for how to use it. The function that this
 * returns (e.g. getContextMockedReturn) can be called to get those default values
 * you gave it. To use different values in a test, pass an object to that function
 * with just the value you want to set - the rest will still use the defaults.
 *
 * For example: getDataEntryContextMockedReturn({ payRunQuickEntryCount: 42 })
 * This will use all the default values, except payRunQuickEntryCount will be
 * set to 42.
 *
 * It can also override nested values - just specify the nested value you need.
 * For example: getPrmContextMockedReturn({ employeeSubcontext: { employeeId: 123 } })
 * This will use all the default values, except employeeSubcontext.employeeId will
 * be set to 123.
 */
export function makeOverridableObjectFactory<T>(
    defaultValues: T
): (returnOverrides?: DeepPartial<T>) => T {
    //this must be defined inside makeOverridableObjectFactory, in order for defaultValues to use closure
    function makeOverriddenObject(returnOverrides?: DeepPartial<T>): T {
        const overriddenObject = { ...defaultValues };
        returnOverrides &&
            Object.keys(returnOverrides).forEach((key) => {
                if (
                    overriddenObject[key] &&
                    overriddenObject[key].constructor === Object
                ) {
                    overriddenObject[key] =
                        makeOverriddenObjectSupplyingDefaultValues(
                            defaultValues[key],
                            returnOverrides[key]
                        );
                } else {
                    overriddenObject[key] = returnOverrides[key];
                }
            });
        return overriddenObject;
    }
    return makeOverriddenObject;
}

//this must be defined outside of makeOverriddenObjectFactory, in order for T to become different types
function makeOverriddenObjectSupplyingDefaultValues<T>(
    defaultValues: T,
    returnOverrides?: DeepPartial<T>
): T {
    const overriddenObject = { ...defaultValues };
    returnOverrides &&
        Object.keys(returnOverrides).forEach((key) => {
            if (
                overriddenObject[key] &&
                overriddenObject[key].constructor === Object
            ) {
                overriddenObject[key] = !returnOverrides[key]
                    ? //if an object property's override is null/undefined, just directly assign it
                      returnOverrides[key]
                    : makeOverriddenObjectSupplyingDefaultValues(
                          defaultValues[key],
                          returnOverrides[key]
                      );
            } else {
                overriddenObject[key] = returnOverrides[key];
            }
        });
    return overriddenObject;
}
