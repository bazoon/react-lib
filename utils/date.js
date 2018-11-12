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
    },
    compareDatesWithoutTime: function (d1, d2) {
        let date1;
        let date2;

        if (typeof d1 === "string") {
            date1 = new Date(d1);
        } else {
            date1 = d1;
        }
        
        if (typeof d2 === "string") {
            date2 = new Date(d2);
        } else {
            date2 = d2;
        }

        const day1 = date1.getDate();
        const month1 = date1.getMonth();
        const year1 = date1.getFullYear();

        const day2 = date2.getDate();
        const month2 = date2.getMonth();
        const year2 = date2.getFullYear();

        return (day1 === day2) && (month1 === month2) && (year1 === year2);

    }
};
