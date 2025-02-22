//
//
// export const filterHandlers: Record<
//     string,
//     (issue: PayRunIssueType, searchTerm: string) => boolean
//     > = {
//     [FilterModelSearchFields.DataEntry_SearchParameter_SearchTerm]: (
//         issue,
//         searchTerm
//     ) =>
//         issue.employeeNumber?.toString().includes(searchTerm) ||
//         issue.employeeName?.toString().toLowerCase().includes(searchTerm),
//
//     [FilterModelSearchFields.DataEntry_SearchParameter_PayRunMessageType]: (
//         issue,
//         searchTerm
//     ) => issue.messageTitle?.toString().toLowerCase().includes(searchTerm),
//
//     [FilterModelSearchFields.DataEntry_SearchParameter_EmployeeId]: (
//         issue,
//         searchTerm
//     ) =>
//         issue.employeeIssues.some(
//             (empIssue) =>
//                 empIssue.employeeId?.toString().toLowerCase() === searchTerm
//         ),
// };