export type Constructor<T> = { new (): T };
export type ParametrizedConstructor<TArgs, T> = { new (args: TArgs): T };
