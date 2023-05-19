import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Movie {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  imdb: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  sposter: string;

  @Prop({ required: true })
  bposter: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  trailer: string;
}

const MovieSchema = SchemaFactory.createForClass(Movie);

export { MovieSchema };
