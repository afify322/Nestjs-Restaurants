import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurants, RestaurantsSchema } from './restaurants.model';
import { MulterModule } from '@nestjs/platform-express';
import { storage, imageFileFilter } from '../middleware/UploadImageConfig';
import { CityModule } from 'src/city/city.module';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurants.name, schema: RestaurantsSchema },
    ]),
    MulterModule.register({
      storage: storage,
      fileFilter: imageFileFilter,
    }),
    CityModule,
    AuthModule,
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
