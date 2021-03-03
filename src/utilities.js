import moment from 'moment';

export function displayOrderStatus(statusCode) {
  let status = '';
  if (statusCode === 'C') {
    status = 'Completed';
  } else if (statusCode === 'A') {
    status = 'Active';
  } else {
    status = '';
  }

  return status;
}

export function displayRowClass(expectedTime, actualTime) {
  let className = '';
  const isBefore = moment(actualTime).isBefore(expectedTime);
  const isSame = moment(actualTime).isSame(expectedTime);
  const isAfter = moment(actualTime).isAfter(expectedTime);

  if (isBefore || isSame) {
    className = 'green';
  } else if (isAfter) {
    className = 'red';
  } else {
    className = '';
  }

  return className;
}
