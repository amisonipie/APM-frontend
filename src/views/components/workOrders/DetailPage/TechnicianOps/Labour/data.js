import moment from "moment";

export const getLabourTime = (workOrder) => {
  let timer = new Date();
  const currentDate = moment(new Date());
  const started_at = moment(workOrder?.work_order_steps?.technician?.started_at);
  //   timer = currentDate - new Date(technician?.started_at);

  timer = moment.duration(currentDate?.diff(started_at));
  timer = {
    hours: timer.hours(),
    minutes: timer.minutes(),
  };
  return timer;
  // if(technician.started_at && !workOrder.solved_at) {
  //     $timer = new Date() - technician.started_at
  // }if(technician.started_at && workOrder.solved_at) {
  //     $timer = workOrder.solved_at - technician.started_at
  // }
};
