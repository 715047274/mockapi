import {buildSchema} from "graphql";

const schema1 = buildSchema(`
  input ServiceContextInput {
        sessionTicket: String,
        controlDbKey: String,
        userId: Int,
        cultureId: Int,
        prSchemaVersions: [Int],    
  }   
  
  type ClientPayrollProperty {
    codeName: String!
    value: String!
    defaultValue: String!
  }

  type Query {
    clientPayrollProperties(ctx: ServiceContextInput!): [ClientPayrollProperty!]!
  }
`);

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

const root1 = {
    clientPayrollProperties: ({ctx}) => {
        console.log("Received context", ctx)
        return mockClientPayrollProperties
    },
};

export {schema1, root1};




