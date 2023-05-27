# API文档

## 基本配置
给JsonForm 组件传入 formConfig 配置项
```html
<JsonForm :formConfig="formConfig" />
```

### formConfig  
data必填,代表form中的model,会根据data字段自动生成基础表单配置
```js {2-4}
formConfig = {
  data: {
    name: ''
  }
}
```

### form  
可在与 data 的同级结构中声明 form 的属性,就是把elForm的属性声明成 key:value 的形式
```js {5}
formConfig = {
  data: {
    name: ''
  },
  labelWidth: '100px' // 这里声明的属性是针对整个表单的
}
```

## 自定义表单

### customConfig
customConfig 属性可选, 值是一个数组
```js {5-12}
formConfig = {
  data: {
    name: ''
  },
  customConfig: [
    {
      field: 'name',
      label: '姓名',
      placeholder: '请输入姓名',
      suffixIcon: 'el-icon-edit'
    }
  ]
}
```
|  参数名称   | 值  | 备注  |
|  ---- | ----  | --- |
| tag  | 字符串(input、switch、select、checkbox等等element-ui支持的组件) |
| field  | 字段名 | 表单中的唯一字段，根据这个值确定对应的表单的配置 |
| label | 表单项的label名称 | 若不声明，默认为data对象中的key |
| events | 组件的事件(目前不支持原生事件) | 参考element-ui中组件的Events |
| 其他字读 | element-ui中组件的属性，声明为 key:value 的形式即可 |

## 自定义组件
若需要在 json-form 中渲染自定义组件, 则需要在 Vue.use() 传入 一个配置项  
key 代表 customConfig 配置项的 tag , value 代表自定义组件的 name (需要将组件注册到全局)
在 customConfig 中的配置项会通过props传递给你的自定义组件
```js
import Vue from 'vue'
import JsonForm from 'json-form'
// 引入自己的组件，并注册到全局
import customTagCom from 'xxx.vue'
Vue.component('custom-tag-com',customTagCom)

Vue.use(JsonForm,{
  'customTag': 'custom-tag-com'
})
```