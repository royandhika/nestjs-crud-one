import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PostUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { PostUserResponse } from './user.interface';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async postUser(request: PostUserDto): Promise<PostUserResponse> {
        // Cek user sudah ada belum
        const existedUsername = await this.userRepository.getUserByUsername({
            username: request.username,
        });
        const existedUserEmail = await this.userRepository.getUserByEmail({
            email: request.email,
        });
        if (existedUserEmail && existedUsername) {
            throw new ConflictException('Username and email already exist');
        } else if (existedUsername) {
            throw new ConflictException('Username already exist');
        } else if (existedUserEmail) {
            throw new ConflictException('Email already exist');
        }

        // Cocokin password
        if (request.password !== request.confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(request.password, 10);

        // Write data
        const response = await this.userRepository.postUser({
            username: request.username,
            email: request.email,
            hashedPassword: hashedPassword,
        });

        return response;
    }

    async getUser() {}
}
