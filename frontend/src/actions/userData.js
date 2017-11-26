import _ from 'lodash';
import moment from 'moment';
import { GET_USE_DATA_SUCCESS, RESIZE_ITEM, MOVE_ITEM } from './types';

export function getUserData(id) {
  return async (dispatch) => {
    const response = await fetch(`${process.env.ENDPOINT}/patient/${id}/`);
    const userData = await response.json();
    const tasks = userData.RelatedProjects[0].RelatedTasks;
    const items = tasks.map(t => ({
      id: t.id,
      group: 1,
      title: t.Description,
      start_time: moment(parseInt(t.StartDate, 10)),
      end_time: moment(parseInt(t.EndDate, 10)),
      canResize: 'both',
      canMove: true,
      image: `${process.env.ENDPOINT}${t.Image}`,
      itemTouchSendsClick: true,
    }));
    dispatch({
      type: GET_USE_DATA_SUCCESS,
      payload: {
        groups: [
          { id: 1, title: 'Tasks' },
        ],
        items: _.mapKeys(items, 'id'),
      },
    });
  };
}

export function resizeItem(id, time, edge) {
  return (dispatch, getState) => {
    const item = getState().userData.items[id];
    const newTime = edge === 'right' ? 'end_time' : 'start_time';
    const newItem = { ...item, [newTime]: time };
    dispatch({
      type: RESIZE_ITEM,
      payload: { [id]: newItem },
    });
  };
}

export function moveItem(id, startTime, groupId) {
  return (dispatch, getState) => {
    const item = getState().userData.items[id];
    const length = item.end_time - item.start_time;
    const group = getState().userData.groups[groupId];
    const newItem = {
      ...item, start_time: startTime, end_time: startTime + length, group: group.id,
    };
    dispatch({
      type: MOVE_ITEM,
      payload: { [id]: newItem },
    });
  };
}

