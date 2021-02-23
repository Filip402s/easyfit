export function getFormattedDateTime(date: Date) {
    return getFormattedDate(date) + " at " + getFormattedTime(date);
}

export function getFormattedTime(date: Date) {
    return leftpad(date.getHours(), 2)
        + ':' + leftpad(date.getMinutes(), 2)
        + ':' + leftpad(date.getSeconds(), 2);
}

export function getFormattedDate(date: Date) {
    return date.getFullYear()
        + '-' + leftpad(date.getMonth() + 1, 2)
        + '-' + leftpad(date.getDate(), 2);
}

function leftpad(val: number, resultLength = 2, leftpadChar = '0') {
    return (String(leftpadChar).repeat(resultLength)
        + String(val)).slice(String(val).length);
}
