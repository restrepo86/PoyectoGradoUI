export const filter = (data, searchText, props) => {
  return data
        .map((d) => convertPropertiesToLowerCase(props, d))
        .map((d) => JSON.stringify(d))
        .filter((d) => d.includes(searchText.toLowerCase()))
        .map((d) => JSON.parse(d))
        .map((d) => convertPropertiesToUpperCase(props, d));  
}

const convertPropertiesToLowerCase = (props, data) => {
  let lowerProps = {};
  props
  .forEach((p) => {
    lowerProps[p] = typeof data[p] === 'string' ? data[p].toLowerCase() : data[p]; 
  });
  return lowerProps;
}

const convertPropertiesToUpperCase = (props, data) => {
    let upperProps = {};
    props.forEach((p) => {
      upperProps[p] = typeof data[p] === 'string' ? data[p].toUpperCase() : data[p];
    });
    return upperProps;
}

export const formattedData =(data, prop) =>  data.map((d) => Object.assign(d, { key: d[prop] }));

export const getRowKey = record => record.key;

