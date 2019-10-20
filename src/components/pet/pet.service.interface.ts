import {IPet} from "./pet.interface";

export interface IPetService {
  create(petData: IPet): any;

  findAll(): any;

  findById(_id: string): any;

  update(_id: string, petData: IPet): any;

  delete(_id: string): any;
}
