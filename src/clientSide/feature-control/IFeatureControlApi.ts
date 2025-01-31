export interface IFeatureControlApi {
    getFeatures(): Promise<{
        userFeatures: string[];
        userFeatureOrderMap: Record<string, string[]>;
    }>;
}
