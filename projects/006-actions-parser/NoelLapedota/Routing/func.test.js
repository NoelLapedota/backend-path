callFirstApi = require('./func')
const fetch = require("node-fetch");

test('the data object contains success: true', () => {
    let url = user['actions'][0]['options']['url']
    return callFirstApi(url).then(data => {
      expect(data).toMatchObject({success: true});
    });
  })