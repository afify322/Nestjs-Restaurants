import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, RoleEnum } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/middleware/RolesGuard';
import { Roles } from 'src/middleware/RoldeDecorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('login')
  async login(@Body() loginDto: loginDto) {
    return await this.userService.login(loginDto);
  }
  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async findAll() {
    return await this.userService.findAll();
  }
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
