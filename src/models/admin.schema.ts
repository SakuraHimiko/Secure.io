import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class AdminModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ select: false, required: true })
  password: string;

  @Prop({ enum: ['admin', 'manager', 'editor', 'staff'], required: true })
  role: string;

  @Prop({ default: Date.now(), select: false })
  createdAt: Date;

  @Prop({ default: true })
  active: boolean;
}
export const AdminSchema = SchemaFactory.createForClass(AdminModel);
