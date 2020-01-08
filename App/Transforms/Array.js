  export function mergeAndReplace(
    oldArray = [],
    newArray,
    key = 'id',
    sortId,
    sortOrder,
    isDate = false,
  ) {
    const mergeArray = [...oldArray];
    newArray.forEach(newItem => {
      const index = mergeArray.findIndex(
        oldItem => oldItem[key] === newItem[key],
      );
      if (index >= 0) {
        mergeArray.splice(index, 1, newItem);
      } else {
        if (sortId) {
          if (mergeArray.length > 1) {
            if (
              mergeArray[0][sortId] < mergeArray[mergeArray.length - 1][sortId]
            ) {
              if (newItem[sortId] < mergeArray[0][sortId]) {
                mergeArray.unshift(newItem);
              } else {
                mergeArray.push(newItem);
              }
            } else {
              if (newItem[sortId] < mergeArray[0][sortId]) {
                mergeArray.push(newItem);
              } else {
                mergeArray.unshift(newItem);
              }
            }
          } else {
            mergeArray.push(newItem);
          }
        } else {
          if (mergeArray.length > 1) {
            if (mergeArray[0][key] < mergeArray[mergeArray.length - 1][key]) {
              if (newItem[key] < mergeArray[0][key]) {
                mergeArray.unshift(newItem);
              } else {
                mergeArray.push(newItem);
              }
            } else {
              if (newItem[key] < mergeArray[0][key]) {
                mergeArray.push(newItem);
              } else {
                mergeArray.unshift(newItem);
              }
            }
          } else {
            mergeArray.push(newItem);
          }
        }
      }
    });
    if (sortOrder && sortId) {
      mergeArray.sort(compareValues(sortId, sortOrder, isDate));
    }
    return mergeArray;
  }