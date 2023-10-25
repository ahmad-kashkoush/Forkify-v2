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

export const sendJson = async function (url, uploadData = undefined) {
    try {

        const response = uploadData ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
        }) : fetch(url);
        const res = await Promise.race([response, timeOut(TIMEOUT_SECONDS)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
        return data;
    } catch (err) {
        console.error(err);
        throw (err);
    }

}