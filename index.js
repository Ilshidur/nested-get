function get(data, filter) {
    if (
        typeof filter === 'undefined' ||
        filter !== filter || // Check if NaN
        filter === null ||
        filter === '' ||
        Number(filter) === filter && filter % 1 !== 0 || // Check if filter is a float
        Number(filter) === filter && filter < 0
    ) {
        throw new Error('');    
    }
}

module.exports = get;
