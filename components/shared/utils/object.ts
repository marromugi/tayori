export const copyObj = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const isExistInArray = <T>(arr: T[], isExist: (value: T) => boolean) => {
  return arr.some((a) => isExist(a))
}

export const findInArray = <T>(
  arr: T[],
  isTarget: (value: T) => boolean
): T | null => {
  return isExistInArray(arr, isTarget)
    ? arr.filter((a) => isTarget(a))[0]
    : null
}
