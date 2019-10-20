import {ObjectType, Field, ID} from "type-graphql";

@ObjectType()
export class PetModel {
  @Field(type => ID)
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  age?: number;

  @Field({ nullable: true })
  breed?: string;
}
