import { queryExecution, getExecution, createExecution, updateExecution, removeExecution, batchRemoveExecution, querySetList } from '@/services/api';

export default {
    namespace: 'execution',

    state: {
        data: {
            list: [],
            pagination: {},
        },
        setList: [],
        code: undefined,
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getExecution, payload);

            if (response.code === 2004) {
                yield put({
                    type: 'clear_list',
                    payload: response,
                });
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
            const response = yield call(createExecution, payload);

            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *remove({ payload, callback }, { call, put }) {
            const response = yield call(removeExecution, payload);

            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *batchRemove({ payload, callback }, { call, put }) {
            const response = yield call(batchRemoveExecution, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *update({ payload, callback }, { call, put }) {
            const response = yield call(updateExecution, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *getSetList({ payload }, { call, put }) {
            const response = yield call(querySetList, payload);
            yield put({
                type: 'save_set_list',
                payload: response,
            });
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

        clear_list(state, action) {
            return {
                ...state,
                code: action.payload.code,
                data: { list: [] },
            };
        },

        save_set_list(state, action) {
            return {
                ...state,
                setList: action.payload.data,
            }
        },
        
    },
}