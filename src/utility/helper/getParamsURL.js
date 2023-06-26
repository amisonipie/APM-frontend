export function getPath(path) {
  const workOrderTypeUrlIncludes = path.split("/");
  const woType = workOrderTypeUrlIncludes.includes("work-orders")
    && workOrderTypeUrlIncludes[workOrderTypeUrlIncludes?.length - 1];
  return woType;
}
