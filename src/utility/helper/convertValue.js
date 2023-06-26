/* eslint-disable multiline-ternary */
const convertValue = ({ item, rowData }) => (item.type === "selection" && !item.isMulti
  ? { value: rowData[item?.name], label: rowData[item?.name] }
  : item.type === "number"
    ? parseInt(rowData[item?.name], 10)
    : !rowData[item?.name]
      ? ""
      : rowData[item?.name]);
export default convertValue;
