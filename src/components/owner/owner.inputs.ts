import {Field, InputType} from "type-graphql";
import {IsEmail, Length, MaxLength} from "class-validator";

@InputType()
export class OwnerDataInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @Length(5, 255)
  description?: string;

  @Field({ nullable: true })
  @Length(5, 20)
  phone?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;
}
