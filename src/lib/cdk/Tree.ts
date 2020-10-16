import { computed, inject, InjectionKey, provide, ref, Ref } from "vue";
// this two composition function will bind data structure like
// [{children: [{children:..., value:...}], value:...},...]
// to components mapping structure using provide/inject with ref

/**
 * tree data with such formation
 * [{children?:..., ...}]
 *
 * @export
 * @interface TreeNode
 */
export interface TreeNode {
  children?: TreeNode[];
  [key: string]: any;
}

/**
 * provide with ref data in tree node list formation
 *
 * @export
 * @param {string} treeName
 * @param {Ref<TreeNode[]>} treeData
 */
export function useTree<T extends TreeNode>(treeName: string, treeData: T[]) {
  const _treeData = ref(treeData);
  // global data
  provide(treeName, _treeData);
  // current layer to 0
  provide(treeName + ".layer", 0);
  return _treeData;
}

/**
 * inject tree node with certain name
 *
 * @export
 * @param {string} treeName
 * @param {number} index
 * @returns
 */
export function useTreeNode<T extends TreeNode>(
  treeName: string,
  index: number
) {
  // current tree node list
  const currentList = inject(
    (treeName as any) as InjectionKey<Ref<T[]>>,
    ref([])
  );
  // current node
  const currentNode = computed(() => currentList.value[index]);
  // current children
  const currentChildList = computed(() => currentNode.value?.children || []);
  provide(treeName, currentChildList);
  provide(treeName + ".layer", inject(treeName + ".layer", 0) + 1);
  return { currentList, currentNode, currentChildList };
}
