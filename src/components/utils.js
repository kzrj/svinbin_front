import _ from 'lodash';

export const toggleArray = (arr: Array<String>, string: string) => {
    if (arr.indexOf(string) === -1) {
      return [...arr, string]
    } else {
      return arr.filter(item => item !== string)
    }
  }

export const lodashToggle = (array, item) => _.xor(array, [item])

export const toggleArrayLocations = (arr: Array<Object>, location: Object) => {
  let alreadyIn = false;
  let index = -1;
  for (var i = 0; i < arr.length; i++){
    if (_.isEqual(arr[i], location)){
      alreadyIn = true;
      index = i;
      break;
    }
  }

  if (alreadyIn){
    arr.splice(index, 1);
    return arr
  } else {
    return [...arr, location]
  }
}

export const addItemToArray = (arr: Array<String>, string: string) => {
    return [...arr, string]
  }

export const removeItemFromArray = (arr: Array<String>, string: string) => {
    return arr.filter(item => item !== string)
}

export const uniq = a => [...new Set(a)]


export const convertSowsByTours2 = (sowsByToursElemList) => {
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

export const convertSowsByTours = (sowsByToursElemList) => {
  let outputDict = {};
  sowsByToursElemList.map((listElem) => {
    let columns = {};
    outputDict[listElem['title']] = columns;
    columns['count'] = listElem['count'];
    columns['checked'] = false;
    columns['rows'] = {};
    listElem['sows'].map(sowElem => {
      columns['rows'][sowElem['id']] = {}
      columns['rows'][sowElem['id']]['active'] = false
      columns['rows'][sowElem['id']]['id'] = sowElem['id']
      columns['rows'][sowElem['id']]['status'] = sowElem['status']
      columns['rows'][sowElem['id']]['farm_id'] = sowElem['farm_id']
    });
  });
  return outputDict
}


export const getObjectbyId = (list, id) => {
  let obj = null
  list.map(element => {
    if (element['id'] == id)
      obj = element
  })
  return obj
}

export const getObjectInListbyFieldValue = (list, field, value) => {
  let obj = null
  list.map(element => {
    if (element[field] == value)
      obj = element
  })
  return obj
}

export const toggleArrayDictById= (arr: Array<Object>, obj: Object) => {
  let alreadyIn = false;
  let index = -1;

  for (var i = 0; i < arr.length; i++){
    if (arr[i].id === obj.id){
      alreadyIn = true;
      index = i;
      break;
    }
  }

  if (alreadyIn){
    arr.splice(index, 1);
    return arr
  } else {
    return [...arr, obj]
  }
}