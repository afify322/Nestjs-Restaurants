import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CityService } from 'src/city/city.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { SearchReastaurant } from './dto/search-reastaurant.dto';
import { SearchNearst } from './dto/searchNearst.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurants, RestaurantsDocument } from './restaurants.model';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurants.name)
    private Restaurants: Model<RestaurantsDocument>,
    private city: CityService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const user = await this.Restaurants.findOne({
      email: createRestaurantDto.email,
    });
    if (user) {
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
    }

    const city = await this.city.findOne(createRestaurantDto.city);
    if (city) {
      createRestaurantDto.city = city._id;
    } else {
      const city = { name: createRestaurantDto.city };

      const newCity = await this.city.create(city);
      createRestaurantDto.city = newCity._id;
    }
    return new this.Restaurants(createRestaurantDto).save();
  }

  async findAll() {
    const result = await this.Restaurants.find();
    if (result.length > 0) {
      return result;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async findNearst(searhNearst: SearchNearst) {
    const result = await this.Restaurants.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [searhNearst.location.long, searhNearst.location.lat],
            searhNearst.radius / 3963.2,
          ],
        },
      },
    })
      .populate('city')
      .exec();
    if (result.length > 0) {
      return { Restaurants: result, count: result.length };
    }
    throw new HttpException('Not Found within this area', HttpStatus.NOT_FOUND);
  }

  async find(search: SearchReastaurant) {
    const result = await this.Restaurants.find({
      name: { $regex: search.name ? search.name : '', $options: 'i' },
    })
      .limit(+search.limit)
      .skip((+search.page - 1) * +search.limit)
      .exec();
    if (result.length > 0) {
      return result;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    return this.Restaurants.findByIdAndUpdate(id, updateRestaurantDto, {
      new: true,
    });
  }

  remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    return this.Restaurants.findByIdAndDelete(id);
  }

  group() {
    return this.Restaurants.aggregate([
      {
        $lookup: {
          from: 'cities',
          localField: 'city',
          foreignField: '_id',
          as: 'city',
        },
      },

      {
        $group: {
          _id: '$city',
          count: { $sum: 1 },
          restaurants: {
            $push: { name: '$name', email: '$email', locatio: '$location' },
          },
        },
      },
    ]);
  }
}
