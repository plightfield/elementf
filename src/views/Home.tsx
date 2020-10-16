import { defineComponent, renderSlot } from "vue";
import { PromiseHandler } from "@/lib/cdk";
const testChildren = defineComponent({
  name: "test",
  setup(props, ctx) {
    return () => <div>this is test{renderSlot(ctx.slots, "default")}</div>;
  },
});

const wait = () =>
  new Promise((res) => {
    setTimeout(() => {
      res(new Date());
    }, 2000);
  });

export default defineComponent({
  name: "home",
  setup() {
    const { data, loading, error } = PromiseHandler(wait, {
      debounce: 300,
      loop: true,
    });
    return () => (
      <div>
        {data}
        {loading}
        {error}
      </div>
    );
  },
});
