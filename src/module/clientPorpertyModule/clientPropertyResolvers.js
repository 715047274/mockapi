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
        clientPayrollProperties: async (_, {ctx}) => {
            // If ctx is missing, inject a default value to prevent errors
            if (!ctx) {
                console.warn("⚠️ Warning: Client did not provide ctx. Using default value.");
                ctx = { sessionTicket: null, controlDbKey: null, userId: null, cultureId: null, prSchemaVersions: [] };
            }
            return mockClientPayrollProperties
        },
    }
}

export {clientPropertyResolvers}