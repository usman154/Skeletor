import { RoleThings } from '../utilities/data/constants';

const Global = {
    getSelectedLocationId(req) {
        const { headers: { location } } = req;
        return location.split(' ')[1];
    },
    superAdmin(role_id) {
        if (role_id == RoleThings.SUPER_ADMIN_ROLE_ID) { // Super Admin Role Id
            return true;
        } else {
            return false;
        }
    },
    getDateDifference(days) {
        var date = new Date();
        var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        return last;
    },
    getValue: (o, s) => {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, ''); // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (o && typeof o === 'object') {
                if (k in o) {
                    o = o[k];
                } else {
                    return;
                }
            } else {
                o = 'N/A'
            }
        }
        return o;
    },
    formatDate(d, timeZone) {
        let date = new Date((typeof d === "string" ? new Date(d) : d).toLocaleString("en-US", { timeZone: timeZone })),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [month, day, year].join('/');
    },
    formatDateWithTime(d, timeZone) {
        let date = new Date((typeof d === "string" ? new Date(d) : d).toLocaleString("en-US", { timeZone: timeZone }));
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    },
    formatTime(d, timeZone) {
        let date = new Date((typeof d === "string" ? new Date(d) : d).toLocaleString("en-US", { timeZone: timeZone }));
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },
    getPagination(page, size, defaultSize = 30) {
        const limit = size ? +size : defaultSize;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    }
}

export default Global;