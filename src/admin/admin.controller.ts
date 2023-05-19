import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { VerifyAdminDto } from './dto/verify_admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminDto } from './dto/create_admin.dto';
import { AdminRoleGuard } from 'src/admin_role/admin_role.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('products')
  showDashboard(@Query('limit') limit?: number, @Query('skip') skip?: number) {
    return this.adminService.showDashboardInfo(
      limit ? limit : undefined,
      skip ? skip : undefined,
    );
  }
  @Get('/products/:id')
  showProductInfo(@Param('id') id: string) {
    return this.adminService.getMovieInfo(id);
  }
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
  @UseGuards(AdminRoleGuard)
  @Get('/findAll')
  findAll(@Query('limit') limit?: number, @Query('skip') skip?: number) {
    return this.adminService.findAll(
      limit ? limit : undefined,
      skip ? skip : undefined,
    );
  }
  @UseGuards(AdminRoleGuard)
  @Get('manageUsers')
  manageUser() {
    return this.adminService.manageUser();
  }

  @UseGuards(AdminRoleGuard)
  @Get('manageUser/:id/deactivate')
  findUserAndDelete(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AdminRoleGuard)
  @Patch('updateAdmin/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AdminRoleGuard)
  @Delete('deleteAdmin/:id')
  removeAdmin(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
