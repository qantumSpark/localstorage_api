/**
 * Initialize a dataBase
 * @param {String} dataBaseName Name of the dataBase to create
 */
export function initDTB(dataBaseName) {
  window.localStorage.setItem(dataBaseName, '{}')
}

/**
 * Get all localStorage without distinction
 */
export function getAllDTB() {
  const storage = {...window.localStorage}  
  let res = Object.keys(storage).map(e => ({
    [e]: JSON.parse(storage[e])
  }))
  return res  
}

///////////////////////////////////////////////////////
// GET "ROUTES"
///////////////////////////////////////////////////////

/**
 * Get a collection
 * @param {String} dataBaseName Name of our database
 * @param {String} collectionName Name of the collection we are trying to retrieve
 * 
 */
export function getCollection(dataBaseName, collectionName) {
  return JSON.parse(window.localStorage.getItem(dataBaseName))[collectionName]
}

/**
 * Get Items in a collection
 * @param {String}  dataBaseName Name of the database
 * @param {String} collectionName Name of the collection containing the item
 * @param {Object} keyValuePair Key/Value pair for matching item ex: {key: "string", value: "string"}
 * @param {Boolean} all true/false || Default to false, will return the first item matching the query, if set to true will return all matching items in an array (always return an array)
 * 
 */
export function getItem(dataBaseName, collectionName, keyValuePair, all = false) {
  //Get the data from the localStorage key
  let res =JSON.parse(window.localStorage.getItem(dataBaseName))

  //If no key value pair is specified return the entire collection
  if (typeof(keyValuePair) === "undefined") return res[collectionName]
  //If keyvalue is not an object like expected
  if(typeof(keyValuePair) !== "object") console.error('getItem function Error! Expect an Object and found a :'+typeof(keyValuePair))
    
  //If all is good
  let {key, value} = keyValuePair
  let collection = res[collectionName]  
  let result = collection.filter(e => e[key] === value)
  //Issue a warning in the console, result will be an empty array
  if(result.length < 1) return console.log(`!WARNING! getItem(): Could not find the item: ||key=${key}|| of ||value=${value}||`)
  
  if(all) return result
  return result[0]
}

///////////////////////////////////////////////////////
// POST "ROUTES"
///////////////////////////////////////////////////////

/**
 * Post a new item in a collection, create the collection if doesn't exist
 * @param {String} dataBaseName Name of the database in witch the collection is stored
 * @param {String} collectionName Name of the collection in witch the item(s) should be stored
 * @param {Object} item Should be an object for single object, for multiple post use postManyItems()
 */
export function postItem(dataBaseName, collectionName, item) {
  let DTB = window.localStorage.getItem(dataBaseName)
  //If the dataBase doesn't exist
  if(DTB === null) return console.log('No DTB WITH THIS NAME')
  
  //If dataBase is empty
  if(DTB === '{}'){
    let obj = {
      [collectionName]: [item]
    }
    window.localStorage.setItem(dataBaseName, JSON.stringify(obj))
    return obj
  }

  let parsedDTB = JSON.parse(DTB)
  //console.log(parsedDTB[collectionName]);
  
  //If Collection doesn't exist
  if(parsedDTB[collectionName] === undefined){
    console.log(`No collection named: ${collectionName} found, creating a new collection...`)
    parsedDTB[collectionName] = [item]
    //console.log(parsedDTB);
    window.localStorage.setItem(dataBaseName, JSON.stringify(parsedDTB))
    return parsedDTB
  }
  //Database and collection exist , adding the item
  parsedDTB[collectionName].push(item)
  console.log(parsedDTB);
  window.localStorage.setItem(dataBaseName, JSON.stringify(parsedDTB))
  return item
  
}


//Post multiple item
export function postManyItems(dataBaseName, collectionName, items){
  if(items.length < 2) return console.error('!ERROR! postItems() : items is not an array')
  items.forEach(item => {
    postItem(dataBaseName, collectionName, item)
  })
  return items
}


///////////////////////////////////////////////////////
// UPDATE "ROUTES"
///////////////////////////////////////////////////////

//Update an item
export function updateItem(dataBaseName, collectionName, keyValuePair, newItem){
  let data = JSON.parse(window.localStorage.getItem(dataBaseName))[collectionName]
  console.log(data);
  data.forEach((el, i) => {
    if (el[keyValuePair.key] === keyValuePair.value){
      console.log(data [i]);
    }
  })
  // window.localStorage.setItem(dataBaseName, JSON.stringify(data))
  // return data
}


///////////////////////////////////////////////////////
// DELETE "ROUTES"
///////////////////////////////////////////////////////

//Delete a dtb
export function deleteDTB(dataBaseName) {
  window.localStorage.removeItem(dataBaseName)
}
//Delete a collection
export function deleteCollection(dataBaseName, collectionName) {
  let dtb = JSON.parse(window.localStorage.getItem(dataBaseName))
  console.log(dtb);
}
//Delete an item

//Delet multiple items



