export function formatTime (value) {
    let time = null;
    if (value != '' && value != null) {
        let hours = value.split(':')[0];
        let minutes = value.split(':')[1];
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        time = hours + ':' + minutes + ' ' + ampm;
    }
    return time;
}
export function formatCompletion (value) {
    return value ? '<i class="bi bi-check-circle"></i>' : ''; 
}
export function formatDate (value){
    let date = null;
    if (value != '' && value != null) {
        let years = value.split('-')[0];
        let month = value.split('-')[1];
        let days = value.split('-')[2];
        date = month + "/" + days + "/" + years;
    }
    return date;
}
export function formatMoney (value) {
    let money = null;
    if (value != '' && value != null) {
        money = "$" + value;
    }
    return money;
}
export function formatWord (value) {
    let word = null;
    if (value != '' && value != null) {
        word = value[0].toUpperCase() + value.substring(1).toLowerCase();
    }
    return word;
}