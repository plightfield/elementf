import { defineComponent, ref, renderSlot, watch } from "vue";
import { PromiseHandler } from "@/lib/cdk";
const Test = defineComponent({
  name: "test",
  setup() {
    const { data, loading, error, run } = PromiseHandler<Date, undefined>(
      wait,
      {
        loop: true,
        onSuccess: (res) => {
          console.log(res);
        },
        manual: true,
      }
    );
    run();
    return () => (
      <div>
        {data.value?.toString()}
        {loading.value + ""}
        {error.value}
      </div>
    );
  },
});

const wait = () =>
  new Promise<Date>((res) => {
    setTimeout(() => {
      res(new Date());
    }, 2000);
  });

export default defineComponent({
  name: "home",
  setup() {
    const show = ref(true);
    return () => (show.value ? <Test /> : null);
  },
});
