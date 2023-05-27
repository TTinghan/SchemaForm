<template>
  <div id="wrap">
    <div class="flex-1">
      <JsonForm :formConfig="formProp">
        <template v-slot:showSlot>
          <el-form-item>
            <h3>12312</h3>
          </el-form-item>
        </template>
        <template v-slot:inputSlot="{ model }">
          <el-form-item label="inputSlot">
            <el-input v-model="model.inputSlot" v-if="model.bool"></el-input>
            <el-input-number v-model.number="model.inputSlot" v-else />
          </el-form-item>
        </template>
      </JsonForm>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";

import { JsonForm, JSON_FORM_PROP } from "../types";
type OPTION_ITEM = {
  label: number | string;
  value: number | string;
};
@Component
export default class App extends Vue {
  sArr = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
  ];
  formProp: JSON_FORM_PROP = {
    data: {
      input: JSON.parse(JSON.stringify([undefined, 1])),
      bool: false,
      select: "1",
    },
    customConfig: [
      {
        field: "input",
        slots: {
          prepend(h: CreateElement) {
            return h("span", {}, "http://");
          },
        },
        watch: [
          {
            key(model: any) {
              return model.select + model.input;
            },
            handler(this: Vue, n: any, o: any) {
              console.log(n, o);
              if (n === "123") {
                this.$emit("input", "456");
              }
            },
            // immediate: true,
          },
        ],
      },
      {
        field: "bool",
        tag: "switch",
      },
      {
        field: "select",
        tag: "select",
        options: [
          function (model: any) {
            console.log(model);
            return [];
          },
          function (model: any) {
            return model.input + model.bool;
          },
        ],
      },
      {
        field: 'showSlot',
        tag: "slot",
      },
      {
        field: "inputSlot",
        tag: "slot",
      },
    ],
    labelWidth: "150px",
    size: "small",
  };
  $refs!: {
    addField: JsonForm;
  };
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
#wrap {
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding: 10px 0;
  .flex-1 {
    flex: 1;
    overflow: auto;
    height: 100%;
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
    }
  }
  .right {
    height: 100%;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
    }
  }
}
</style>
