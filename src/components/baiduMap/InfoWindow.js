export class InfoWindow {
    constructor({ position, content, width, wtBaiduMap }) {
        this.content = content;

        this.position = position;

        this.width = width || '200px';

        this.wtBaiduMap = wtBaiduMap;
    }

    updateContent(key, value) {
        this.content[ key ] = value;
        this.close();

        this.wtBaiduMap.$nextTick(() => {
            this.open();
        });
    }

    getContent() {
        let html = '<div style="width: '+ this.width +'; margin: 0 auto;">';
        for ( let key in this.content ) {
            let value = this.content[key]
            html += `<div style="font-size: 14px; line-height: 1.5;"><label>${key}：</label>${value}</div>`;
        }
        html += '</div>';
        return html;
    }

    open() {
        this.wtBaiduMap.openInfoWindow( this );
    }

    close() {
        this.wtBaiduMap.closeInfoWindow();
    }
}
