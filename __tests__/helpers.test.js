const { formatDate } = require('../utils/helpers');

// test to re-format created_at date
test('formatDate() returns a clean date string', () => {
    const date = new Date('2022-05-20 12:12:12');

    expect(formatDate(date)).toBe('5/20/2022');
});