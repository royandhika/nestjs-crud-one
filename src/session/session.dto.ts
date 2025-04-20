import { IsAlphanumeric, IsStrongPassword } from 'class-validator';

export class PostSessionDto {
    @IsAlphanumeric()
    username: string;

    @IsStrongPassword()
    password: string;
}
