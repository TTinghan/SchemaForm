import JsonForm from './components/JsonForm.vue'
import JsonFormItem from './components/jsonFormItem.vue'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(JsonForm.name, JsonForm)
  window.Vue.component(JsonFormItem.name, JsonFormItem);
}

const JSON_FORM = {
  key: JsonForm.name,
  install(Vue: any, CUSTOM_TAG_MAP: { [key: string]: string }) {
    const map = {
      checkbox: "json-checkbox",
      select: "json-select",
      radio: "json-radio",
      groupItem: "groupItem",
      number: "el-input-number",
      html: 'html'
    };
    Vue.mixin({
      provide: {
        CUSTOM_TAG_MAP: {
          ...map,
          ...CUSTOM_TAG_MAP
        }
      }
    })
    Vue.component(JsonForm.name, JsonForm);
    Vue.component(JsonFormItem.name, JsonFormItem);
  }
}
export default JSON_FORM