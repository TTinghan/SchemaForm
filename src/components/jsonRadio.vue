<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners" :value="value">
    <el-radio
      v-for="optionItem in options"
      :label="optionItem.value"
      :key="optionItem.label"
      :disabled="optionItem.disabled"
    >
      {{ optionItem.label }}
    </el-radio>
  </el-radio-group>
</template>

<script>

export default {
  name: "JsonRadio",
  inheritAttrs: false,
  props: ["options", "value"],
};
</script>

<style scoped>
</style>