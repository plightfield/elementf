import { defineComponent, inject, provide, Ref, ref } from "vue";

/**
 * declare ref that will be attach in child
 *
 * @export
 * @param {string} token
 * @returns
 */
export function useChildRef(token: string = "cdk-child-ref") {
  // only html element supported
  const nodeRef = ref<HTMLElement | null>(null);
  provide(token, nodeRef);
  return nodeRef;
}

/**
 * attach ref to parent/ancestor
 *
 * @export
 * @param {string} token
 * @returns
 */
export function useAttachRef(token: string = "cdk-child-ref") {
  return inject(token, ref(null)) as Ref<HTMLElement | null>;
}
