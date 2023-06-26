export const handleChangeConditions = ({
  key, value, step, stepToUpdate,
}) => {
  stepToUpdate[step].value = value;
  return stepToUpdate;
};
