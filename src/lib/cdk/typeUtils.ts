import { InjectionKey } from "vue";

export function getTokenFromFunc<T>(func: (...args: any[]) => T, str?: string) {
  return (str ? str : Symbol()) as InjectionKey<T>;
}

export function getTokenFromClass<T>(
  constructor: { new (...args: any[]): T },
  str?: string
) {
  return (str ? str : Symbol()) as InjectionKey<T>;
}
