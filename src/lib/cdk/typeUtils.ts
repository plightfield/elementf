import { InjectionKey } from "vue";

export function getTokenFromFunc<T>(func: (...args: any[]) => T, str?: string) {
  return str
    ? ((str as any) as InjectionKey<T>)
    : (Symbol() as InjectionKey<T>);
}
