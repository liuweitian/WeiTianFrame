import moment from "moment/moment";
import 'moment/locale/zh-cn';

export default class WtDate {

    /**
     * 将时间格式化成距离当前的时间
     * @param {string} dateTime
     * @returns {string}
     */
    static fromNow (dateTime) {
        let date = moment(dateTime);
        return date.fromNow();
    }

    /**
     * 格式化日期时间
     * @param {string} dateTime
     * @param {string} format
     */
    static formatDateTime(dateTime, format = 'Y-m-d H:i:s') {
        let date = null;
        if( dateTime ) {
            date = moment(dateTime);
        } else {
            date = moment();
        }
        let year = date.year();
        let month = date.month() + 1;
        let day = date.date();
        let hour = date.hour();
        let minute = date.minute();
        let second = date.second();

        month = month <= 9 ? "0"+month : month;
        day = day <= 9 ? "0"+day : day;
        hour = hour <= 9 ? "0"+hour : hour;
        minute = minute <= 9 ? "0"+minute : minute;
        second = second <= 9 ? "0"+second : second;
        return format.replace('Y', year)
            .replace('m', month)
            .replace('d', day)
            .replace('H', hour)
            .replace('i', minute)
            .replace('s', second);
    }

    /**
     * 格式化秒数
     * @param {int} second
     * @param {string} format 格式化
     * @returns {string}
     */
    static formatSecond(second, format = 'H:i:s') {
        second = parseInt(second);
        let hours, mins, seconds, days;

        seconds = this.addZero( parseInt(second % 60) );
        mins = this.addZero( parseInt(second % 3600 / 60) );
        hours = this.addZero( parseInt(second / 3600) );
        days = parseInt( second / 86400 );

        format = format.replace('d', days);
        format = format.replace('H', hours);
        format = format.replace('i', mins);
        format = format.replace('s', seconds);

        return format;
    }

    //补零
    static addZero(str) {
        return new RegExp(/^\d$/g).test(str) ? `0${str}` : str;
    }
}
