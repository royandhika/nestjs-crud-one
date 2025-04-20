import { IsAlphanumeric, IsEmail, IsStrongPassword } from 'class-validator';

export class PostUserDto {
    @IsAlphanumeric()
    username: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsStrongPassword()
    confirmPassword: string;
}
