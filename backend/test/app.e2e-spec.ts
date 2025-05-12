import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Unauthenticated Access', () => {
    it('/auth/welcome (GET) should return 401 when unauthenticated', async () => {
      await request(app.getHttpServer())
        .get('/auth/welcome')
        .expect(401);
    });
  });

  // Register Test case please add you custom one as it may be founded in mongoCompass
  // describe('/auth/Signup (POST)', () => {
  //   it('should register a new user', async () => {
  //     await request(app.getHttpServer())
  //       .post('/auth/Signup')
  //       .send({
  //         email: 'test@example.com',
  //         name: 'Test User',
  //         password: 'Password123!'
  //       })
  //       .expect(201);
  //   });
  // });

  // To Fail Sign up with validation

  
  describe('/auth/Signup (POST)', () => {
    it('should Fail Email', async () => {
      await request(app.getHttpServer())
        .post('/auth/Signup')
        .send({
          email: 'test',
          name: 'Test User',
          password: 'Password123!'
        })
        .expect(400);
    });
  });
  describe('/auth/Signup (POST)', () => {
    it('should Fail Name', async () => {
      await request(app.getHttpServer())
        .post('/auth/Signup')
        .send({
          email: 'test@example.com',
          name: 'Te',
          password: 'Password123!'
        })
        .expect(400);
    });
  });
  describe('/auth/Signup (POST)', () => {
    it('should Fail Password', async () => {
      await request(app.getHttpServer())
        .post('/auth/Signup')
        .send({
          email: 'test@example.com',
          name: 'Test User',
          password: 'P'
        })
        .expect(400);
    });
  });

  describe('/auth/Signin (POST)', () => {
    it('should authenticate user and return token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/Signin')
        .send({
          email: 'test@example.com',
          password: 'Password123!'
        })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      accessToken = response.body.accessToken; 
    });

    it('should reject invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/Signin')
        .send({
          email: 'aaaa@bbbb.com',
          password: 'WrongPassword'
        })
        .expect(404);
    });
  });

  describe('Authenticated Access', () => {
    it('/auth/welcome (GET) should return welcome message with valid token', async () => {
    
      if (!accessToken) {
        const loginResponse = await request(app.getHttpServer())
          .post('/auth/Signin')
          .send({
            email: 'test@admin.com',
            password: 'test@1234'
          });
        accessToken = loginResponse.body.data.access_token;
      }

      const response = await request(app.getHttpServer())
        .get('/auth/welcome')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Welcome');
    });

    it('/auth/welcome (GET) should reject invalid token', async () => {
      await request(app.getHttpServer())
        .get('/auth/welcome')
        .set('Authorization', 'Bearer invalid.token.here')
        .expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});