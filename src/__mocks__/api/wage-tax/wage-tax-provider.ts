import {
    EMPLOYEE_WAGE_TAX_TOTAL_COUNT,
    mockDataOptionsEmployeeWageTax,
    mockDataOptionsWageTaxLegalEntity,
    mockDataOptionsWageTaxOverview,
    TOTAL_COUNT,
} from '@mocks/api/wage-tax/wage-tax-provider-options';
import { FilterModelSearchFields } from '@models/common/FilterTypes';
import { FilterTypeEnum } from '@models/constants/FilterConstants';
import { LoadWageTaxRequestType } from '@models/wage-tax/request/LoadWageTaxRequestType';
import {
    EmployeeWageTaxLegalEntityFilterResponseType,
    EmployeeWageTaxModelType,
    EmployeeWageTaxType,
} from '@models/wage-tax/EmployeeWageTaxType';
import {
    WageTaxLegalEntityModelType,
    WageTaxLegalEntityType,
} from '@models/wage-tax/WageTaxLegalEntityType';
import {
    WageTaxOverviewModelType,
    WageTaxOverviewType,
} from '@models/wage-tax/WageTaxOverviewType';
import { getFilterModelValueByFilterType } from '@utils/FilterModelUtils';

export const getWageTaxOverview = (
    payload: LoadWageTaxRequestType
): WageTaxOverviewModelType => {
    const {
        legalEntityName,
        countryName,
        regionNames,
        payGroups,
        employeeCount,
        qtdTaxes,
        ytdTaxes,
        varianceQtdTaxes,
        varianceYtdTaxes,
    } = mockDataOptionsWageTaxOverview;

    const filters = payload.filters;
    const take = payload?.pagingParams?.take ?? 0;
    const skip = payload?.pagingParams?.skip ?? 0;

    const searchTerm = filters
        ?.find(
            (x) =>
                x.field ===
                FilterModelSearchFields.DataEntry_SearchParameter_SearchTerm
        )
        ?.parameterValue?.value?.toLowerCase();

    const allItems = Array<WageTaxOverviewType>(TOTAL_COUNT)
        .fill({
            legalEntityName: null,
            countryName: null,
            regionNames: null,
            payGroups: null,
            employeeCount: null,
            qtdTaxes: null,
            varianceQtdTaxes: null,
            ytdTaxes: null,
            varianceYtdTaxes: null,
        })
        .map((_, idx) => {
            return {
                legalEntityName: legalEntityName[idx % legalEntityName.length],
                countryName: countryName[idx % countryName.length],
                regionNames: regionNames[idx % regionNames.length].slice(
                    0,
                    idx % regionNames[idx % regionNames.length].length || 1
                ),
                payGroups: payGroups.slice(0, idx % payGroups.length || 1),
                employeeCount: employeeCount[idx % employeeCount.length],
                qtdTaxes: qtdTaxes[idx % qtdTaxes.length],
                varianceQtdTaxes:
                    varianceQtdTaxes[idx % varianceQtdTaxes.length],
                ytdTaxes: ytdTaxes[idx % ytdTaxes.length],
                varianceYtdTaxes:
                    varianceYtdTaxes[idx % varianceYtdTaxes.length],
            };
        });

    const filteredItems = allItems?.filter(
        (item) =>
            !searchTerm ||
            item.legalEntityName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const pagedItems = filteredItems?.slice(skip, skip + (take ?? 25));

    return {
        wageTaxOverview: {
            totalCount: filteredItems?.length,
            items: pagedItems,
        },
    };
};

export const GetWageTaxLegalEntity = (
    payload: LoadWageTaxRequestType
): WageTaxLegalEntityModelType => {
    const {
        employeeId,
        employeeName,
        employeeNumber,
        status,
        payGroupId,
        payGroupName,
        payPeriod,
        payPeriodSuffix,
        workState,
        exemptionName,
        exemptionType,
        fedWitholding,
        varianceFedWitholding,
        ltdWageWithholding,
        varianceLtdWageWithholding,
        totalWageWithholding,
        varianceTotalWageWithholding,
        fedSocSecEmployer,
        varianceFedSocSecEmployer,
        ltdWageSocSecEmployer,
        varianceLtdWageSocSecEmployer,
        totalWageSocSecEmployer,
        varianceTotalWageSocSecEmployer,
        fedSocSecEmployee,
        varianceFedSocSecEmployee,
        ltdWageSocSecEmployee,
        varianceLtdWageSocSecEmployee,
        totalWageSocSecEmployee,
        varianceTotalWageSocSecEmployee,
        fedFuta,
        varianceFedFuta,
        futaLtdWage,
        varianceFutaLtdWage,
        futaTotalWage,
        varianceFutaTotalWage,
        fedMedicareEmployer,
        varianceFedMedicareEmployer,
        ltdWageMedicareEmployer,
        varianceLtdWageMedicareEmployer,
        totalWageMedicareEmployer,
        varianceTotalWageMedicareEmployer,
        fedMedicareEmployee,
        varianceFedMedicareEmployee,
        ltdWageMedicareEE,
        varianceLtdWageMedicareEE,
        totalWageMedicareEmployee,
        varianceTotalWageMedicareEmployee,
    } = mockDataOptionsWageTaxLegalEntity;

    const filters = payload.filters;
    const take = payload?.pagingParams?.take ?? 0;
    const skip = payload?.pagingParams?.skip ?? 0;

    const searchTerm = filters
        ?.find(
            (x) =>
                x.field ===
                FilterModelSearchFields.DataEntry_SearchParameter_SearchTerm
        )
        ?.parameterValue?.value?.toLowerCase();

    const allItems = Array<WageTaxLegalEntityType>(TOTAL_COUNT)
        .fill({
            employeeId: null,
            employeeName: null,
            employeeNumber: null,
            status: null,
            payGroupId: null,
            payGroupName: null,
            payPeriod: null,
            payPeriodSuffix: null,
            workState: null,
            exemptionName: null,
            exemptionType: null,
            fedWitholding: null,
            varianceFedWitholding: null,
            ltdWageWithholding: null,
            varianceLtdWageWithholding: null,
            totalWageWithholding: null,
            varianceTotalWageWithholding: null,
            fedSocSecEmployer: null,
            varianceFedSocSecEmployer: null,
            ltdWageSocSecEmployer: null,
            varianceLtdWageSocSecEmployer: null,
            totalWageSocSecEmployer: null,
            varianceTotalWageSocSecEmployer: null,
            fedSocSecEmployee: null,
            varianceFedSocSecEmployee: null,
            ltdWageSocSecEmployee: null,
            varianceLtdWageSocSecEmployee: null,
            totalWageSocSecEmployee: null,
            varianceTotalWageSocSecEmployee: null,
            fedFuta: null,
            varianceFedFuta: null,
            futaLtdWage: null,
            varianceFutaLtdWage: null,
            futaTotalWage: null,
            varianceFutaTotalWage: null,
            fedMedicareEmployer: null,
            varianceFedMedicareEmployer: null,
            ltdWageMedicareEmployer: null,
            varianceLtdWageMedicareEmployer: null,
            totalWageMedicareEmployer: null,
            varianceTotalWageMedicareEmployer: null,
            fedMedicareEmployee: null,
            varianceFedMedicareEmployee: null,
            ltdWageMedicareEE: null,
            varianceLtdWageMedicareEE: null,
            totalWageMedicareEmployee: null,
            varianceTotalWageMedicareEmployee: null,
        })
        .map((_, idx) => {
            return {
                employeeId: employeeId[idx % employeeId.length],
                employeeName: employeeName[idx % employeeName.length],
                employeeNumber: employeeNumber[idx % employeeNumber.length],
                status: status[idx % status.length],
                payGroupId: payGroupId[idx % payGroupId.length],
                payGroupName: payGroupName[idx % payGroupName.length],
                payPeriod: payPeriod[idx % payPeriod.length],
                payPeriodSuffix: payPeriodSuffix[idx % payPeriodSuffix.length],
                workState: workState[idx % workState.length].slice(
                    0,
                    idx % workState[idx % workState.length].length || 2
                ),
                exemptionName: exemptionName[idx % exemptionName.length],
                exemptionType: exemptionType[idx % exemptionType.length],
                fedWitholding: fedWitholding[idx % fedWitholding.length],
                varianceFedWitholding:
                    varianceFedWitholding[idx % varianceFedWitholding.length],
                ltdWageWithholding:
                    ltdWageWithholding[idx % ltdWageWithholding.length],
                varianceLtdWageWithholding:
                    varianceLtdWageWithholding[
                        idx % varianceLtdWageWithholding.length
                    ],
                totalWageWithholding:
                    totalWageWithholding[idx % totalWageWithholding.length],
                varianceTotalWageWithholding:
                    varianceTotalWageWithholding[
                        idx % varianceTotalWageWithholding.length
                    ],
                fedSocSecEmployer:
                    fedSocSecEmployer[idx % fedSocSecEmployer.length],
                varianceFedSocSecEmployer:
                    varianceFedSocSecEmployer[
                        idx % varianceFedSocSecEmployer.length
                    ],
                ltdWageSocSecEmployer:
                    ltdWageSocSecEmployer[idx % ltdWageSocSecEmployer.length],
                varianceLtdWageSocSecEmployer:
                    varianceLtdWageSocSecEmployer[
                        idx % varianceLtdWageSocSecEmployer.length
                    ],
                totalWageSocSecEmployer:
                    totalWageSocSecEmployer[
                        idx % totalWageSocSecEmployer.length
                    ],
                varianceTotalWageSocSecEmployer:
                    varianceTotalWageSocSecEmployer[
                        idx % varianceTotalWageSocSecEmployer.length
                    ],
                fedSocSecEmployee:
                    fedSocSecEmployee[idx % fedSocSecEmployee.length],
                varianceFedSocSecEmployee:
                    varianceFedSocSecEmployee[
                        idx % varianceFedSocSecEmployee.length
                    ],
                ltdWageSocSecEmployee:
                    ltdWageSocSecEmployee[idx % ltdWageSocSecEmployee.length],
                varianceLtdWageSocSecEmployee:
                    varianceLtdWageSocSecEmployee[
                        idx % varianceLtdWageSocSecEmployee.length
                    ],
                totalWageSocSecEmployee:
                    totalWageSocSecEmployee[
                        idx % totalWageSocSecEmployee.length
                    ],
                varianceTotalWageSocSecEmployee:
                    varianceTotalWageSocSecEmployee[
                        idx % varianceTotalWageSocSecEmployee.length
                    ],
                fedFuta: fedFuta[idx % fedFuta.length],
                varianceFedFuta: varianceFedFuta[idx % varianceFedFuta.length],
                futaLtdWage: futaLtdWage[idx % futaLtdWage.length],
                varianceFutaLtdWage:
                    varianceFutaLtdWage[idx % varianceFutaLtdWage.length],
                futaTotalWage: futaTotalWage[idx % futaTotalWage.length],
                varianceFutaTotalWage:
                    varianceFutaTotalWage[idx % varianceFutaTotalWage.length],
                fedMedicareEmployer:
                    fedMedicareEmployer[idx % fedMedicareEmployer.length],
                varianceFedMedicareEmployer:
                    varianceFedMedicareEmployer[
                        idx % varianceFedMedicareEmployer.length
                    ],
                ltdWageMedicareEmployer:
                    ltdWageMedicareEmployer[
                        idx % ltdWageMedicareEmployer.length
                    ],
                varianceLtdWageMedicareEmployer:
                    varianceLtdWageMedicareEmployer[
                        idx % varianceLtdWageMedicareEmployer.length
                    ],
                totalWageMedicareEmployer:
                    totalWageMedicareEmployer[
                        idx % totalWageMedicareEmployer.length
                    ],
                varianceTotalWageMedicareEmployer:
                    varianceTotalWageMedicareEmployer[
                        idx % varianceTotalWageMedicareEmployer.length
                    ],
                fedMedicareEmployee:
                    fedMedicareEmployee[idx % fedMedicareEmployee.length],
                varianceFedMedicareEmployee:
                    varianceFedMedicareEmployee[
                        idx % varianceFedMedicareEmployee.length
                    ],
                ltdWageMedicareEE:
                    ltdWageMedicareEE[idx % ltdWageMedicareEE.length],
                varianceLtdWageMedicareEE:
                    varianceLtdWageMedicareEE[
                        idx % varianceLtdWageMedicareEE.length
                    ],
                totalWageMedicareEmployee:
                    totalWageMedicareEmployee[
                        idx % totalWageMedicareEmployee.length
                    ],
                varianceTotalWageMedicareEmployee:
                    varianceTotalWageMedicareEmployee[
                        idx % varianceTotalWageMedicareEmployee.length
                    ],
            };
        });

    const filteredItems = allItems?.filter(
        (item) =>
            !searchTerm ||
            item.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pagedItems = filteredItems?.slice(skip, skip + (take ?? 25));

    return {
        wageTaxLegalEntity: {
            totalCount: filteredItems?.length,
            items: pagedItems,
        },
    };
};

export const GetEmployeeWageTax = (
    payload: LoadWageTaxRequestType
): EmployeeWageTaxModelType => {
    const {
        taxName,
        dtsCode,
        exemption,
        prTaxAuthorityInstanceId,
        issue,
        workPsdCode,
        residentPsdCode,
        amount,
        varianceAmount,
        ltdWage,
        varianceLtdWage,
        totalWage,
        varianceTotalWage,
        otherWage,
        varianceOtherWage,
        payDate,
        legalEntity,
    } = mockDataOptionsEmployeeWageTax;

    const allItems = Array<EmployeeWageTaxType>(EMPLOYEE_WAGE_TAX_TOTAL_COUNT)
        .fill({
            taxName: null,
            dtsCode: null,
            exemption: null,
            prTaxAuthorityInstanceId: null,
            issue: null,
            workPsdCode: null,
            residentPsdCode: null,
            amount: null,
            varianceAmount: null,
            ltdWage: null,
            varianceLtdWage: null,
            totalWage: null,
            varianceTotalWage: null,
            otherWage: null,
            varianceOtherWage: null,
            payDate: null,
            legalEntityId: null,
            legalEntityName: null,
        })
        .map((_, idx) => {
            return {
                taxName: taxName[idx % taxName.length],
                dtsCode: dtsCode[idx % dtsCode.length],
                exemption: exemption[idx % exemption.length],
                prTaxAuthorityInstanceId:
                    prTaxAuthorityInstanceId[
                        idx % prTaxAuthorityInstanceId.length
                    ],
                issue: issue[idx % issue.length],
                workPsdCode: workPsdCode[idx % workPsdCode.length],
                residentPsdCode: residentPsdCode[idx % residentPsdCode.length],
                amount: amount[idx % amount.length],
                varianceAmount: varianceAmount[idx % varianceAmount.length],
                ltdWage: ltdWage[idx % ltdWage.length],
                varianceLtdWage: varianceLtdWage[idx % varianceLtdWage.length],
                totalWage: totalWage[idx % totalWage.length],
                varianceTotalWage:
                    varianceTotalWage[idx % varianceTotalWage.length],
                otherWage: otherWage[idx % otherWage.length],
                varianceOtherWage:
                    varianceOtherWage[idx % varianceOtherWage.length],
                payDate: payDate[idx % payDate.length],
                legalEntityId:
                    legalEntity[idx % legalEntity.length].legalEntityId,
                legalEntityName:
                    legalEntity[idx % legalEntity.length].legalEntityName,
            };
        });

    const filters = payload.filters;
    const legalEntityFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.LEGAL_ENTITY
    );

    const quarterFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.QUARTER
    );

    const viewByFilter = getFilterModelValueByFilterType(
        filters,
        FilterTypeEnum.VIEW_BY
    );

    const filteredItems = allItems?.filter(
        (item) =>
            !quarterFilter?.length ||
            quarterFilter[0] === getQuarter(new Date(item.payDate))
    );

    // View by YTD - Q2: would get the sum of Q1 and Q2 together
    // View by YTD - Q3: would get the sum of Q1, Q2 and Q3
    // View by YTD - Q4: would get the sum of Q1, Q2, Q3 and Q4 (Full YTD Accumulation)
    const filteredItemsByViewType =
        viewByFilter?.[0] === 'ytd'
            ? allItems?.filter(
                  (item) =>
                      Math.floor((new Date(item.payDate).getMonth() + 3) / 3) <=
                      parseInt(quarterFilter[0].slice(1))
              )
            : filteredItems;

    const filteredItemsByLegalEntity = filteredItemsByViewType?.filter(
        (item) =>
            !legalEntityFilter?.length ||
            legalEntityFilter[0] === item.legalEntityId
    );
    return {
        employeeWageTax: {
            totalCount: filteredItemsByLegalEntity?.length,
            items: filteredItemsByLegalEntity,
        },
    };
};

const getQuarter = (date: Date) => {
    return `Q${Math.floor((date.getMonth() + 3) / 3)}`;
};

export const GetEmployeeWageTaxLegalEntityFilterMockOptions =
    (): EmployeeWageTaxLegalEntityFilterResponseType => {
        return {
            totalCount: mockDataOptionsEmployeeWageTax.legalEntity.length,
            items: mockDataOptionsEmployeeWageTax.legalEntity,
        };
    };
