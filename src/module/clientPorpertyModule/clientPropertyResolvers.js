const mockClientPayrollProperties =
    [
        {
            codeName: "EnablePayrollHyperscaleService",
            value: "true",
            defaultValue: "false"
        },
        {
            codeName: "AllowImportAssignPWAOnBusinessDate",
            value: "true",
            defaultValue: "false"
        }
    ]

const clientPropertyResolvers = {
    Query: {
        clientPayrollProperties: ({ctx}) => {
            console.log("Received context", ctx)
            return mockClientPayrollProperties
        },
    }
}

export {clientPropertyResolvers}