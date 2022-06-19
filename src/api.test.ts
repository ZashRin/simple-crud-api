import request from 'supertest';
import { v4 } from 'uuid';
import { IUser } from './models/user.model';
import { createServer } from './services/server.service';

const server = createServer();

const base = '/api/users';

const testUser = {
  username: 'test name',
  age: 100,
  hobbies: ["hobby1", "hobby2"]
};

describe('CRUD API TESTS', () => {
  /*
  Сценарий 2
  POST-запросом в цикле создаём 3 новых объекта (ожидается ответ, 
    содержащий свежесозданный объект)
  DELETE-запросом в цикле удаляем все созданные объекты по id (ожидается 
    подтверждение успешного удаления)
  */
  afterAll(() => server.close());

  describe('First scenario', () => {
    /*
    Сценарий 1
    GET-запросом получаем все объекты (ожидается пустой массив)
    POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)
    GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект)
    PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий 
      обновленный объект с тем же id)
    DELETE-запросом удаляем созданный объект по id (ожидается подтверждение 
      успешного удаления)
    GET-запросом пытаемся получить удаленный объект по id (ожидается ответ, 
      что такого объекта нет)
    */

    let id: string;
  
    // GET-запросом получаем все объекты (ожидается пустой массив)
  
    it('should return all users', async () => {
      const { body, statusCode } = await request(server)
        .get(base);
      expect(statusCode).toEqual(200);
      expect(body).toEqual([]);
      expect(Array.isArray(body)).toBe(true);
    });
  
    // POST-запросом создается новый объект (ожидается ответ, содержащий 
    // свежесозданный объект)
  
    it('should create person successfully', async () => {
      const { body, statusCode } = await request(server)
        .post(base)
        .send(testUser);
      expect(statusCode).toEqual(201);
      expect(body.username).toEqual(testUser.username);
      expect(body.age).toEqual(testUser.age);
      expect(JSON.stringify(body.hobbies)).toEqual(
        JSON.stringify(testUser.hobbies),
      );
      id = body.id;
    });
    
    // GET-запросом пытаемся получить созданный объект по его id (ожидается 
    // созданный объект)
  
    it('should get a person by id', async () => {
      const { body, statusCode } = await request(server)
        .get(`${base}/${id}`)
      expect(statusCode).toEqual(200);
      expect(body instanceof Object).toBe(true);
      expect(body).toEqual({ ...testUser, id });
    });
  
    // PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий 
    // обновленный объект с тем же id)
  
    it('should update a person by id', async () => {
      const newUser = { ...testUser, username: "update name" };
      await request(server)
        .put(`${base}/${id}`)
        .send(newUser);
      const { body, statusCode } = await request(server)
        .get(`${base}/${id}`)
        .send(newUser);
      expect(statusCode).toEqual(200);
      expect(body.username).toEqual(newUser.username);
      expect(body.age).toEqual(newUser.age);
      expect(body.id).toEqual(id);
      expect(JSON.stringify(body.hobbies))
        .toEqual(
          JSON.stringify(newUser.hobbies),
        );
    });
  
    // DELETE-запросом удаляем созданный объект по id (ожидается подтверждение 
    // успешного удаления)
  
    it('should delete person successfully', async () => {
      const { statusCode } = await request(server)
        .delete(`${base}/${id}`)
      expect(statusCode).toEqual(204);
    });
  
    // GET-запросом пытаемся получить удаленный объект по id (ожидается ответ,
    // что такого объекта нет)
  
    it('should get 404 error', async () => {
      const { body, statusCode } = await request(server)
        .get(`${base}/${id}`)
      expect(statusCode).toEqual(404);
      expect(body instanceof Object).toBe(true);
    });
  });

  describe('Second scenario', () => {
    let usersArray: IUser[] = [];
    const testData = [testUser, testUser, testUser];

    // POST-запросом в цикле создаём 3 новых объекта (ожидается ответ, 
    // содержащий свежесозданный объект)

    it('should create 3 persons successfully', () => {
      testData.forEach(async (item) => {
        const { body, statusCode } = await request(server)
          .post(base)
          .send(item);
        expect(statusCode).toEqual(201);
        expect(body.username).toEqual(testUser.username);
        expect(body.age).toEqual(testUser.age);
        expect(JSON.stringify(body.hobbies)).toEqual(
          JSON.stringify(testUser.hobbies),
        );
      });
    });

    // GET-запросом получаем все объекты (ожидается 3 объекта)

    it('should return all created users (expect 3 objects)', async () => {
      const { body, statusCode } = await request(server)
        .get(base);
      expect(statusCode).toEqual(200);
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toEqual(3);
      usersArray = body;
    });
    
    // DELETE-запросом в цикле удаляем все созданные объекты по id (ожидается 
    // подтверждение успешного удаления)

    it('should delete 3 persons successfully', async () => {
      usersArray.forEach(async (user) => {
        const { statusCode } = await request(server)
        .delete(`${base}/${user.id}`)
        expect(statusCode).toEqual(204);
      });  
    });
  });

  describe('Third scenario', () => {
    /*
    Сценарий 3
    POST-запросом создается новый объект (ожидается созданный объект)
    C помощью uuid генерируем случайный id
    GET-запросом пытаемся получить созданный объект по случайному id (ожидается статус 404)
    PUT-запросом пытаемся обновить созданный объект по случайному id (ожидается статус 404)
    DELETE-запросом пытаемся удалить созданный объект по случайному id (ожидается статус 404)
    DELETE-запросом удаляем созданный объект по его действительному id (ожидается статус 204)
    */

    const updateData = {
      username: 'update name',
      age: 100,
      hobbies: ["update"]
    }

    const randomId = v4();

    let realId: string;

    it('should create person successfully', async () => {
      const { body, statusCode } = await request(server)
        .post(base)
        .send(testUser);
      expect(statusCode).toEqual(201);
      expect(body.username).toEqual(testUser.username);
      expect(body.age).toEqual(testUser.age);
      expect(JSON.stringify(body.hobbies)).toEqual(
        JSON.stringify(testUser.hobbies),
      );
      realId = body.id;
    });

    // GET-запросом пытаемся получить созданный объект по случайному id (ожидается статус 404)

    it('get non existing person, should get 404 error', async () => {
      const { body, statusCode } = await request(server)
        .get(`${base}/${randomId}`);
      expect(statusCode).toEqual(404);
      expect(body instanceof Object).toBe(true);
    });

    // PUT-запросом пытаемся обновить созданный объект по случайному id (ожидается статус 404)

    test('update non existing person, should get 404 error ', async () => {
      const { body, statusCode } = await request(server)
        .put(`${base}/${randomId}`)
        .send(updateData);
      expect(statusCode).toEqual(404);
      expect(body instanceof Object).toBe(true);    
    });

    // DELETE-запросом пытаемся удалить созданный объект по случайному id (ожидается статус 404)

    it('delete non existing person, should get 404 error', async () => {
      const { statusCode } = await request(server).delete(`${base}/${randomId}`);
      expect(statusCode).toEqual(404);
    });

    // DELETE-запросом удаляем созданный объект по его действительному id (ожидается статус 204)

    it('delete existing person, should get 204 error', async () => {
      const { statusCode } = await request(server).delete(`${base}/${realId}`);
      expect(statusCode).toEqual(204);
    });
  });
});
