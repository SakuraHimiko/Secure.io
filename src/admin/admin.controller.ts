import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { VerifyAdminDto } from './dto/verify_admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminDto } from './dto/create_admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async verifyAdmin(
    @Body() verifyAdminDto: VerifyAdminDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const data = await this.adminService.validateAdmin(verifyAdminDto);
    res.cookie('zzUvB33_admin', data.token);
    return data;
  }
  @Post('addUser')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }
  @Get()
  findAll() {
    return this.adminService.findAll();
  }
  @Get('manageUser')
  manageUser() {
    return this.adminService.deleteUser();
  }

  @Get('manageUser/:id/delete')
  @Get(':id')
  findUserAndDelete(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
