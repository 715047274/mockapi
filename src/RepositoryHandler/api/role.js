const mockAccessAuthorizations = [
    {
        roleAccessAuthorizationId: 9141,
        codeName: "PAYROLLOVERVIEW_CALCULATE_PAYRUN",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9142,
        codeName: "PAYROLLOVERVIEW_COMMIT_PAYRUN",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9143,
        codeName: "PAYROLLOVERVIEW_VALIDATE_PAYRUN",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9144,
        codeName: "PAYROLLOVERVIEW_LOCK_UNLOCK_PAYRUN",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9145,
        codeName: "PAYROLLOVERVIEW_APPROVE_PAYRUN",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9146,
        codeName: "PAYROLLOVERVIEW_WFM_CLOSE_PAYRUN",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9147,
        codeName: "TIMESHEET",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9148,
        codeName: "EMPLOYEE_TIMESHEET",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9149,
        codeName: "HRMS_STATUS",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9150,
        codeName: "HRMS_ISSUE_PAYCARD",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9151,
        codeName: "PAYROLL_CHECK_ACCESS",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9152,
        codeName: "PI_QE",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9153,
        codeName: "PI_PE",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9154,
        codeName: "HRMS_PAY",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    },
    {
        roleAccessAuthorizationId: 9155,
        codeName: "PayrollHyperScaleService",
        canCreate: true,
        canUpdate: true,
        canRead: true,
        canDelete: true
    }
]
const mockUser = {
    RoleId: 1001,
    ShortName: "Client Administrator - sysrole",
    XRefCode: "CLIENT ADMINISTRATOR Sys",
    IsSystemRole: true,
    IsDefault: false,
    IsAutoSelected: false,
    IsIpRestricted: false
}


export {mockUser, mockAccessAuthorizations}