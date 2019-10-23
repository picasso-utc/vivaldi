export function formateToDjangoDate(date) {
    const day = ("0" + (date.getDate())).slice(-2);
    const month_number = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear();
    return year + "-" + month_number + "-" + day;
}

export function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}