import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/fileDto';
import { SearchNearst } from './dto/searchNearst.dto';
import { SearchReastaurant } from './dto/search-reastaurant.dto';
import { RolesGuard } from 'src/middleware/RolesGuard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/middleware/RoldeDecorator';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @Roles('admin')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() file: FileDto,
  ) {
    createRestaurantDto.image = file.path;
    return await this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  async findAll() {
    return await this.restaurantsService.findAll();
  }

  @Get('nearst')
  async findOne(@Query() searhNearst: SearchNearst) {
    console.log(searhNearst);
    return await this.restaurantsService.findNearst(searhNearst);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @UploadedFile() file: FileDto,
  ) {
    updateRestaurantDto.image = file.path;
    return await this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return await this.restaurantsService.remove(id);
  }

  @Get('search')
  async find(@Query() search: SearchReastaurant) {
    const result = await this.restaurantsService.find(search);
    return {
      restaurant: result,
      page: search.page,
      last_page: Math.ceil(result.length / search.limit),
    };
  }

  @Get('group')
  async group() {
    return await this.restaurantsService.group();
  }
}
