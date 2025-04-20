import { Body, Controller, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { PostSessionDto } from './session.dto';
import { BaseController } from 'src/common/base/base.controller';

@Controller('sessions')
export class SessionController extends BaseController {
    constructor(private readonly sessionService: SessionService) {
        super();
    }

    @Post()
    async postSession(@Body() postSessionDto: PostSessionDto) {
        const data = await this.sessionService.postSession(postSessionDto);
        return this.response(data);
    }
}
