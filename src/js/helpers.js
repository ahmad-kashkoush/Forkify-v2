import { TIMEOUT_SECONDS } from "./config.js";
const timeOut = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request take too long! timeout after ${s}seconds`))
        }, s * 1000);
    });
}

export const getJson = async function (url, message = 'something went wrong') {
    try {
        const response = await Promise.race([fetch(url), timeOut(TIMEOUT_SECONDS)]);
        const data = await response.json();
        if (!response.ok)
            throw new Error(`${data.message} (${response.status})`)

        return data;
    } catch (err) {
        throw (err);
    }
}
