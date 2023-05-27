<template>
  <el-checkbox
    v-if="options.length <= 1"
    :label="options[0].value"
    value="value"
    v-bind="$attrs"
    v-on="$listeners"
    >{{ options[0].label }}</el-checkbox
  >
  <el-checkbox-group v-else v-bind="$attrs" v-on="$listeners" :value="value">
    <el-checkbox
      v-for="optionItem in options"
      :label="optionItem.value"
      :key="optionItem.value"
      >{{ optionItem.label }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script>
export default {
  name: "JsonCheckox",
  inheritAttrs: false,
  props: ["options", "value"],
  created() {
    if (this.options.length > 1) {
      this.$emit("input", []);
    }
    this.$emit("inout", false);
  },
};
</script>

<style scoped>
</style>