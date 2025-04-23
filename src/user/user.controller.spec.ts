import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;

    const mockUserService = {
        postUser: jest.fn((dto) => {
            return {
                id: 1,
                username: dto.username,
                email: dto.email,
            };
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService)
            .useValue(mockUserService)
            .compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be able to create new user', async () => {
        const requestBody = {
            username: 'userTest1',
            email: 'user-test-01@gmail.com',
            password: 'password01',
            confirmPassword: 'password01',
        };
        await expect(controller.postUser(requestBody)).resolves.toEqual({
            data: {
                id: expect.any(Number),
                username: requestBody.username,
                email: requestBody.email,
            },
            message: null,
        });
    });
});
