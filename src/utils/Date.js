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

export function calendarDate(date){
    var result = ("0" + (date.getDate())).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2);
    return result;
}

export function formateFromDjangoDate(date) {
    const splitted_date = date.split('-')
    const result = splitted_date[2] + "/" + splitted_date[1] + "/" + splitted_date[0];
    return result;
}

export function compareDjangoDate(d1, d2){
    // Renvoie true si d1 est plus récente que d2
    const splitted_d1 = d1.split('-');
    const splitted_d2 = d2.split('-');
    if (splitted_d1[0] > splitted_d2[0]) {
        return true;
    } else if (splitted_d1[0] < splitted_d2[0]) {
        return false;
    }
    if (splitted_d1[1] > splitted_d2[1]){
        return true
    } else if (splitted_d1[1] < splitted_d2[1]) {

    } 
    if (splitted_d1[2] >= splitted_d2[2]){
        return true
    }
    return false;
}

export function getCurrentDate(separator='-'){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}