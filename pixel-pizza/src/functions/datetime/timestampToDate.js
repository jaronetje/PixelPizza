'use strict';

/**
 * Changes a timestamp into a date string in dd-mm-YYYY format
 * @param {number} [timestamp] The amount of seconds from 1970-01-01 00:00:00
 * @param {boolean} [addFormat] If an explanation of the format should be appended
 * @returns {string} The date as a string (dd-mm-YYYY)
 */
const timestampToDate = (timestamp = 0, addFormat = true) => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}${addFormat ? " (dd-mm-YYYY)" : ""}`;
}

module.exports = timestampToDate;