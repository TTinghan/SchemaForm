# 示例

## 一个例子
::: demo 一个简单的示例
```html
<template>
  <div>
    <JsonForm ref="jsonForm" :formConfig="formConfig" />
    <el-row style="margin-left:100px"><el-button @click="submit">提交</el-button></el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  },
  methods: {
    async submit(){
      // 校验成功返回表单数据
      const data = await this.$refs.jsonForm.validate();
      console.log(data);
    }
  }
}
</script>
```
:::

## 简单的输入框
::: demo 一个输入框, data是必须的，会根据data推导出默认的 label名称,组件类型
```html
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          name: '',
        },
        labelWidth: '100px'
      }
    }
  }
}
</script>
```
:::

## 多一点属性的输入框
::: demo 一个输入框, customConfig 是一个配置项的数组, field 字段为唯一标识，根据这个字段渲染对应的组件样式  
```html
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          name: '',
        },
        customConfig: [
          {
            field: 'name',
            label: '姓名',
            placeholder: '请输入姓名',
            suffixIcon: 'el-icon-edit'
          }
        ],
        labelWidth: '100px'
      }
    }
  }
}
</script>
```
:::

## 插入标题
注意！！！标题插入的位置是严格按照配置项在 customConfig 中的位置,因为默认配置是根据 data字段生成的，所以为了确保标题位置插入准确,请将所有配置项都写在 customConfig 中
::: demo
```html
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          name: '',
        },
        customConfig: [
          {
            tag: 'html',
            label: '<h3>这是一个标题</h3>'
          },
          {
            field: 'name',
            placeholder: 'enter name'
          }
        ],
        labelWidth: '100px'
      }
    }
  }
}
</script>
```
:::
## 布尔值
::: demo data中的布尔值会默认渲染成switch组件
```html
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          name: '',
          is18: false
        },
        customConfig: [
          {
            field: 'name',
            label: '姓名',
            placeholder: '请输入姓名',
            suffixIcon: 'el-icon-edit'
          },
          {
            field: 'is18',
            label: '是否成年'
          }
        ],
        labelWidth: '100px'
      }
    }
  }
}
</script>
```
:::

## 根据条件显示隐藏
::: demo 可在配置项中指定一个show方法,入参为data的值,返回一个布尔值来切换组件的显示/隐藏
```html
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          name: '',
          is18: true,
          bankId: ''
        },
        customConfig: [
          {
            field: 'name',
            label: '姓名',
            placeholder: '请输入姓名',
            suffixIcon: 'el-icon-edit'
          },
          {
            field: 'is18',
            label: '是否成年'
          },
          {
            field: 'bankId',
            label: '银行卡号',
            placeholder: '这个组件会根据是否成年显示/隐藏',
            show(data){
              return data.is18;
            }
          }
        ],
        labelWidth: '100px'
      }
    }
  }
}
</script>
```
:::

