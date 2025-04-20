import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { PostUserDto } from './user.dto';
import { BaseController } from 'src/common/base/base.controller';

@Controller('users')
export class UserController extends BaseController {
    constructor(private readonly userService: UserService) {
        super();
    }

    @Post()
    async postUser(@Body() requestBody: PostUserDto) {
        const data = await this.userService.postUser(requestBody);
        return this.response(data);
    }
}
