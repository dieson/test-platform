import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/regression_test/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/regression_test/user/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function queryTypeList() {
  return request('/regression_test/type/list');
}

export async function getType(params) {
  return request('/regression_test/type/get', {
    method: 'POST',
    data: params,
  });
}

export async function createType(params) {
  return request('/regression_test/type/create', {
    method: 'POST',
    data: params,
  });
}

export async function updateType(params) {
  return request(`/regression_test/type/modify/${(params.typeId)}`, {
    method: 'PUT',
    data: {
      ...params.body,
    },
  });
}

export async function removeType(params) {
  return request(`/regression_test/type/delete/${(params.typeId)}`, {
    method: 'DELETE',
  });
}

export async function batchRemoveType(params) {
  return request('/regression_test/type/batch_delete', {
    method: 'POST',
    data: params,
  });
}

export async function getTypeDetail(typeId) {
  return request(`/regression_test/type/${typeId}`);
}

export async function querySetList() {
  return request('/regression_test/test_set/list');
}

export async function getSet(params) {
  return request('/regression_test/test_set/get', {
    method: 'POST',
    data: params,
  });
}

export async function createSet(params) {
  return request('/regression_test/test_set/create', {
    method: 'POST',
    data: params,
  });
}

export async function updateSet(params) {
  return request(`/regression_test/test_set/modify/${(params.setId)}`, {
    method: 'PUT',
    data: {
      ...params.body,
    },
  });
}

export async function removeSet(params) {
  return request(`/regression_test/test_set/delete/${(params.setId)}`, {
    method: 'DELETE',
  });
}

export async function batchRemoveSet(params) {
  return request('/regression_test/test_set/batch_delete', {
    method: 'POST',
    data: params,
  });
}

export async function getSetDetail(setId) {
  return request(`/regression_test/test_set/${setId}`);
}

export async function getTestCase(params) {
  return request('/regression_test/test_case/get', {
    method: 'POST',
    data: params,
  });
}

export async function queryUploadTemplate() {
  return request('/regression_test/upload_template/list');
}

export async function getUploadTemplate(params) {
  return request('/regression_test/upload_template/get', {
    method: 'POST',
    data: params,
  });
}

export async function createUploadTemplate(params) {
  return request('/regression_test/upload_template/create', {
    method: 'POST',
    data: params,
  });
}

export async function updateUploadTemplate(params) {
  return request(`/regression_test/upload_template/modify/${(params.id)}`, {
    method: 'PUT',
    data: {
      ...params.body,
    },
  });
}

export async function removeUploadTemplate(params) {
  return request(`/regression_test/upload_template/delete/${(params.id)}`, {
    method: 'DELETE',
  });
}

export async function batchRemoveUploadTemplate(params) {
  return request('/regression_test/upload_template/batch_delete', {
    method: 'POST',
    data: params,
  });
}

export async function queryInputTemplate() {
  return request('/regression_test/input_template/list');
}

export async function getInputTemplate(params) {
  return request('/regression_test/input_template/get', {
    method: 'POST',
    data: params,
  });
}

export async function createInputTemplate(params) {
  return request('/regression_test/input_template/create', {
    method: 'POST',
    data: params,
  });
}

export async function updateInputTemplate(params) {
  return request(`/regression_test/input_template/modify/${params.id}`, {
    method: 'PUT',
    data: {
      ...params.body,
    },
  });
}

export async function removeInputTemplate(params) {
  return request(`/regression_test/input_template/delete/${params.id}`, {
    method: 'DELETE',
    data: {
      ...params.body,
    },
  });
}

export async function batchRemoveInputTemplate(params) {
  return request('/regression_test/input_template/batch_delete', {
    method: 'POST',
    data: params,
  });
}