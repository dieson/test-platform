import { queryTestCase, getTestCase, createTestCase, updateTestCase, removeTestCase, batchRemoveTestCase, querySetList, detailUploadTemplate } from '@/services/api';

export default {
    namespace: 'testcase',

    state: {
        data: {
            list: [],
            pagination: {},
        },
        setList: [],
        uploadTemplate: {},
        code: undefined,
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getTestCase, payload);
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
            const response = yield call(createTestCase, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *remove({ payload, callback }, { call, put }) {
            const response = yield call(removeTestCase, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *batchRemove({ payload, callback }, { call, put }) {
            const response = yield call(batchRemoveTestCase, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            if (callback) callback(response);
        },

        *update({ payload, callback }, { call, put }) {
            const response = yield call(updateTestCase, payload);
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

        *detailUploadTemplate({ payload }, { call, put }) {
            const response = yield call(detailUploadTemplate, payload);
            yield put({
                type: 'save_upload_template',
                payload: response,
            });
        }

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

        save_upload_template(state, action) {
            return {
                ...state,
                uploadTemplate: action.payload.data,
            }
        },

    },
};