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
        let html = '<div style="width: '+ this.width +';">';
        for ( let key in this.content ) {
            let value = this.content[key]
            html += `<p><label>${key}：</label>${value}</p>`;
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