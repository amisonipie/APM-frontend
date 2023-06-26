export const handleVisibility = ({ types, activeUser }) => {
  let show = false;
  if (!activeUser.isLoading && types.includes(activeUser.userRole)) {
    // if (types.includes(activeUser.userRole)) {
    show = true;
  }
  return show;
};
