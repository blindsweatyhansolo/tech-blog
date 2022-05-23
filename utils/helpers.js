// HELPER FOR FORMATTING DATE, PLURALIZATION OF 'comment'
module.exports = {
    // format date function
    formatDate: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

    formatPlural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }

        return word;
    },

    auditTimestamp: (created_at, updated_at) => {
        if (created_at !== updated_at) {
            return true;
        }
    }
};