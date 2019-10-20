import {Arg, Mutation, Query, Resolver} from "type-graphql";
import Q from "q";
import {TYPES} from "../../configurations/types";
import {container} from "../../configurations/inversify.config";
import {PetModel} from "./pet.model";
import {IPetService} from "./pet.service.interface";
import {PetService} from "./pet.service";
import {IPet} from "./pet.interface";
import {PetDataInput} from "./pet.inputs";

@Resolver(PetModel)
export class PetResolver {
  private petService: IPetService;

  constructor() {
    //TODO: Make Inversify work with TypeGraphQL
    this.petService = container.get<PetService>(TYPES.IPetService);
  }

  @Query(returns => [PetModel])
  pets() {
    return this.petService.findAll()
      .then((petsList: IPet[]) => Q.resolve(petsList))
      .catch((e: any) => Q.reject(e));
  }

  @Query(returns => PetModel)
  pet(@Arg("id") id: string) {
    return this.petService.findById(id)
      .then((petData: IPet) => Q.resolve(petData))
      .catch((e: any) => Q.reject(e));
  }

  @Mutation(returns => PetModel)
  addPet(
    @Arg("petData") petData: PetDataInput,
  ): Promise<PetModel> {
    return this.petService.create(<IPet>petData)
      .then((petData: IPet) => {
        return Q.resolve(petData)
      })
      .catch((e: any) => Q.reject(e));
  }

  @Mutation(returns => PetModel)
  updatePet(
    @Arg("id") id: string,
    @Arg("petData") petData: PetDataInput,
  ): Promise<PetModel> {
    return this.petService.update(id, <IPet>petData)
      .then((petData: IPet) => {
        return Q.resolve(petData)
      })
      .catch((e: any) => Q.reject(e));
  }

  @Mutation(returns => String)
  deletePet(
    @Arg("id") id: string
  ): Promise<string> {
    return this.petService.delete(id)
      .then((response: string) => {
        return Q.resolve(response)
      })
      .catch((e: any) => Q.reject(e));
  }
}
