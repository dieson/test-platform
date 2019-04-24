import { getTypeList, createType, updateType, removeType } from '@/services/api';

export default {
  namespace: 'type',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getTypeList, payload);

      const result = {
        list: response.data,
        pagination: {
          total: response.data.total,
          pageSize: response.data.pageSize,
          current: response.data.current,
        },
      };

      yield put({
        type: 'save',
        payload: result,
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(createType, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeType, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateType, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  redurces: {
    save(state, action) {
      return {
        state,
        data: action.payload,
      };
    },
  },
};
