export const getEmploymentStatus = ()=> {
    const employmentStatus = [
        {
            employmentStatusId: 1,
            shortName: 'Active',
        },
        {
            employmentStatusId: 2,
            shortName: 'Inactive',
        },
        {
            employmentStatusId: 3,
            shortName: 'Probation',
        },
        {
            employmentStatusId: 4,
            shortName: 'Terminated',
        },
    ];

    return {
        employmentStatus: employmentStatus,
    };
}
