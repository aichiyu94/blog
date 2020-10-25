
export function timeDiffer(hisTime) {
    if (!arguments.length) return '';
    var arg = arguments,
        now = arg[1] ? arg[1] : new Date().getTime(),
        diffValue = now - arg[0],
        result = '',

        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,

        _year = diffValue / year,
        _month = diffValue / month,
        _week = diffValue / (7 * day),
        _day = diffValue / day,
        _hour = diffValue / hour,
        _min = diffValue / minute;

    if (_year >= 1) result = parseInt(_year) + "年前";
    else if (_month >= 1) result = parseInt(_month) + "个月前";
    else if (_week >= 1) result = parseInt(_week) + "周前";
    else if (_day >= 1) result = parseInt(_day) + "天前";
    else if (_hour >= 1) result = parseInt(_hour) + "个小时前";
    else if (_min >= 1) result = parseInt(_min) + "分钟前";
    else result = "刚刚";
    return result;
}

export function timeFormat(time) {
    if (!arguments.length) return '';
    const theTime = new Date(time);
    const today = new Date();
    if (today.getFullYear() !== theTime.getFullYear())
        return `${theTime.getFullYear()}-${theTime.getMonth() + 1}-${theTime.getDate()}`
    else
        return `${theTime.getMonth() + 1}-${theTime.getDate()} ${theTime.getHours()}:${theTime.getMinutes()} `
}