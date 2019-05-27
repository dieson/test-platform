import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function fakeAccountLogin(params) {
  return request('/regression_test/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return request('/regression_test/user/logout');
}

export async function fakeRegister(params) {
  return request('/regression_test/user/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryCurrent() {
  return request('/regression_test/user/current_user');
}
