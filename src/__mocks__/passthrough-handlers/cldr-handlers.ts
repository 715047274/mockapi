import { DefaultBodyType, MockedRequest, rest, RestHandler } from 'msw';

import { defaultGlobalizationParams } from '@utils/LocalizationUtils';

import availableLocales from './jsons/availableLocales.json';
import plurals from './jsons/supplemental/plurals.json';
import likelySubtags from './jsons/supplemental/likelySubtags.json';
import timeData from './jsons/supplemental/timeData.json';
import weekData from './jsons/supplemental/weekData.json';
import currencyData from './jsons/supplemental/currencyData.json';
import numberingSystems from './jsons/supplemental/numberingSystems.json';
import cagregorian from './jsons/main/en/ca-gregorian.json';
import numbers from './jsons/main/en/numbers.json';
import currencies from './jsons/main/en/currencies.json';
import timeZoneNames from './jsons/main/en/timeZoneNames.json';
import dateFields from './jsons/main/en/dateFields.json';

const baseUrl = defaultGlobalizationParams.baseUrl;

const mainCldrMapping = {
    'ca-gregorian': cagregorian,
    numbers,
    currencies,
    timeZoneNames,
    dateFields,
};

const supplementalCldrMapping = {
    plurals,
    numberingSystems,
    likelySubtags,
    timeData,
    weekData,
    currencyData,
};

export const availableLocalesCldrHandlers: Array<
    RestHandler<MockedRequest<DefaultBodyType>>
> = ['availableLocales'].map((file) =>
    rest.get(`${baseUrl}/${file}.json`, (req, res, ctx) =>
        res(ctx.json(availableLocales))
    )
);

export const supplementalCldrHandlers = Object.keys(
    supplementalCldrMapping
).map((file) =>
    rest.get(`${baseUrl}/supplemental/${file}.json`, (req, res, ctx) =>
        res(ctx.json(supplementalCldrMapping[file]))
    )
);

export const mainCldrHandlers = Object.keys(mainCldrMapping).map((file) =>
    rest.get(`${baseUrl}/main/en/${file}.json`, (req, res, ctx) =>
        res(ctx.json(mainCldrMapping[file]))
    )
);
