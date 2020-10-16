import { TreeNode, useTree, useTreeNode } from "@/lib/cdk/Tree";
import { defineComponent, onMounted, ref, watch } from "vue";

interface TestNode extends TreeNode {
  fuck: string;
}

const testChildren = defineComponent({
  name: "test",
  props: {
    index: { type: Number, default: 0 },
  },
  setup(props) {
    const treeNode = useTreeNode("test", props.index);
    watch(treeNode.currentList, console.log, { immediate: true });
    return () => <div>this is test {treeNode.currentNode.value?.fuck}</div>;
  },
});

export default defineComponent({
  name: "home",
  setup() {
    const tree = useTree<TestNode>("test", [
      { children: [{ fuck: "234" }], fuck: "shit" },
    ]);
    onMounted(() => {
      setTimeout(() => {
        tree.value[0].fuck = "fuck you";
        tree.value.push({ fuck: "shame on you" });
      }, 1000);
    });
    return () => (
      <div>
        {tree.value.map((_, index) => (
          <testChildren key={index} index={index} />
        ))}
      </div>
    );
  },
});
