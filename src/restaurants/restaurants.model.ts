import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsLatLong } from 'class-validator';
import * as mongoose from 'mongoose';
import { City } from 'src/city/city.model';
export type RestaurantsDocument = Restaurants & mongoose.Document;

@Schema()
export class Restaurants {
  @Prop()
  name: string;
  @Prop({
    type: String,
    unique: true,
  })
  email: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: City.name,
  })
  city: string;
  @Prop()
  image: string;
  @Prop(
    raw({
      long: { type: Number },
      lat: { type: Number },
    }),
  )
  location: Record<string, any>;
}
export const RestaurantsSchema = SchemaFactory.createForClass(Restaurants);
