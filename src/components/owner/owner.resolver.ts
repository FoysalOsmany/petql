import {Arg, Mutation, Query, Resolver} from "type-graphql";
import Q from "q";
import {OwnerModel} from "./owner.model";
import {TYPES} from "../../configurations/types";
import {IOwnerService} from "./owner.service.interface";
import {container} from "../../configurations/inversify.config";
import {OwnerService} from "./owner.service";
import {IOwner} from "./owner.interface";
import {OwnerDataInput} from "./owner.inputs";

@Resolver(OwnerModel)
export class OwnerResolver {
  private ownerService: IOwnerService;

  constructor() {
    //TODO: Make Inversify work with TypeGraphQL
    this.ownerService = container.get<OwnerService>(TYPES.IOwnerService);
  }

  @Query(returns => [OwnerModel])
  owners() {
    return this.ownerService.findAll()
      .then((ownersList: IOwner[]) => Q.resolve(ownersList))
      .catch((e: any) => Q.reject(e));
  }

  @Query(returns => OwnerModel)
  owner(@Arg("id") id: string) {
    return this.ownerService.findById(id)
      .then((ownerData: IOwner) => Q.resolve(ownerData))
      .catch((e: any) => Q.reject(e));
  }

  @Mutation(returns => OwnerModel)
  addOwner(
    @Arg("ownerData") ownerData: OwnerDataInput,
  ): Promise<OwnerModel> {
    return this.ownerService.create(<IOwner>ownerData)
      .then((ownerData: IOwner) => {
        return Q.resolve(ownerData)
      })
      .catch((e: any) => Q.reject(e));
  }

  @Mutation(returns => OwnerModel)
  updateOwner(
    @Arg("id") id: string,
    @Arg("ownerData") ownerData: OwnerDataInput,
  ): Promise<OwnerModel> {
    return this.ownerService.update(id, <IOwner>ownerData)
      .then((ownerData: IOwner) => {
        return Q.resolve(ownerData)
      })
      .catch((e: any) => Q.reject(e));
  }

  @Mutation(returns => OwnerModel)
  deleteOwner(
    @Arg("id") id: string
  ): Promise<string> {
    return this.ownerService.delete(id)
      .then((response: string) => {
        return Q.resolve(response)
      })
      .catch((e: any) => Q.reject(e));
  }

  @Mutation(returns => OwnerModel)
  ownPet(
    @Arg("id") id: string,
    @Arg("pid") pid: string,
  ): Promise<OwnerModel> {
    return this.ownerService.ownPet(id, pid)
      .then((ownerData: IOwner) => {
        return Q.resolve(ownerData)
      })
      .catch((e: any) => Q.reject(e));
  }

  @Mutation(returns => OwnerModel)
  surrenderPet(
    @Arg("id") id: string,
    @Arg("pid") pid: string,
  ): Promise<OwnerModel> {
    return this.ownerService.surrenderPet(id, pid)
      .then((ownerData: IOwner) => {
        return Q.resolve(ownerData)
      })
      .catch((e: any) => Q.reject(e));
  }
}