## 绑定事件
::: demo 可在配置项中指定 events 对象，在其中绑定事件(目前支持组件emit的事件)，this指向 jsonForm 组件
```html {22-26}
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
    <p>当前输入的值:{{ inputName }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputName: '',
      formConfig: {
        data: {
          name: '',
        },
        customConfig: [
          {
            field: 'name',
            label: '姓名',
            placeholder: '请输入姓名',
            suffixIcon: 'el-icon-edit',
            events: {
              input:(value) => {
                this.inputName = value
              }
            }
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

## select
在element-ui的select基础上做了封装
::: demo data中字符串类型的值默认会识别成 input 组件, 需在customConfig配置对象中,声明 tag 为 select
```html {16-17}
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          select: '',
        },
        customConfig: [
          {
            field: 'select',
            tag: 'select',
            label: '下拉输入',
            placeholder: '请选择一个选项',
            multiple: true,
            clearable: true,
            filterable: true,
            allowCreate: true,
            options: [
              {
                label: '选项一',
                value: '1'
              },
              {
                label: '选项二',
                value: '2'
              }
            ],
            events: {
              change(value){
                console.log('选择了:',value);
              }
            }
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

## select联动
有时候select需要根据表单中其他字段的变化，更新下拉选项 options接受传入一个数组，第一个元素为一个 Function，也可以是一个 Promise(比如接口请求), 第二个元素为要监听的data的key,如果是某个对象中的值,可以写成`xx.a`
::: demo 需要联动时必须传入一个数组(第一个元素为 Function/Promise ,必填),入参分别为 当前表单的model,监听值的newVal,监听值的oldVal
```html {41-62}
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          province: '',
          city: ''
        },
        customConfig: [
          {
            field: 'province',
            tag: 'select',
            label: '下拉输入',
            placeholder: '请选择一个选项',
            clearable: true,
            filterable: true,
            options: [
              {
                label: '山西',
                value: 'sx'
              },
              {
                label: '河北',
                value: 'hb'
              }
            ],
          },
          {
            field: 'city',
            tag: 'select',
            label: '下拉输入',
            placeholder: '请选择一个选项',
            clearable: true,
            filterable: true,
            options: [
              function(model,newVal,oldVal){
                this.$emit('input','') // 可以用这种形式清空选项，或者赋予默认值
                if(model.province === 'sx'){
                  return [
                    {
                      label: '太原市',
                      value: 'ty'
                    }
                  ]
                }
                if(model.province === 'hb'){
                  return [
                    {
                      label: '石家庄市',
                      value: 'sjz'
                    }
                  ]
                }
              },
              'province'
            ],
          }
        ],
        labelWidth: '100px'
      }
    }
  }
}
</script>
```
:::

## checkbox
::: demo data中字符串类型的值默认会识别成 input 组件, 需在customConfig配置对象中,声明 tag 为 checkbox
```html {16-17}
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          checkbox: '',
        },
        customConfig: [
          {
            field: 'checkbox',
            tag: 'checkbox',
            label: '多选',
            max: 1,
            options: [
              {
                label: '选项一',
                value: '1'
              },
              {
                label: '选项二',
                value: '2'
              }
            ],
            events: {
              change(value){
                console.log('选择了:',value);
              }
            }
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

## object
Object类型的配置字段比较繁琐，建议在jsonForm的configChildren字段中找到对应自动生成的配置，在此基础上修改
::: demo object类型的data对应的表单
```html
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          info: {
            name: '',
            age: 18
          },
        },
        customConfig: [
          {
            "tag": "object",
            "field": "info",
            "children": [
              {
                "tag": "input",
                "field": "name",
                "label": "姓名"
              },
              {
                "tag": "number",
                "field": "age",
                "label": "年龄"
              }
            ]
          }
        ],
        labelWidth: '100px'
      }
    }
  }
}
</script>
```
:::

## array
array通常嵌套object使用,dynamic 为 true，表单可动态增删
::: demo array类型的data对应的表单 
```html {23}
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          banks: [
            {
              id: '',
              name: ''
            }
          ]
        },
        customConfig: [
          {
            "tag": "array",
            "field": "banks",
            dynamic: true,
            "children": [
              {
                "tag": "object",
                "field": "banks",
                "children": [
                  {
                      "tag": "input",
                      "field": "id",
                      "label": "银行卡号",
                  },
                  {
                      "tag": "input",
                      "field": "name",
                      "label": "银行名称"
                  }
                ]
              }
            ]
          }
        ],
        labelWidth: '100px'
      }
    }
  }
}
</script>
```
:::

## 在表单项底部添加内容
在 slots 配置项中指定 bottomSlot
::: demo
```html {20-22,28-40}
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          input: "",
          boolVal: false,
        },
        customConfig: [
          {
            field: "input",
            required: true,
            slots: {
              bottomSlot(h) {
                return h("p", {}, "这是提示信息");
              }
            }
          },
          {
            field: "boolVal",
            slots: {
              bottomSlot(h) {
                return h(
                  "span",
                  {
                    style: "margin-left:10px",
                  },
                  [
                    h("i", { class: "el-icon-warning" }),
                    h("span", {}, "这是提示什么的"),
                  ]
                );
              }
            },
          }
        ],
        labelWidth: '100px'
      }
    }
  }
}
</script>
```
:::

## 自定义label
在 slots 配置项中指定 labelSlot
::: demo  
```html {18-32}
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          input: "",
        },
        customConfig: [
          {
            field: "input",
            slots: {
              labelSlot(h) {
                return h("span", {}, [
                  h("span", {}, "自定义label"),
                  h(
                    "el-tooltip",
                    {
                      props: {
                        content: "sss",
                        placement: 'top'
                      },
                    },
                    [h("i", { class: "el-icon-warning" }, null)]
                  ),
                ]);
              }
            }
          }
        ],
        labelWidth: 'auto'
      }
    }
  }
}
</script>
```
:::

## watch
在 slots 配置项中指定 watch 数组
::: demo  key必填,可以是字符串或一个函数
```html {20-38}
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          input: "",
          input2: ""
        },
        customConfig: [
          {
            field: "input",
            placeholder: '输入 123 会改变为 456',
            watch: [
              {
                key: "input",
                handler(n, o) {
                  if (n === "123") {
                    this.$emit("input", "456");
                  }
                },
                immediate: true,
              },
              {
                key(model){
                  // return this.elForm.model.input + this.elForm.model.input2; // 也可以用这种方式拿到model, this指向为当前的 json-form-item 实例
                  return model.input + model.input2;
                },
                handler(n, o) {
                  if (n === "1122") {
                    alert('监听多个值的组合')
                  }
                },
              }
            ],
          },
          {
            field: 'input2',
            placeholder: 'input输入11,input2输入22,会有alert',
          }
        ],
        labelWidth: 'auto'
      }
    }
  }
}
</script>
```
:::

## 自定义label
在 slots 配置项中指定 labelSlot
::: demo  
```html {18-32}
<template>
  <div>
    <JsonForm :formConfig="formConfig" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          input: "",
        },
        customConfig: [
          {
            field: "input",
            slots: {
              labelSlot(h) {
                return h("span", {}, [
                  h("span", {}, "自定义label"),
                  h(
                    "el-tooltip",
                    {
                      props: {
                        content: "sss",
                        placement: 'top'
                      },
                    },
                    [h("i", { class: "el-icon-warning" }, null)]
                  ),
                ]);
              }
            }
          }
        ],
        labelWidth: 'auto'
      }
    }
  }
}
</script>
```
:::

## 遇到不支持的功能怎么办?
使用slot
::: demo 
```html {4-10,28-31}
<template>
  <div>
    <JsonForm :formConfig="formConfig">
      <!-- 2-在此处使用slot(slot的顺序与配置项的顺序有关),model为当前表单的model -->
      <template v-slot:input="{ model }">
        <el-form-item label="切换bool">
          <el-input v-if="model.bool" v-model="model.input"/>
          <el-input-number v-else v-model="model.input"/>
        </el-form-item>
      </template>
    </JsonForm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formConfig: {
        data: {
          bool:false,
          input: "1"
        },
        customConfig: [
          {
            field: "bool",
            placeholder: '输入 123 会改变为 456',
          },
          {
            field: 'input',
            tag: "slot" // 1-先在配置项目中声明slot，slot的name为field字段的值
          }
        ],
        labelWidth: 'auto'
      }
    }
  }
}
</script>
```
:::