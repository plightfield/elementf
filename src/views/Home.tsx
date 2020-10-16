import { defineComponent, renderSlot } from "vue";
const testChildren = defineComponent({
  name: "test",
  setup(props, ctx) {
    return () => <div>this is test{renderSlot(ctx.slots, "default")}</div>;
  },
});

export default defineComponent({
  name: "home",
  setup() {
    return () => <div></div>;
  },
});
