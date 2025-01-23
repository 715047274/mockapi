import { ModuleEnum } from '@models/enums/ModuleEnum';
import { GetUrl } from '@utils/ApiUrlUtils';
import { fetchData } from '@api/common/FetchData';
import { IFeatureControlApi } from './IFeatureControlApi';

export const FeatureControlApi: IFeatureControlApi = {
    async getFeatures(): Promise<{
        userFeatures: string[];
        userFeatureOrderMap: Record<string, string[]>;
    }> {
        let usersFeatures;
        try {
            const response = await fetchData(
                GetUrl(ModuleEnum.GetFeatures),
                {
                    method: 'POST',
                },
                null
            );
            usersFeatures = await response.json();
        } catch {
            throw new Error('Feature access could not be retrieved.');
        }

        const intelligenceFeature = usersFeatures.UserFeatures.find(
            (feature) => feature.TargetObjectType === 'PayrollUIService'
        );
        const userPayrollFeatures =
            getFeatureAndChildrenRecursive(intelligenceFeature);
        const featureOrdersByParent =
            getFeatureSortingMapRecursive(intelligenceFeature);

        const employeeProfileFeature = getFeatureFromTree(
            usersFeatures.UserFeatures,
            [
                // grandparent, then parent, then the desired feature
                'DayforceApplicationContainer',
                'EmployeeProfile',
                'EmployeeProfile.ProfileMenu',
            ]
        );

        const pensionerContractorConfigFeature = getFeatureFromTree(
            usersFeatures.UserFeatures,
            ['PayrollAdmin', 'AllowPensionerContractorConfig']
        );

        const employeeConfidentialInfoFeature = getFeatureFromTree(
            usersFeatures.UserFeatures,
            [
                'DayforceApplicationContainer',
                'EmployeeProfile',
                'EmployeeProfile.ProfileMenu',
                'EmployeeProfile.Personal',
                'EmployeeProfile.PersonalContact.ConfidentialInformation',
            ]
        );

        return {
            userFeatureOrderMap: featureOrdersByParent,
            userFeatures: [
                ...userPayrollFeatures,
                employeeProfileFeature,
                pensionerContractorConfigFeature,
                employeeConfidentialInfoFeature,
            ].filter((feature) => !!feature),
        };
    },
};

function getFeatureAndChildrenRecursive(trunkFeature: {
    TargetObjectType: string;
    SubFeatures;
}): string[] {
    if (!trunkFeature) {
        return [];
    }
    const featureAndChildren = [trunkFeature.TargetObjectType];
    trunkFeature.SubFeatures?.forEach((child) => {
        const childrenResult = getFeatureAndChildrenRecursive(child);
        featureAndChildren.push(...childrenResult);
    });

    return featureAndChildren;
}

function getFeatureSortingMapRecursive(
    trunkFeature: { TargetObjectType: string; SubFeatures },
    featureOrdersByParent: Record<string, string[]> = {}
): Record<string, string[]> {
    if (!trunkFeature) {
        return {};
    }
    trunkFeature.SubFeatures?.forEach((child) => {
        getFeatureSortingMapRecursive(child, featureOrdersByParent);
    });
    if (trunkFeature.SubFeatures?.length > 1) {
        const childrenOrder = [];
        let assumedOrder =
            1 +
            Math.max(
                ...trunkFeature.SubFeatures?.map((child) => child.RoleSequence)
            );
        trunkFeature.SubFeatures?.forEach((child) => {
            childrenOrder.push({
                sortValue: child.RoleSequence ?? assumedOrder++,
                feature: child.TargetObjectType,
            });
        });
        featureOrdersByParent[trunkFeature.TargetObjectType] = childrenOrder
            .sort((a, b) => (a.sortValue > b.sortValue ? 1 : -1))
            .map((x) => x.feature);
    }
    return featureOrdersByParent;
}

function getFeatureFromTree(
    currentNodeFeatureList,
    featureLineage = []
): string | null {
    if (!currentNodeFeatureList || !featureLineage.length) {
        return null;
    } else if (featureLineage.length === 1) {
        return (
            currentNodeFeatureList.find(
                (feature) => feature.TargetObjectType === featureLineage[0]
            )?.TargetObjectType ?? null
        );
    } else {
        const nextNodeFeatureList = currentNodeFeatureList.find(
            (feature) => feature.TargetObjectType === featureLineage[0]
        )?.SubFeatures;
        return getFeatureFromTree(nextNodeFeatureList, featureLineage.slice(1));
    }
}
