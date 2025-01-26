import React, { FC } from 'react';

import { ProviderContainer } from '../src/App';
import { AppWithAccessCheck } from '../src/components/app/AppWithAccessCheck';

export const MockAppWithDefaultPayRun: FC<any> = () => {
    return <AppWithAccessCheck />;
};

export const MockApp: FC<any> = () => {
    return (
        <ProviderContainer>
            <MockAppWithDefaultPayRun />
        </ProviderContainer>
    );
};
