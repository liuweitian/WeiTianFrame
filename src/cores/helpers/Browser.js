export default class Browser {
    static isAndroid() {
        let u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    }

    static isIos() {
        let u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }

    static isWeChat() {
        let data = navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
        return Array.isArray( data ) && data[0] === "micromessenger";
    }

    static setTitle(title) {
        document.getElementsByTagName("title")[0].innerText = title;
    }

    static setFavicon(icon) {
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = icon;
        document.getElementsByTagName('head')[0].appendChild(link);
    }
}
