<template>
  <div
    :class="[
      'el-form-item__content',
      'el-input',
      size ? 'el-input--' + size : '',
    ]"
  >
    <div
      class="el-input__inner groupFormItem"
      @blur.capture="handleBlur"
      @input="handleChange"
    >
      <template v-for="(form, index) in formArr">
        <template v-if="form.type === 'text'">
          <span class="tag subItem" :key="index" readonly>{{
            value[index]
          }}</span>
        </template>
        <template v-if="form.type === 'input'">
          <input
            class="subItem main"
            type="input"
            :placeholder="form.placeholder || '请输入内容'"
            :key="index"
            v-model="value[index]"
          />
        </template>
        <template v-if="form.type === 'number'">
          <el-input-number
            :size="size"
            :controls="false"
            class="subItem main"
            :placeholder="form.placeholder || '请输入内容'"
            :key="index"
            v-model="value[index]"
          />
        </template>
        <template v-if="form.type === 'select'">
          <el-select
            class="subItem select"
            :key="index"
            v-model="value[index]"
            placeholder="请选择"
            @change="handleChange"
          >
            <el-option
              v-for="item in form.options"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </template>
    </div>
    <span class="el-input__suffix" v-if="elForm.statusIcon">
      <span class="el-input__suffix-inner"></span>
      <i
        class="el-input__icon el-input__validateIcon el-icon-circle-close"
        v-show="validateState === 'error'"
      ></i>
      <i
        class="el-input__icon el-input__validateIcon el-icon-loading"
        v-show="validateState === 'validating'"
      ></i>
      <i
        class="el-input__icon el-input__validateIcon el-icon-circle-check"
        v-show="validateState === 'success'"
      ></i>
    </span>
  </div>
</template>

<script>
import emitter from "element-ui/src/mixins/emitter.js";

export default {
  name: "groupItem",
  props: ["formArr", "size", "value"],
  mixins: [emitter],
  inject: ["elForm"],
  inheritAttrs: false,
  data() {
    return {
      valueArr: [],
    };
  },
  computed: {
    validateState: {
      get() {
        return this.$parent.validateState;
      },
    },
  },
  watch: {
    formArr: {
      handler(value) {
        if (value) {
          const valueArr = value.map((item) => item.value);
          this.valueArr = valueArr;
          if (valueArr.join("")) {
            this.handleBlur();
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleBlur() {
      this.handleChange();
      this.dispatch("ElFormItem", "el.form.blur", [this.value.join("")]);
    },
    handleChange() {
      const result = [...this.value];
      this.$emit("input", result);
    },
  },
  created() {
    if (this.value instanceof Array) {
      this.valueArr = this.value.map((item) => {
        if (item === null) {
          return undefined;
        }
        return item;
      });
    } else {
      console.warn(
        "groupItem 组件传入的value必须是一个数组,和formArr的长度相同"
      );
    }
  },
};
</script>

<style lang="scss" scoped>
.el-input__inner {
  input {
    border: none;
    outline: none;
    height: 100%;
    box-sizing: border-box;
    padding: 0;
    background-color: transparent;
    &::placeholder {
      color: #c0c4cc;
    }
  }
  &.groupFormItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
    overflow: hidden;
    background-color: #f5f7fa;
    input {
      padding: 0 10px;
      background-color: white;
    }
    .tag {
      padding: 0 10px;
      background-color: #f5f7fa;
      color: #5d5d5d;
    }
    ::v-deep .el-select {
      .el-input .el-input__inner {
        background-color: #f5f7fa;
      }
      .el-input__validateIcon {
        display: none;
      }
      .el-input__inner {
        border: none;
      }
    }
    .main {
      flex: 1;
    }
    .subItem {
      &.main {
        &.el-input-number {
          ::v-deep .el-input__inner {
            text-align: left;
            border: none;
          }
        }
      }
    }
    .subItem:not(:first-child) {
      border-left: 1px solid #dcdfe6;
    }
    .subItem {
      &.select {
        .el-input .el-input__inner {
          background-color: #f5f7fa;
        }
      }
    }
  }
}
</style>
