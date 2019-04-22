import { getTypeList } from '@/services/api';

export default {
  namespace: 'type',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getTypeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
