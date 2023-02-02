import * as User from '../src/handlers/user';

describe('user handler', () => {
  it('create a new user', async () => {
    const user = {
      username: 'hello@gmail.com',
      password: '12233',
    };

    //mock req and res
    const request = {
      body: user,
    };

    const response = {
      json({ token }: { token: string }) {
        expect(token).toBeTruthy();
      },
      status: jest.fn().mockReturnThis(),
    };

    //@ts-ignore
    const result = await User.createNewUser(request, response);
  });
});
