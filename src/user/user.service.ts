import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { payloadDto } from 'src/auth/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private user: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService)) private jwt: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let { name, password } = createUserDto;
    const user = this.user.findOne({ name: name });
    if (!user) {
      throw new HttpException(
        'username is already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    password = await bcrypt.hash(password, 8);
    createUserDto.password = password;
    console.log(createUserDto);

    return new this.user(createUserDto).save();
  }

  findAll() {
    return this.user.find().select('_id name email role');
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    return this.user.findById(id).select('_id name email role');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const hashed = await bcrypt.hash(updateUserDto.password, 8);
    updateUserDto.password = hashed;
    return this.user.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: string) {
    return this.user.findByIdAndRemove(id);
  }
  async validation(loginDto: loginDto) {
    const { name, password } = loginDto;

    const user = await this.user.findOne({ name: name });
    if (!user) {
      throw new HttpException('Invalid Email ', HttpStatus.UNAUTHORIZED);
    }
    const dehashedPassword = bcrypt.compare(password, user.password);
    if (!dehashedPassword) {
      throw new HttpException('Invalid  Password', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
  async login(loginDto: loginDto) {
    const user = await this.validation(loginDto);

    const payload = { name: user.name, id: user._id, role: user.role };
    const token = this.jwt.sign(payload);
    return { name: user.name, role: user.role, token: token };
  }
}
