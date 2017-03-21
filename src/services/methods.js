import { browserHistory } from 'react-router';

export function redirect(path) {
  browserHistory.push(path);
}
