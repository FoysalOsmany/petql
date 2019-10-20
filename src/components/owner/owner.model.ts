import {ObjectType, Field, ID} from "type-graphql";
import {PetModel} from "../pet/pet.model";

@ObjectType()
export class OwnerModel {
  @Field(type => ID)
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  address?: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field(type => [PetModel], {nullable: true})
  owns?: PetModel[];
}
