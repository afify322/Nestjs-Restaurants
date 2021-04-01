import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CityDocument = City & mongoose.Document;
@Schema()
export class City {
  @Prop({
    type: String,
    required: true,
  })
  name: string;
}
export const CitySchema = SchemaFactory.createForClass(City);
