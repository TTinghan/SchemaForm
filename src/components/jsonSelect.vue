<template>
  <el-select
    v-bind="$attrs"
    :value="value"
    v-on="$listeners"
    class="json-select"
    :loading="optionLoading"
  >
    <el-option
      v-for="(item, index) in optionsList"
      :key="index"
      :label="item.label"
      :value="item.value"
    >
      {{ optionLabelFn ? optionLabelFn(item) : item.label }}
    </el-option>
  </el-select>
</template>

<script>
import optionsMixin from "../mixins/optionsMixin";

export default {
  name: "JsonSelect",
  inheritAttrs: false,
  props: {
    options: {
      require: false,
      default: () => [],
    },
    value: {
      require: false,
      default: String,
    },
    optionLabelFn: {
      require: false,
      default: null,
    },
  },
  mixins: [optionsMixin],
  data() {
    return {
      optionsList: [],
    };
  },
};
</script>

<style scoped>
.json-select {
  width: 100%;
}
</style>