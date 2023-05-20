import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class IO_Users {
  @Prop({ required: true })
  user_f_name: string;

  @Prop({ required: true })
  user_l_name: string;

  @Prop({ required: true, unique: true })
  user_name: string;

  @Prop({ required: true })
  user_password: string;

  @Prop({ default: `user/default-${Math.floor(Math.random() * 5)}.jpeg` })
  user_profile: string;

  @Prop()
  user_bio: string;

  @Prop({ default: Date.now(), select: false })
  user_join_date: Date;

  @Prop({ select: false })
  user_password_changeAt: Date;

  @Prop({ select: false })
  user_password_change_token: string;

  @Prop({ select: false })
  user_password_change_expiresin: Date;

  @Prop({ default: true })
  active: boolean;
}
export const IO_UsersSchema = SchemaFactory.createForClass(IO_Users);
