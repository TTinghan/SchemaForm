<template>
  <div class="json-array-wrap">
    <template v-if="dynamic">
      <jsonFormItem
        v-for="(val, index) in value"
        :key="children[0].field + index"
        v-bind="children[0]"
        :propPath="propPath + '.' + index"
        v-model="value[index]"
        :dynamic="dynamic"
        :index="index"
        @addItem="handleAddItem"
        @delItem="handleDeleteItem"
        :rules="rules"
      >
      </jsonFormItem>
    </template>
    <template v-else>
      <jsonFormItem
        v-for="(child, index) in children"
        :key="child.field + index"
        v-bind="child"
        :propPath="propPath + '.' + index"
        v-model="value[index]"
        :rules="rules"
      >
      </jsonFormItem>
    </template>
  </div>
</template>

<script>
import { parseDefaultValue } from "../utils";
export default {
  name: "JsonArray",
  props: ["value", "children", "propPath", "field", "dynamic", "rules"],
  inheritAttrs:false,

  methods: {
    handleAddItem() {
      const item = parseDefaultValue(this.value[0]);
      this.value.push(item);
    },
    handleDeleteItem(index) {
      this.value.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>