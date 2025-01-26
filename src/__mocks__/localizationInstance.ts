import { injectMessageParams } from '../src/utils/StringTranslationUtils';

const _labels = {};
const loadLabels = (labelsToAdd: { [key: string]: string }): void => {
    for (const [key, value] of Object.entries(labelsToAdd)) {
        _labels[key] = value;
    }
};
const getLabel = (key: string, params: string[]): string => {
    return injectMessageParams(_labels[key] || key, params);
};

const getCultureCode = (): string => 'en-US';
// return type for the real getCultureObject function is any
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getCultureObject = (): any => ({});

const parseNumberString = (str: string): number => {
    return parseFloat(str);
};

const formatNumber = (n: number, options: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat('en-US', options).format(n);
};

const formatCurrency = (n: number): string => {
    return new Intl.NumberFormat('en-US').format(n);
};

const formatters = {
    FORMAT_DATETIME_FULL: 'FORMAT_DATETIME_FULL',
    FORMAT_DATETIME_LONG: 'FORMAT_DATETIME_LONG',
    FORMAT_DATETIME_MEDIUM: 'FORMAT_DATETIME_MEDIUM',
    FORMAT_DATETIME_SHORT: 'FORMAT_DATETIME_SHORT',
    FORMAT_DATE_FULL: 'FORMAT_DATE_FULL',
    FORMAT_DATE_LONG: 'FORMAT_DATE_LONG',
    FORMAT_DATE_MEDIUM: 'FORMAT_DATE_MEDIUM',
    FORMAT_DATE_SHORT: 'FORMAT_DATE_SHORT',
    FORMAT_TIME_FULL: 'FORMAT_TIME_FULL',
    FORMAT_TIME_LONG: 'FORMAT_TIME_LONG',
    FORMAT_TIME_MEDIUM: 'FORMAT_TIME_MEDIUM',
    FORMAT_TIME_SHORT: 'FORMAT_TIME_SHORT',
};
const formatDate = (date: Date, format: keyof typeof formatters): string => {
    const isDate = format.toString().includes('DATE');
    const isTime = format.toString().includes('TIME');
    const pieces = [];
    if (isDate) {
        pieces.push(date.toLocaleDateString('en-US', { timeZone: 'GMT' }));
    }
    if (isTime) {
        pieces.push(date.toLocaleTimeString('en-US', { timeZone: 'GMT' }));
    }
    return pieces.join(', ');
};

export const mockLocalizationInstance: any = {
    loadLabels,
    getCultureCode,
    getCultureObject,
    getLabel,
    parseNumberString,
    formatNumber,
    formatCurrency,
    formatDate,
    ...formatters,
};
