const { formatDate, formatPlural, auditTimestamp } = require('../utils/helpers');

// test to re-format created_at date
test('formatDate() returns a clean date string', () => {
    const date = new Date('2022-05-20 12:12:12');

    expect(formatDate(date)).toBe('5/20/2022');
});

// test to pluralize words (comment)
test('formatPlural() returns pluralized string', () => {
    const word1 = formatPlural('Jedi', 1);
    const word2 = formatPlural('droid', 2);

    expect(word1).toBe('Jedi');
    expect(word2).toBe('droids');
});

test('auditTimestamp() returns (true) Boolean if updated', () => {
    const timestamp1 = '2022-05-23T23:39:22.000Z';
    const timestamp2 = '2022-05-23T23:50:22.000Z'
    const updatedContent = auditTimestamp(timestamp1 !== timestamp2);

    expect(updatedContent).toBe(true);
});