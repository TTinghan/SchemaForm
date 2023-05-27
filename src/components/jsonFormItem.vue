<template>
  <div class="json-form-item" v-if="tag !== 'html'">
    <template v-if="tag === 'array'">
      <json-array
        v-if="show"
        v-bind="compProp.props"
        v-model="value"
        :propPath="propPath"
        :field="field"
        :rules="rules"
      />
    </template>
    <template v-else-if="tag === 'object'">
      <json-object
        v-if="show"
        v-bind="compProp.props"
        v-model="value"
        :propPath="propPath"
        :rules="rules"
        @addItem="addProxy"
        @delItem="editProxy"
      />
    </template>
    <template v-else-if="tag !== 'html'">
      <el-form-item
        :label="label"
        :rules="rules"
        :prop="propPath"
        v-bind="compProp.label"
        v-if="show"
      >
        <template v-if="labelSlot" v-slot:label>
          <render-slot :slotContent="labelSlot" name="label" key="label" />
        </template>
        <component
          :is="componentTag"
          v-bind="compProp.props"
          v-on="$listeners"
          :value="value"
          :disabled="disabled"
          :propPath="field"
          :size="compProp.label.size || elForm.size"
        >
          <template v-for="slot in slots" v-slot:[slot.key]>
            <render-slot
              :slotContent="slot.value"
              :name="slot.key"
              :key="slot.key"
            />
          </template>
        </component>
        <template v-if="bottomSlot">
          <render-slot
            :slotContent="bottomSlot"
            name="bottomSlot"
            key="bottomSlot"
          />
        </template>
      </el-form-item>
    </template>
  </div>
  <div class="json-form-item" v-else v-html="label"></div>
</template>

<script>
import { getLabelItemProp } from "../utils";
import renderSlot from "./renderSlot.vue";

import jsonRadio from "./jsonRadio.vue";
import jsonCheckbox from "./jsonCheckbox.vue";
import jsonSelect from "./jsonSelect.vue";
import jsonObject from "./jsonObject.vue";
import jsonArray from "./jsonArray.vue";
import groupItem from "./groupItem.vue";

export default {
  name: "JsonFormItem",
  props: ["value", "propPath", "field", "tag", "rules", "label", "watch"],
  inject: ["elForm", "CUSTOM_TAG_MAP"],
  inheritAttrs: false,
  components: {
    jsonSelect,
    jsonCheckbox,
    jsonRadio,
    renderSlot,
    jsonArray,
    jsonObject,
    groupItem,
  },
  computed: {
    compProp: {
      get() {
        return getLabelItemProp(this.$attrs);
      },
    },
    show: {
      get() {
        const show = this.$attrs.show;
        const typeShow = typeof show;

        if (typeShow === "undefined") {
          return true;
        }
        return show(this.elForm.model);
      },
    },
    disabled: {
      get() {
        const disabled = this.$attrs.disabled;
        const typeDisabled = typeof disabled;

        if (typeDisabled === "undefined") {
          return false;
        }
        return disabled(this.elForm.model);
      },
    },
    componentTag: {
      get() {
        if (!this.tag) {
          return "input";
        }
        return this.CUSTOM_TAG_MAP[this.tag] || "el-" + this.tag;
      },
    },
    slots: {
      get() {
        const slot = this.$attrs.slots;
        const res = [];
        if (!slot) {
          return res;
        }
        if (typeof slot !== "object") {
          return [
            {
              key: "default",
              value: slot,
            },
          ];
        }
        for (const slotKey in slot) {
          if (slotKey === "bottomSlot") {
            this.bottomSlot = slot["bottomSlot"];
            continue;
          }
          if (slotKey === "labelSlot") {
            this.labelSlot = slot["labelSlot"];
            continue;
          }
          if (Object.prototype.hasOwnProperty.call(slot, slotKey)) {
            res.push({
              key: slotKey,
              value: slot[slotKey],
            });
          }
        }
        return res;
      },
    },
  },
  data() {
    return {
      bottomSlot: null,
      labelSlot: null,
    };
  },
  methods: {
    addProxy(...args) {
      this.$emit("addItem", ...args);
    },
    editProxy(...args) {
      this.$emit("delItem", ...args);
    },
    handleAddWatcher() {
      this.watch &&
        this.watch.forEach((watchConfig) => {
          const { key, handler, immediate, deep } = watchConfig;
          if (!key) {
            throw new Error("watch必须指定key");
          }
          const _key =
            typeof key === "string"
              ? "elForm.model." + key
              : key.bind(this, this.elForm.model);
          this.$watch(_key, handler, {
            immediate,
            deep,
          });
        });
    },
  },
  created() {
    this.handleAddWatcher();
  },
};
</script>

<style lang="scss">
.el-form--inline .json-form-item {
  display: inline-block;
}
</style>