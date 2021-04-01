import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
  })
  name: string;
  @Prop({
    type: String,
    default: 0,
    unique: true,
  })
  email: string;
  @Prop({
    type: String,
    min: 8,
    max: 12,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    enum: ['admin', 'normal'],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
