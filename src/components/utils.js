
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


export const convertSowsByTours = (sowsByToursElemList) => {
  let outputDict = {};
  sowsByToursElemList.map((listElem) => {
    let columns = {};
    outputDict[listElem['tour']['id']] = columns;
    columns['count'] = listElem['count'];
    columns['checked'] = false;
    columns['rows'] = {};
    listElem['sows'].map(sowElem => {
      columns['rows'][sowElem['farm_id']] = {}
      columns['rows'][sowElem['farm_id']]['active'] = false
      columns['rows'][sowElem['farm_id']]['id'] = sowElem['id']
      columns['rows'][sowElem['farm_id']]['status'] = sowElem['status']
    });
  });
  return outputDict
}