import {IOwner} from "./owner.interface";

export interface IOwnerService {
  create(ownerData: IOwner): any;

  findAll(): any;

  findById(_id: string): Q.Promise<any>;

  update(_id: string, ownerData: IOwner): any;

  delete(_id: string): any;

  ownPet(_id: string, pid: string): any;

  surrenderPet(_id: string, pid: string): any;
}
