# json-form

[文档地址](https://jsonform.kproxy.corp.kuaishou.com/)  
## 使用方式
### 安装 
```
// 使用前请设置公司内部源
yarn add @ks-infra-fe/json-form
```   
### 注册为全局组件  
```js  
import Vue from 'vue'
import App from './App.vue'
import JsonForm from 'json-form'

Vue.use(JsonForm)
new Vue({
  render: h => h(App),
}).$mount('#app')
```  

## 示例  
```vue  
<template>
  <div id="app">
    <JsonForm :formConfig="formProp"/>
  </div>
</template>

<script lang="ts">
formProp = {
  "data": {
    "input": "",
    "showInputVal": true,
    "select": "",
    "checkBoxVal": "",
    "radioVal": "",
    "nums": ""
  },
  "customConfig": [
    {
      "tag": "button",
      "field": "submit",
      "slots": "提交"
    }
  ],
  "labelWidth": "150px",
  "size": "small",
  "required": true,
  "rules": {
    "input": [
      {
        "required": true
      }
    ]
  }
}
<script>
```  

## 典型应用

[稳定性平台 - 新建工作流 - 故障注入+流量模拟](https://kstable.corp.kuaishou.com/#/reinforced/guardian/new)
