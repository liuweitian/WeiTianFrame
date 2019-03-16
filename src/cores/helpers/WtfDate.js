import moment from "moment/moment";
import 'moment/locale/zh-cn';

export default class WtfDate {

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
    static formatDateTime(dateTime, format) {
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
}