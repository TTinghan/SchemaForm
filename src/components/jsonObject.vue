<template>
  <div class="json-object-wrap">
    <div v-show="dynamic" class="option">
      <span
        class="el-form-item__label"
        :style="{ width: labelWidth, textAlign: labelPosition }"
        >{{ $parent.field }}</span
      >
      <div class="btn-area">
        <el-button
          icon="el-icon-plus"
          round
          size="mini"
          @click="handleAddItem"
        ></el-button>
        <el-button
          v-show="index > 0"
          icon="el-icon-delete"
          round
          type="danger"
          size="mini"
          @click="handleDeleteItem(index)"
        ></el-button>
      </div>
    </div>
    <jsonFormItem
      v-for="child in children"
      :key="child.field"
      v-bind="child"
      :propPath="propPath + '.' + child.field"
      v-model="value[child.field]"
      :rules="rules && rules[child.field]"
    >
    </jsonFormItem>
  </div>
</template>

<script>

export default {
  name: "JsonObject",
  props: ["value", "children", "propPath", "dynamic", "index", "rules"],
  inject: ["elForm"],
  inheritAttrs: false,
  computed: {
    labelWidth: {
      get() {
        return this.elForm.labelWidth;
      },
    },
    labelPosition: {
      get() {
        return this.elForm.labelPosition || "right";
      },
    },
  },
  methods: {
    handleAddItem() {
      this.$emit("addItem");
    },
    handleDeleteItem(index) {
      this.$emit("delItem", index);
    },
  },
};
</script>


<style scoped>
.option {
  overflow: auto;
  padding: 4px;
}
.option .label {
  display: inline-block;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.option .btn-area {
  float: right;
}
</style>