import {
    getPayRunAvailableFeatures,
    PayRunAvailableFeaturesType,
} from '@utils/HidingFeatureUtils';
import { setFeatureAccessCache } from '@components/common/cache/session-cache';
import { FeaturesEnum } from '@models/constants/FeatureConstants';

export const mockHyperscaleFeatures = Object.values(FeaturesEnum);

export function makeMockPayRunAvailableFeaturesObject(): PayRunAvailableFeaturesType {
    setFeatureAccessCache(mockHyperscaleFeatures);
    //arguments that will give the most standard/usual result - uncommitted, non-off-cycle pay run
    return getPayRunAvailableFeatures({}, false, false);
}

/*
It can't be automatically be made based on the _____AvailableFeaturesType types and/or
get_____AvailableFeatures functions because types can only be used for typing but this
is real code, and get_____AvailableFeatures depend on this api return. So we have to
maintain this mock manually... I did what I could to make it convenient though :)
*/
// prettier-ignore
const featuresApiReturn = makeApiReturn(FeaturesEnum.PayrollUIService, 1, [
    makeApiReturn(FeaturesEnum.Overview, 1, [
        makeApiReturn(FeaturesEnum.PayRun, 1, [
            makeApiReturn(FeaturesEnum.PayRunDashboard, 1),
            makeApiReturn(FeaturesEnum.PayRunPreview, 2, [
                makeApiReturn(FeaturesEnum.PreviewSummary, 1, [
                    makeApiReturn(FeaturesEnum.PreviewSummaryCodes, 1, [
                        makeApiReturn(
                            FeaturesEnum.PreviewSummaryCodesEmployees
                        ),
                    ]),
                ]),
                makeApiReturn(FeaturesEnum.PreviewEmployees, 2),
                makeApiReturn(FeaturesEnum.PreviewPayments, 3, [
                    makeApiReturn(FeaturesEnum.PreviewPaymentsLegalEntities, 1,
                        [
                            makeApiReturn(FeaturesEnum.PreviewPaymentsLegalEntitiesEmployees),
                        ]
                    ),
                ]),
                makeApiReturn(FeaturesEnum.WageAndTax, 4),
            ]),
            makeApiReturn(FeaturesEnum.PayRunDataEntry, 3, [
                makeApiReturn(FeaturesEnum.QuickEntries, 1, [
                    makeApiReturn(FeaturesEnum.ImportQuickEntries, 1),
                    makeApiReturn(FeaturesEnum.ManageQuickEntries, 2),
                ]),
                makeApiReturn(FeaturesEnum.TimeData, 2),
                makeApiReturn(FeaturesEnum.Checks, 3, [
                    makeApiReturn(FeaturesEnum.ImportChecks, 1),
                    makeApiReturn(FeaturesEnum.ManageChecks, 2),
                ]),
                makeApiReturn(FeaturesEnum.Adjustments, 4, [
                    makeApiReturn(FeaturesEnum.ImportAdjustments, 1),
                    makeApiReturn(FeaturesEnum.ManageAdjustments, 2),
                ]),
            ]),
            makeApiReturn(FeaturesEnum.PayRunIssues, 4),
            makeApiReturn(FeaturesEnum.EmployeePanel, 5, [
                makeApiReturn(FeaturesEnum.EmployeePanelOverview, 1),
                makeApiReturn(FeaturesEnum.EmployeePanelEarningStatement, 2),
                makeApiReturn(FeaturesEnum.EmployeePanelTimesheet, 3),
                makeApiReturn(FeaturesEnum.EmployeePanelPreview, 4),
                makeApiReturn(FeaturesEnum.EmployeePanelTimeData, 5),
                makeApiReturn(FeaturesEnum.EmployeePanelGeneralLedger, 6),
                makeApiReturn(FeaturesEnum.EmployeePanelWageTax, 7),
            ]),
            makeApiReturn(FeaturesEnum.ConfigureOffCyclePayRun, 6),
            makeApiReturn(FeaturesEnum.PayRunReports, 7, [
                makeApiReturn(FeaturesEnum.PayRunReportsAudits, 1),
                makeApiReturn(FeaturesEnum.PayRunReportsAllReports, 2), [
                    makeApiReturn(FeaturesEnum.PayRunReportsDeliveryPackages),
                    makeApiReturn(FeaturesEnum.PayRunReportsExports)
                ],
            ]),
        ]),
        makeApiReturn(FeaturesEnum.OverviewRecalculate, 2),
    ]),
]);

// prettier-ignore
const employeeProfileFeatureApiReturn = makeApiReturn(FeaturesEnum.DayforceAppContainer, 2, [
    makeApiReturn(FeaturesEnum.EmployeeProfileParent, 1, [
        makeApiReturn(FeaturesEnum.EmployeeProfile, 1),
    ]),
]);

// prettier-ignore
const pensionerContractorConfigFeatureApiReturn = makeApiReturn(FeaturesEnum.PayrollAdmin, 1, [
    makeApiReturn(FeaturesEnum.PensionerContractorConfig, 8)
]);

const employeeConfidentialInfoFeatureApiReturn = makeApiReturn(
    FeaturesEnum.DayforceAppContainer,
    1,
    [
        makeApiReturn(FeaturesEnum.EmployeeProfileParent, 2, [
            makeApiReturn(FeaturesEnum.EmployeeProfile, 3, [
                makeApiReturn(FeaturesEnum.EmployeeProfilePersonal, 4, [
                    makeApiReturn(
                        FeaturesEnum.EmployeeConfidentialInformation,
                        5
                    ),
                ]),
            ]),
        ]),
    ]
);

function makeApiReturn<T>(
    targetObjectType: FeaturesEnum,
    roleSequence = 1,
    subFeatures?: T[]
) {
    return {
        TargetObjectType: targetObjectType,
        SubFeatures: subFeatures,
        RoleSequence: roleSequence,
    };
}

export function getReturnValueForGetFeatures(): any {
    setFeatureAccessCache(mockHyperscaleFeatures);

    return {
        UserFeatures: [
            featuresApiReturn,
            employeeProfileFeatureApiReturn,
            pensionerContractorConfigFeatureApiReturn,
            employeeConfidentialInfoFeatureApiReturn,
        ],
    };
}
