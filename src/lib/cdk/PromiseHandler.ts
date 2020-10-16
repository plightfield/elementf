import { isRef, onMounted, reactive, ref, unref, watch } from "vue";
import { debounce } from "lodash-es";

// T: result
// P: params
export type PromiseGenerator<T, P> = (params?: P) => Promise<T>;

/**
 * params config
 *
 * @export
 * @interface PromsieConfig
 * @template T response data
 * @template P promise config
 */
export interface PromsieConfig<T, P> {
  params?: P;
  manual?: boolean;
  debounce?: number;
  loop?: boolean;
  onSuccess?: (val: T) => void;
  onError?: (val: Error) => void;
  onFinish?: () => void;
}

/**
 * handle promise in reactive way
 *
 * @export
 * @template T response data
 * @template P promise config
 * @param {PromiseGenerator<T, P>} target
 * @param {PromsieConfig<T, P>} initConfig
 * @returns
 */
export default function <T, P>(
  target: PromiseGenerator<T, P>,
  initConfig: PromsieConfig<T, P>
) {
  if (isRef(initConfig)) throw new Error("params cannot be ref");
  // declare a config reactive value
  const config = reactive<PromsieConfig<T, P>>({
    params: initConfig.params || undefined,
    manual: initConfig.manual || false,
    debounce: initConfig.debounce || 0,
    loop: initConfig.loop || false,
    onSuccess: initConfig.onSuccess || function () {},
    onError: initConfig.onError || function () {},
    onFinish: initConfig.onFinish || function () {},
  });
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const data = ref<T | null>(null);
  const handlePromise = () => {
    loading.value = true;
    return target(config.params as any)
      .then((res) => {
        config.onSuccess!(res);
        config.onFinish!();
        data.value = res as any;
        loading.value = false;
      })
      .catch((err) => {
        config.onError!(err);
        config.onFinish!();
        loading.value = false;
        error.value = err;
      });
  };
  // run that promise
  const run = debounce(handlePromise, config.debounce);

  onMounted(() => {
    if (!config.manual) {
      run();
    }
  });

  // automatically run promise in loop
  watch(loading, (val, prev) => {
    if (prev === true && val === false) {
      if (config.loop && !config.manual) {
        run();
      }
    }
  });
  return { data, loading, error, config, run };
}
