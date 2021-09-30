export const unreachable = (value: never): never => { throw new Error(`'${value}' should not have reached here`) }

export type PartialPick<T, K extends keyof T> = {
  [P in K]?: T[P]
}
