# 安装

- 设置镜像源 
- 安装
`npm install json-form` or `yarn add json-form`


::: demo 一个简单的例子
```html
<template>
  <div class="red-center-text">
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello Vue',
      formConfig: {
        data: {
          name: '',
          is18: true,
          banks: [{
            id: '',
            name: ''
          }]
        },
        customConfig: [
          {
            field: 'name',
            label: '姓名',
            placeholder: '请输入姓名'
          },
          {
            field: 'is18',
            label: '是否成年'
          },
          {
            field: "banks",
            tag: "array",
            dynamic: true,
            show(data) {
              return data.is18;
            },
            rules: {
              id: [{ required: true,message: '请输入银行卡号' }],
              name: [{ required: true,message: '请输入银行名称' }],
            },
            children: [
              {
                tag: "object",
                field: "银行卡信息",
                children: [
                  { tag: "input", field: "id", label: "银行卡号", placeholder: '请输入银行卡号'
                   },
                  { tag: "select", field: "name", label: "银行名称",placeholder: '银行名称',
                    options:[
                      {
                        label: '中国银行',
                        value: 'china-bank'
                      },
                      {
                        label: '工商银行',
                        value: 'ICBC'
                      }
                    ]
                  },
                ],
              },
            ],
          },
        ],
        labelWidth: '100px'
      }
    }
  }
}
</script>
```
:::