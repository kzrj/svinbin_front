
export const toggleArray = (arr: Array<String>, string: string) => {
    if (arr.indexOf(string) === -1) {
      return [...arr, string]
    } else {
      return arr.filter(item => item !== string)
    }
  }

export const addItemToArray = (arr: Array<String>, string: string) => {
    return [...arr, string]
  }

export const removeItemFromArray = (arr: Array<String>, string: string) => {
    return arr.filter(item => item !== string)
}

export const uniq = a => [...new Set(a)]