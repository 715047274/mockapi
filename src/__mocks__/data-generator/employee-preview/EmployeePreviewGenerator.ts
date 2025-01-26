import { createEmployeePreview } from './EmployeePreviewProvider';
import { writeFile } from 'fs/promises';

async function generatePagingPayRunPreview(
    payRunId: number,
    startIdx: number,
    pages: number,
    pageSize = 50000
) {
    const dir = 'generated-data';

    for (let page = 0; page < pages; page++) {
        const from = startIdx + page * pageSize;
        const pageNumber = startIdx + page;
        const previews = createEmployeePreview(
            from,
            from + pageSize - 1,
            payRunId
        );
        await writeFile(
            `./${dir}/payrun${payRunId}-page${pageNumber}.json`,
            JSON.stringify(previews)
        );
    }
}

generatePagingPayRunPreview(1, 1, 12);
// generatePagingPayRunPreview(2, 1, 11);
// generatePagingPayRunPreview(3, 1, 11);
