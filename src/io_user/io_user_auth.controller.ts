import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
  UseFilters,
} from '@nestjs/common';
import { IoUserService } from './io_user_auth.service';
import { MongoExceptionFilter } from 'src/exceptions/mongo_exception.handler';
import { SignUpDto } from './dto/signup.dto';

@Controller('io-user')
export class IoUserController {
  constructor(private io_UsersService: IoUserService) {}
  @Get('signin')
  @Render('signin')
  renderSignIn(): object {
    return { login_true: false, failed_true: false };
  }
  // @UseGuards(AuthGuard('local'))
  @Get('signup')
  @Render('signup')
  renderSignUp(): object {
    return { failed: false };
  }
  //post routes
  @Post('signup')
  @UseFilters(new MongoExceptionFilter())
  async getPostData(
    @Body() body: SignUpDto,
    @Res({ passthrough: true }) response: any,
  ) {
    const info = await this.io_UsersService.saveUserToDatabase(body);
    response.cookie('token', info.token);
    return info;
  }
  @Post('signin')
  async verifySignInUser(
    @Body() body: any,
    @Res({ passthrough: true }) response: any,
  ) {
    const data = await this.io_UsersService.verifyLoginUser(body);
    response.cookie('token', data.token);
    return data;
  }
}
