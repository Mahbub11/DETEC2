export const filterReading = (data, type) => {
  let sortedData = [];
  let counter = 1;
  data.map((val) => {
    if (val.inner_type === type) {
        sortedData.push({ ...val, index: counter });
      ++counter;
    }
  });

  return sortedData
};


export const filterInteractiveReading = (data, type) => {
  let sortedData = [];
  let counter = 1;

  data.map((val) => {

    val.interactivereadings.map(item=>{
       if (item.inner_type === type) {
        sortedData.push({ ...item, index: counter });
      ++counter;
    }
    })
   
  });

  return sortedData
};
