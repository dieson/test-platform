import { queryInputTemplate, getInputTemplate, createInputTemplate, updateInputTemplate, removeInputTemplate, batchRemoveInputTemplate, queryTypeList } from '@/services/api';

export default {
    namespace: 'template',

    state: {
        data: {
            list: [],
            pagination: {},
        },
        typeList: [],
        code: undefined,
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getInputTemplate, payload);
            
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
            const response = yield call(createInputTemplate, payload);

            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *remove({ payload, callback }, { call, put }) {
            const response = yield call(removeInputTemplate, payload);

            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *batchRemove({ payload, callback }, { call, put }) {
            const response = yield call(batchRemoveInputTemplate, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *update({ payload, callback }, { call, put }) {
            const response = yield call(updateInputTemplate, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *getTypeList({ payload }, { call, put }) {
            const response = yield call(queryTypeList, payload);

            if (response.code === 1000) {
                yield put({
                    type: 'save_type_list',
                    payload: response,
                });
            }
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

        save_type_list(state, action) {
            return {
                ...state,
                typeList: action.payload.data,
            }
        },
    },
}