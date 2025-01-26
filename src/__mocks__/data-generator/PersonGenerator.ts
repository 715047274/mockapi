import { IdLabelType, getRandomStringFromSource } from './mock-util';

export function generatePersonName(): string {
    const firstName = getRandomStringFromSource(personFirstNameOptions);
    const lastName = getRandomStringFromSource(personLastNameOptions);
    return `${firstName} ${lastName}`;
}

export function generateEmployee(
    from: number,
    to: number
): Array<IdLabelType & { no: string }> {
    return Array(to - from + 1)
        .fill(null)
        .map((_, idx) => ({
            id: from + idx,
            label: generatePersonName(),
            no: `#${from + idx}`,
        }));
}

const personFirstNameOptions = [
    'Kai',
    'Eliana',
    'Jaden',
    'Ezra',
    'Luca',
    'Rowan',
    'Nova',
    'Amara',
    'Aaliyah',
    'Finn',
];

const personLastNameOptions = [
    'Nancy',
    'Andrew',
    'Janet',
    'Margaret',
    'Steven',
    'Michael',
    'Robert',
    'Laura',
    'Anne',
    'Nige',
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Martinez',
    'Wilson',
];
