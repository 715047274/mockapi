import { EntryIssueLevelEnum } from '@models/enums/EntryIssueEnum';

export const MAX_ISSUES_DISPLAYED_ON_ISSUES_CARD = 4;

export const issuesCardTabOrder = [
    EntryIssueLevelEnum.All,
    EntryIssueLevelEnum.Error,
    EntryIssueLevelEnum.Warning,
    EntryIssueLevelEnum.Information,
];

export const issuesCardTabProps = {
    [EntryIssueLevelEnum.All]: {
        title: 'TotalWithCount',
        tabId: 'IssuesTotal',
    },
    [EntryIssueLevelEnum.Error]: {
        title: 'ErrorsWithCount',
        tabId: 'IssuesError',
    },
    [EntryIssueLevelEnum.Warning]: {
        title: 'WarningsWithCount',
        tabId: 'IssuesWarning',
    },
    [EntryIssueLevelEnum.Information]: {
        title: 'InformationWithCount',
        tabId: 'IssuesInformation',
    },
};
