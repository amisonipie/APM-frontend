import moment from "moment";
import { getFieldValue } from "utility/transformers";

/* eslint-disable multiline-ternary */
const layeredValue = ({ item }) => (item instanceof Array && item.isMulti
  ? item.value.map((val) => val.value)
  : item.value instanceof Array && item.single
    ? item.value.length > 0
      ? item.value[0]
      : ""
    : item.value instanceof Array
      ? item.value
      : item.value instanceof Object
        ? item.value.value
        : item.value);
export default layeredValue;

/* eslint-disable multiline-ternary */
const oneLayer = (item) => (item instanceof Array
  ? item.map((e) => (e?.value instanceof Object
    ? getFieldValue(e?.value?.value)
    : getFieldValue(e?.VALUE)
            || getFieldValue(e?.value)
            || e?._id
            || e?.Location
            || e?.slug
            || (e instanceof Date && moment(e).format("DD-MM-YYYY"))
            || e))
  : item instanceof Object
    ? item?.value instanceof Object
      ? getFieldValue(item?.value?.value)
      : getFieldValue(item?.value)
        || getFieldValue(item?.VALUE)
        || item?.role
        || item?.field
        || item?._id
        || item?.slug
        || (item instanceof Date && moment(item).format("DD-MM-YYYY"))
    : item instanceof Date
      ? moment(item).format("DD-MM-YYYY")
      : getFieldValue(item));

// PO -- plain object
export const PO = {
  oneLayer,
  multiLayer: layeredValue,
};
