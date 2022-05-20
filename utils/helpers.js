// HELPER FOR FORMATTING DATE, PLURALIZATION OF 'comment'
module.exports = {
    // format date function
    formatDate: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }
};