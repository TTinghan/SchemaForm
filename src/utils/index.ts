import { ElForm } from "element-ui/types/form"
import { ElFormItem } from "element-ui/types/form-item"
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


export type OBJECT = {
  [key: string]: any
}
export interface evnetsObjType {
  [eventName: string]: (...args: any[] | any) => any
}

type fnReturnBoolean = (data: OBJECT) => boolean;
export type OPTION_ITEM = {
  label: number | string;
  value: number | string;
  disabled?: boolean | fnReturnBoolean;
  slots?: string | OBJECT;
}

export type LABEL_PROPS = Partial<Omit<ElFormItem, 'resetField' | 'clearValidate'>> & {
  /**
   * 组件名称,例如 input,select,radio...
   */
  tag?: string;
  /**
   * 字段名称，默认应用于表单值,校验用的prop
   */
  field?: string,
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
  events?: evnetsObjType
  options?: OPTION_ITEM[],
  children?: LABEL_PROPS[]
} & Partial<ElInput | ElOption | ElOptionGroup | ElRadio | ElRadioGroup | ElSelect | ElSlider | ElSwitch | ElDatePicker | ElTimePicker | ElCheckbox | ElCheckboxGroup>

type TAG_TYPE = 'input' | 'option' | 'radio' | 'select' | 'slider' | 'switch' | 'date-picker' | 'time-picker' | 'checkbox'

export type JSON_FORM_PROP = Partial<Omit<ElForm, 'validate' | 'validateField' | 'resetFields' | 'clearValidate'>> & {
  data: OBJECT;
  customConfig?: LABEL_PROPS[];
}


const formProps = ["rules", "labelPosition", "labelWidth", "labelSuffix", "inline", "inlineMessage", "statusIcon", "showMessage", "size", "disabled", "validateOnRuleChange", "hideRequiredAsterisk"]

const labelProps = ["label", "labelWidth", "prop", "required", "rules", "error", "validateStatus", "for", "inlineMessage", "showMessage", "size"]

/**
 * 每个 item 排除这些属性，会单独处理
 */
const specialFields = ['show', 'disabled', 'slots', 'events']


export function getFormProp(jsonField: JSON_FORM_PROP) {
  const res: OBJECT = {};
  for (let i = 0; i < formProps.length; i++) {
    const curKey = formProps[i] as keyof JSON_FORM_PROP;
    if (Object.prototype.hasOwnProperty.call(jsonField, curKey) && jsonField[curKey] !== undefined) {
      res[curKey] = jsonField[curKey];
    }
  }
  return res;
}
export function getLabelItemProp(jsonItemField: LABEL_PROPS) {
  const res: OBJECT = {
    label: {},
    props: {}
  };
  for (const curKey in jsonItemField) {
    if (labelProps.includes(curKey)) {
      res.label[curKey] = jsonItemField[curKey as keyof LABEL_PROPS];
    } else if (!specialFields.includes(curKey)) {
      // key不在 LABEL_PROPS 里，也不在 specialFields 中，就是组件的props
      res.props[curKey] = jsonItemField[curKey as keyof LABEL_PROPS];
    }
  }
  return res;
}

const typeMapTag = {
  string: 'input',
  boolean: 'switch',
  number: 'number'
}

function arrayItemIsBaseType(arr: any[]) {
  const BASE_TYPE = ['[object Number]', '[object String]', '[object Null]', '[object Boolean]', '[object Undefined]']
  let res = true;
  for (let i = 0; i < arr.length; i++) {
    const curType = Object.prototype.toString.call(arr[i]);
    if (!BASE_TYPE.includes(curType)) {
      return false;
    }
  }
  return res;
}
function deepClone(target: any, key: string) {
  let result: LABEL_PROPS = {
    tag: 'input',
    field: '',
  };
  // 如果当前是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = {
        tag: 'array',
        field: key,
        children: []
      };
      if (arrayItemIsBaseType(target)) {
        // 如果数组的值是基本数据类型，渲染成select
        result = {
          tag: 'select',
          field: key,
          label: key
        }
      } else {
        for (let i in target) {
          // 递归克隆数组中的每一项
          result.children && result.children.push(deepClone(target[i], key))
        }
      }

      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target !== null || target !== undefined) {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {
        tag: 'object',
        field: key,
        children: []
      };
      for (let i in target) {
        result.children && result.children.push(deepClone(target[i], i))
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = {
      tag: typeMapTag[(typeof target) as keyof typeof typeMapTag],
      field: key,
      label: key
    };
  }
  // 返回最终结果
  return result as LABEL_PROPS;
}

export function generateChildren(object: OBJECT): LABEL_PROPS[] {
  const res = [];
  for (let key in object) {
    res.push(deepClone(object[key], key));
  }
  return res;
}

export function parseDefaultValue(obj: OBJECT) {
  const res: OBJECT = {};
  for (let key in obj) {
    let curVal = obj[key];
    if (Array.isArray(curVal)) {
      res[key] = [];
    } else if (typeof curVal === 'string') {
      res[key] = '';
    } else if (typeof curVal === 'boolean') {
      res[key] = false;
    } else if (typeof curVal === 'number') {
      res[key] = 0;
    } else if (typeof curVal === 'object' && curVal) {
      res[key] = parseDefaultValue(obj[key]);
    }
  }
  return res;
}