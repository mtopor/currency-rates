import request, { Response } from 'supertest';
import app from './index';

describe('Post Endpoints', () => {
  it('should return OK response', async () => {
    const res: Response = await request(app)
      .get('/');
    expect(res.status).toBe(200);
  });

  it('should return 200 as date param is provided', async () => {
    const res: Response = await request(app)
      .get('/data')
      .query({ 'date': '05.04.2020' });
    expect(res.status).toBe(200);
  });

  it('should return 400 as date param is missing', async () => {
    const res: Response = await request(app)
      .get('/data');
    expect(res.status).toBe(400);
    expect(res.text).toBe('Date param is missing');
  });
});