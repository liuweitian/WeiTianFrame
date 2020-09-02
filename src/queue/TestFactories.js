import BaseFactories from "./src/BaseFactories";
import WtDate from "../cores/helpers/WtDate";

export default class TestFactories extends BaseFactories {
    run() {
        console.log( WtDate.formatDateTime(new Date().getTime()) );

        super.run();
    }
}