import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "app",
  setup() {
    return () => <RouterView />;
  },
});
