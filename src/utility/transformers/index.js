import moment from "moment";
import { env } from "utility/config";
import { PO } from "utility/helper";

export const sortArray = (arr) => {
  const sortedArr = arr.sort((a, b) =>
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    new Date(b.created_at) - new Date(a.created_at));

  return sortedArr;
};

export const dataToSubmit = (payload) => {
  let data = {};
  const numberPattern = /\d+/g;
  Object.keys(payload).map((item) => {
    data = {
      ...data,
      [item]:
        item === "phone"
          ? Number(PO?.oneLayer(payload[item])?.match(numberPattern)?.join(""))
          : PO.oneLayer(payload[item]),
    };
  });
  return data;
};

export const splitData = (value, from, to) => value?.split(from)?.join(to);

export const getDate = (d, f) => moment(new Date(d)).format(f);

export const fiveRandomNumbers = (value, from, to) => Math.random().toString(36).substr(2, 6);

// Transformers
export const getJSONArrayUniqueElements = (array, uniqueField) => {
  let JAUE = array?.map((item) => item?.[uniqueField]) || [];
  JAUE = [...new Set(JAUE)];
  return JAUE;
};

export const getOptionObject = (item, value, label) => {
  if (item) {
    return {
      ...item,
      VALUE: item[value],
      LABEL: item[label],
    };
  }
  return item;
};

export const getSelectOptions = (e, custom) => {
  if (custom) {
    return (
      e?.map((item) => getOptionObject(item, custom?.value, custom?.label)) || []
    );
  }
  return Object.values(e || {});
};

export const getFileObj = (item) => {
  let itemName = splitData(item, env.AWS_BUCKET_URL, "");
  itemName = splitData(itemName, "%", " ");
  return {
    id: fiveRandomNumbers(),
    key: itemName,
    name: itemName,
    Location: item,
  };
};

export const getFileExtension = (fileName) => fileName.split(".")[fileName.split(".").length - 1];
export const removeSpaces = (value) => value.split(" ").join("");
// TR= transformers
export const TR = {
  dataToSubmit,
  splitData,
  getFileExtension,
  removeSpaces,
};

export const getFieldValue = (value) => (typeof value === "boolean" ? value : value?.toString());
