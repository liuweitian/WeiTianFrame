import Validater from "../validate/Validater";

export default class BaseModel {
    /**
     * 构造函数，实例化需要传入原始数据
     * @param {object} data
     */
    constructor(data = {}) {

        /**
         * 字典后缀
         * 从接口获取的原始数据中，可能会包含一些特殊值，比如创建人ID：create_id
         * 这些信息展示在页面中显然是不合适的
         * 我们约定接口中返回这类型的值同时给出“翻译”后的值，这些值以【原字段名 + 字典后缀】的形式返回
         * 比如: { create_id: 100, create_id_view: "张三"}
         * 这样就可以通过模型实例的getValue("create_id")方法获取正确的值
         * @type {string}
         */
        this.dataDictPostfix = '_view';

        /**
         * 原始数据，实例化传入并赋值，该数据是数据模型工作的基础
         * @type {Object}
         */
        this.data = data;

        /**
         * 数据格式化展示配置
         * 格式举例：
         *  {
         *      name:{
         *          label:"姓名",
         *      },
         *      age:{
         *          label:"年龄",
         *          value(model) {
         *              return model.data.age + "岁";
         *          }
         *      },
         *      sex:{
         *          label:"性别",
         *          value:{
         *              "0":"男",
         *              "1":"女"
         *          }
         *      }
         *  }
         *
         * 对于前端的业务场景，仅有原始数据是不够的，前端需要对不同的场景做各种各样的脏活来格式化
         * 该属性定义不同的字段的格式化配置
         * 场景1：
         *  年龄一般显示会带上单位岁，可在该字段下定义value方法，在方法中完成字符拼接，调用模型方法getValue获取
         * 场景2：
         *  有些字段具有映照关系，比如性别(0和1)，可在该字段下定义value={0:"男",1:"女"}，调用模型方法getValue获取
         * 优先级 ：场景一 > 场景二，详见模型方法getValue
         * @type {{}}
         */
        this.format = {};

        /**
         * 表单校验规则
         * 表单校验器在validate文件夹中，类名对应校验名
         * 举例：
         * [
         *      { attribute: "name", validate:"Required" }, // 必填
         *      { attribute: "age", validate:"Required" }, // 必填
         *      { attribute: "age", validate:"Number", options: { min:18 } }, // 数字，并且不能小于18
         *      { attribute: "sex", validate:"String", options: { list: [ "男","女" ] } }, // 字符串，必须是男或者女
         * ]
         * @type {{}}
         */
        this.rules = {};
    }

    /**
     * 根据rules校验字段
     * 如果不传入参数，则默认获取this.data
     * @param {object|undefined} data
     * return {{hasError, result}}
     */
    validate(data = undefined) {
        data = typeof data === 'object' ? data : this.data;
        return Validater.validate( data, this.rules );
    }

    /**
     * 根据view的配置获取值
     * @param {string} attr 字段名
     * @param {string} formatName 默认format
     * @param {object} options 字段名
     * @returns {*}
     */
    getValue(attr, formatName = 'format', options = {}) {
        let format = this[formatName];
        let value = this.data[attr];

        // 如果指定format配置的对应字段已经定义了getValue方法，则直接调用它
        if (typeof format[attr].value === 'function') {
            return format[attr].value({data: this.data, format: format, options: options});
        }
        // 如果指定format配置了dataDict,则读取它
        else if (typeof format[attr].value === 'object') {
            return format[attr].value[value];
        }
        // 如果原数据中已经定义原字段的字典映照字段，则读取它返回
        else if (this.data[attr + this.dataDictPostfix]) {
            return this.data[attr + this.dataDictPostfix];
        }

        return value;
    }

    /**
     * 设置全局消息
     * @param {string} text 消息内容
     * @param {string} type 消息类型
     * @param {number} duration 消息显示时长
     */
    static setTip(text, type = 'info', duration = 3000) {
        $vue.$store.commit('update', {target: $vue.$store.state.tip, data: {text: '读取用户信息成功'}});
    }
}