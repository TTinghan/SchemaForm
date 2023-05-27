import { ElForm } from "element-ui/types/form";
import { ElFormItem } from "element-ui/types/form-item";
import { ElInput } from "element-ui/types/input";
import { ElOption } from "element-ui/types/option";
import { ElOptionGroup } from "element-ui/types/option-group";
import { ElRadio } from "element-ui/types/radio";
import { ElRadioGroup } from "element-ui/types/radio-group";
import { ElSelect } from "element-ui/types/select";
import { ElSlider } from "element-ui/types/slider";
import { ElSwitch } from "element-ui/types/switch";
import { ElDatePicker } from "element-ui/types/date-picker";
import { ElTimePicker } from "element-ui/types/time-picker";
import { ElCheckbox } from "element-ui/types/checkbox";
import { ElCheckboxGroup } from "element-ui/types/checkbox-group";
import Vue from "vue";
export declare type OBJECT = {
    [key: string]: any;
};
export interface evnetsObjType {
    [eventName: string]: (...args: any[] | any) => any;
}
declare type fnReturnBoolean = (data: OBJECT) => boolean;
export declare type OPTION_ITEM = {
    label: number | string;
    value: number | string;
    disabled?: boolean | fnReturnBoolean;
    slots?: string | OBJECT;
};
export declare type LABEL_PROPS = Partial<Omit<ElFormItem, 'resetField' | 'clearValidate'>> & {
    /**
     * 组件名称,例如 input,select,radio...
     */
    tag?: string;
    /**
     * 字段名称，默认应用于表单值,校验用的prop
     */
    field?: string;//没有field，将把label作为html展示
    show?: boolean | fnReturnBoolean;
    disabled?: boolean | fnReturnBoolean;
    dynamic?: boolean;
    /**
     * slots,传字符串代表 default
     *  {
     *    suffix: this.$createElement('xxx')
     *  }
     */
    slots?: string | OBJECT;
    /**
     * 事件
     */
    events?: evnetsObjType;
    options?: OPTION_ITEM[] | any // [(model: any) => OPTION_ITEM[] | undefined | ((model: any) => Promise<OPTION_ITEM[] | undefined>),string?][];  // 似乎无法识别这种类型...
    children?: LABEL_PROPS[];
    optionLabelFn?: any;
    watch?: watchItem[]
} & Partial<ElInput | ElOption | ElOptionGroup | ElRadio | ElRadioGroup | ElSelect | ElSlider | ElSwitch | ElDatePicker | ElTimePicker | ElCheckbox | ElCheckboxGroup | GroupItem>;
interface watchItem {
    key: string | Function;
    handler: Function;
    immediate?: boolean,
    deep?: boolean;
}
interface GroupItem {
    itemSize?: string; // gruopItem独有的
    formArr?: any;
}
export declare type JSON_FORM_PROP = Partial<Omit<ElForm, 'validate' | 'validateField' | 'resetFields' | 'clearValidate'>> & {
    data: OBJECT;
    customConfig: LABEL_PROPS[];
};
export declare function getFormProp(jsonField: JSON_FORM_PROP): OBJECT;
export declare function getLabelItemProp(jsonItemField: LABEL_PROPS): OBJECT;
export declare function generateChildren(object: OBJECT): LABEL_PROPS[];
export function install(vue: typeof Vue): void;

export class JsonForm extends Vue {
    validate: () => any | boolean
}
