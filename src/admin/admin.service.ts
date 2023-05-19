import { HttpException, Injectable } from '@nestjs/common';
import { VerifyAdminDto } from './dto/verify_admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AdminModel } from 'src/models/admin.schema';
import { Model } from 'mongoose';
import { CryptoService } from 'src/helpers/aes.helpers';
import { Argon2Interface } from 'src/helpers/argon.helper';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from './dto/create_admin.dto';
import { IO_Users } from 'src/models/user.schema';
import { SignUpDto } from 'src/io_user/dto/signup.dto';
import { Movie } from 'src/models/movie.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminModel.name, 'movie_io_admin')
    private AdminSchema: Model<AdminModel>,
    @InjectModel(IO_Users.name, 'movie_io')
    private IO_User: Model<IO_Users>,
    @InjectModel(Movie.name, 'movie_io')
    private MovieSchema: Model<Movie>,
    private AesHasher: CryptoService,
    private ArgonHasher: Argon2Interface,
    private jwtService: JwtService,
  ) {
    this.IO_User.schema.pre('find', function () {
      this.where({ active: { $ne: true } });
    });
  }

  async showDashboardInfo() {
    const totalMovies = await this.MovieSchema.find().limit(15);
    return { result: totalMovies.length, movies: totalMovies };
  }
  async validateAdmin(verifyAdminDto: VerifyAdminDto): Promise<any> {
    const adminEmail = verifyAdminDto.email;
    const adminPassword = verifyAdminDto.password;
    const adminDetail = await this.AdminSchema.findOne({
      email: adminEmail,
    }).select('+password');
    if (!adminDetail) {
      throw new HttpException(
        `Sorry there has no account with ${adminEmail}`,
        400,
      );
    }
    const password = adminDetail.password;
    const isValid = this.ArgonHasher.comparePassword(password, adminPassword);
    if (!isValid) {
      throw new HttpException('Sorry Admin!Your password is wrong', 400);
    }
    const role = this.AesHasher.encrypt(adminDetail.role);
    const tokenRaw = await this.jwtService.signAsync({
      id: adminDetail._id,
      role: role,
    });
    const token = this.AesHasher.encrypt(tokenRaw);
    return { token: `Bearer ` + token, detail: adminDetail };
  }

  async createAdmin(createAdmin: CreateAdminDto): Promise<object> {
    const name = createAdmin.name;
    const email = createAdmin.email;
    const password = createAdmin.password;
    const hashedPassword = await this.ArgonHasher.hashPassword(password);
    const roleRaw = createAdmin.role;
    const returnInfo = await this.AdminSchema.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: roleRaw,
    });
    const role = this.AesHasher.encrypt(returnInfo.role);
    const tokenRaw = await this.jwtService.signAsync({
      id: returnInfo._id,
      role: role,
    });
    const token = this.AesHasher.encrypt(tokenRaw);
    return { token: `Bearer ` + token, detail: returnInfo };
  }
  async findAll() {
    const users = await this.AdminSchema.find().limit(20);
    return users;
  }

  async manageUser(): Promise<object> {
    const users = await this.AdminSchema.deleteMany();
    return users;
  }
  async findOne(id: number) {
    const user = await this.IO_User.findById(id);
    user.active = false;
    return user;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updatedUser = await this.AdminSchema.findById(id);
    const updatedData = await updatedUser.updateOne({ ...updateAdminDto });
    return updatedData;
  }

  async remove(id: string) {
    const deactivatedUser = await this.AdminSchema.findById(id);
    deactivatedUser.active = false;
    return deactivatedUser;
  }
}
