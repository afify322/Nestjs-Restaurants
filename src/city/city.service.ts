import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { City, CityDocument } from './city.model';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private city: Model<CityDocument>) {}
  create(createCityDto: CreateCityDto): any {
    return new this.city(createCityDto).save();
  }

  async findAll() {
    const result = await this.city.find();
    if (result.length > 0) {
      return result;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async findOne(name: string) {
    const result = await this.city.findOne({ name: name });
    if (!result) {
      throw new HttpException('City Not Found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
