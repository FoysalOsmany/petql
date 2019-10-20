import {Field, InputType} from "type-graphql";
import {IsEmail, Length, MaxLength} from "class-validator";

@InputType()
export class OwnerDataInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @MaxLength(500)
  address?: string;

  @Field()
  @Length(5, 20)
  phone: string;

  @Field()
  @IsEmail()
  email: string;
}
