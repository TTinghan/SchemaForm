<script>
import { isVNode } from "element-ui/src/utils/vdom";

export default {
  props: ["slotContent", "name"],
  render(h) {
    if (isVNode(this.slotContent)) {
      return this.slotContent;
    }
    if (typeof this.slotContent === "string") {
      return h("span", {}, this.slotContent);
    }
    return this.slotContent(h);
  },
};
</script>