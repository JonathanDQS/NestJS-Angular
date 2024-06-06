
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LocationsDocument = HydratedDocument<ChosenLocation>;

@Schema()
export class ChosenLocation {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  lon: number;

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  country: string;
}

export const SupportSchema = SchemaFactory.createForClass(ChosenLocation);
