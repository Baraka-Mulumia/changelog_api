import app from '../src/index';
// Import supertest and request from the module
import request from 'supertest';

describe('GET /', () => {
  it('should return 200 OK', async () => {
    return request(app).get('/').expect(200);
  });
});
