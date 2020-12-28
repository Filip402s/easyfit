export function getFormattedDate(date: Date) {
    const leftpad = (val: number, resultLength = 2, leftpadChar = '0') => {
        return (String(leftpadChar).repeat(resultLength)
            + String(val)).slice(String(val).length);
    }

    function getTime(date: Date) {
        return leftpad(date.getHours(), 2)
            + ':' + leftpad(date.getMinutes(), 2)
            + ':' + leftpad(date.getSeconds(), 2);
    }

    function getDate(date: Date) {
        return date.getFullYear()
            + '-' + leftpad(date.getMonth() + 1, 2)
            + '-' + leftpad(date.getDate(), 2);
    }

    return getTime(date);
    // return getDate(date) + ' ' + getTime(date);
}