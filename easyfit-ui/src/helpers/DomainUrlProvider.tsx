export function getAbsoluteDomainUrl() {
    if (window && "location" in window
        && "protocol" in window.location
        && "host" in window.location) {
        let url = window.location.protocol + "//" + window.location.host;
        return replacePortWith(url, "8080");
    }
}

export function getFinishWorkoutUrl() {
    return getAbsoluteDomainUrl() + '/workout';
}

function replacePortWith(url: string, port: string) {
    const regExp = /9090/gi;
    return url.replace(regExp, port);
}
