# json-form

## 使用方式 
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
