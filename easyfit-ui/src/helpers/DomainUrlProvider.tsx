export function getAbsoluteDomainUrl() {
    if (window && "location" in window
        && "protocol" in window.location
        && "host" in window.location) {
        let url = window.location.protocol + "//" + window.location.host;
        return replacePortWith(url, "8080");
    }
}

export function getWorkoutUrl() {
    return getAbsoluteDomainUrl() + '/workout';
}

export function getExercisesUrl() {
    return getAbsoluteDomainUrl() + '/exercises';
}

function replacePortWith(url: string, port: string) {
    const regExp = /9090/gi;
    return url.replace(regExp, port);
}

