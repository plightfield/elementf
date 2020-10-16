import { defineComponent } from "vue";

const testChildren = defineComponent({
  name: "test",
  setup(props) {
    return () => <div>this is test</div>;
  },
});

export default defineComponent({
  name: "home",
  setup() {
    return () => <div></div>;
  },
});
