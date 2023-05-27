<template>
  <el-form :model="formModel" v-bind="formProps" ref="form" class="json-form">
    <template v-for="item in configChildren">
      <template v-if="item.tag === 'slot'">
        <slot :name="item.field" :model="formModel" />
      </template>
      <template v-else>
        <jsonFormItem
          :key="item.field"
          v-model="formModel[item.field]"
          v-bind="{ ...item, propPath: item.field }"
          v-on="handleEvents(item.events)"
        />
      </template>
    </template>
  </el-form>
</template>

<script>
import { generateChildren, getFormProp } from "../utils";
import jsonFormItem from "./jsonFormItem.vue";

export default {
  name: "JsonForm",
  props: ["formConfig"],
  inheritAttrs: false,
  components: {
    jsonFormItem,
  },
  data() {
    return {
      configChildren: [],
      formModel: {},
    };
  },
  computed: {
    formProps: {
      get() {
        return getFormProp(this.formConfig);
      },
    },
  },
  methods: {
    handleEvents(eventsObj) {
      const res = {};
      for (let key in eventsObj) {
        res[key] = eventsObj[key].bind(this);
      }
      return res;
    },
    mergeCustomConfig(defaultConfig, customConfig) {
      // TODO: 对配置格式校验，譬如 select,checkbox 必须有 options 配置项
      if (!customConfig || customConfig.length <= 0) {
        return defaultConfig;
      }
      const indexMapComp = {};
      const defaultKey = defaultConfig.map((item) => item.field);
      for (let i = 0; i < customConfig.length; i++) {
        const curConfig = customConfig[i];
        const defaultKeyIndex = defaultKey.indexOf(curConfig.field);
        if (defaultKeyIndex !== -1) {
          defaultConfig[defaultKeyIndex] = Object.assign(
            defaultConfig[defaultKeyIndex],
            curConfig
          );
        } else {
          indexMapComp[i] = curConfig;
        }
      }
      for (let i in indexMapComp) {
        defaultConfig.splice(i, 0, indexMapComp[i]);
      }
      return defaultConfig;
    },
    async validate() {
      await this.$refs.form.validate();
      return JSON.parse(JSON.stringify(this.formModel));
    },
    resetField() {
      return this.$refs.form.resetFields();
    },
    updateCofigChildren() {
      this.formModel = this.formConfig.data;
      const defaultConfig = generateChildren(this.formModel);
      this.configChildren = this.mergeCustomConfig(
        defaultConfig,
        this.formConfig.customConfig
      );
    },
  },
  watch: {
    formConfig: {
      handler(newValue) {
        this.updateCofigChildren();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>