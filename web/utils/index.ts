export const isDev = (process.env.NEXT_PUBLIC_NODE_ENV || process.env.NODE_ENV) === 'development'

export function removeItemAtIndex(arr: any[], index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)]
}
