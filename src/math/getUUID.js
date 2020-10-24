/* eslint-disable no-bitwise */

/**
 * Taken from: https://stackoverflow.com/a/2117523
 */
const getUUID = function getUIdFunc() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, char =>
        (char ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (char / 4)))).toString(16));
};
/* eslint-enable no-bitwise */

export default getUUID;
