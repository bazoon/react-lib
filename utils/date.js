function addZero(n) {
    return n < 10 ? '0' + n : n;
}

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
    
];


export default {
    formatDate: function (d, format = "d.m.y") {
        if (!d) return "";
        let date;

        if (typeof d === "string") {
            date = new Date(d);
        } else {
            date = d;
        }

        const day = addZero(date.getDate());
        const month = addZero(date.getMonth() + 1);
        const year = date.getFullYear();
        return format.replace('d', day).replace('m', month).replace('y', year);
    },
    formatDateMonthYear: function (d) {
        if (!d) return "";
        let date;

        if (typeof d === "string") {
            date = new Date(d);
        } else {
            date = d;
        }
        
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${months[month]} ${year}`;
    }
};
