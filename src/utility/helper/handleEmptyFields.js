/* eslint-disable multiline-ternary */
const handleEmptyFields = ({ fields, finalValuestoSubmit }) => {
  let isEmpty = false;
  const emptyFields = fields
    .map(
      (item) => item.fields.filter(
        (field) => field.required
            && (finalValuestoSubmit[field.name] instanceof Array
              ? finalValuestoSubmit[field.name].length === 0
              : finalValuestoSubmit[field.name] instanceof Object
                ? finalValuestoSubmit[field.name].value === ""
                : finalValuestoSubmit[field.name] === ""),
      ).length,
    )
    .reduce((a, b) => a + b, 0);
  if (emptyFields) {
    isEmpty = true;
  }
  return isEmpty;
};
export default handleEmptyFields;
