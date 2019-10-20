import {Field, InputType} from "type-graphql";
import {IsNumber, Length, MaxLength} from "class-validator";

@InputType()
export class PetDataInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @Length(2, 15)
  color?: string;

  @Field({ nullable: true })
  @IsNumber()
  age?: number;

  @Field({ nullable: true })
  @Length(2, 15)
  breed?: string;
}
