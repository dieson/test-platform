import { batchRemoveType, getType, createType, updateType, removeType } from '@/services/api';

export default {
    namespace: 'type',

    state: {
        data: {
            list: [],
            pagination: {},
        },
        code: undefined,
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getType, payload);
            
            if (response.code === 2004) {
                
                yield put({
                    type: 'clear_list',
                    payload: response,
                })
            } else {
                const result = {
                    code: response.code,
                    data: {
                        list: response.data.list,
                        pagination: {
                            total: response.data.total,
                            pageSize: response.data.pageSize,
                            currentPage: response.data.currentPage,
                        },
                    },
                };

                yield put({
                    type: 'save',
                    payload: result,
                });
            }
        },

        *add({ payload, callback }, { call, put }) {
            const response = yield call(createType, payload);

            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *remove({ payload, callback }, { call, put }) {

            const response = yield call(removeType, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *bacthRemove({ payload, callback }, { call, put }) {

            const response = yield call(batchRemoveType, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *update({ payload, callback }, { call, put }) {
            const response = yield call(updateType, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload.data,
                code: action.payload.code,
            };
        },

        clear_list(state, payload) {
            return {
                ...state,
                code: payload.code,
                data: { list: [] },
            };
        },

    },
};
