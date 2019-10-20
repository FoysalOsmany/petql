import {IOwnerService} from "./owner.service.interface";
import {inject, injectable} from "inversify";
import {IOwner} from "./owner.interface";
import {db} from "../../utils/db.driver";
import Q from "q";
import {IPet} from "../pet/pet.interface";
import {TYPES} from "../../configurations/types";
import {IPetService} from "../pet/pet.service.interface";

@injectable()
export class OwnerService implements IOwnerService {
  constructor(
    @inject(TYPES.IPetService) private petService: IPetService) {
  }

  create(ownerData: IOwner): any {
    return Q.ninvoke(db.collection('owners'), 'insert', ownerData)
      .then((data: any) => Q.resolve(data && data.length ? data[0] : data))
      .catch((e: any) => Q.reject(e));
  }

  findAll() {
    return Q.ninvoke(db.collection('owners').find({}), 'toArray')
      .then(data => Q.resolve(data))
      .catch(e => Q.reject(e));
  }

  findById(_id: string): Q.Promise<any> {
    return Q.ninvoke(db.collection('owners'), 'findOne', {_id})
      .then((data) => Q.resolve(<IOwner>data))
      .catch(e => Q.reject(e));
  }

  update(_id: string, ownerData: IOwner) {
    return Q.ninvoke(db.collection('owners'), 'update', {_id: _id}, ownerData)
      .then(() => Q.resolve(Object.assign({}, {_id}, ownerData)))
      .catch(e => {
        return Q.reject(e)
      });
  }

  delete(_id: string) {
    return Q.ninvoke(db.collection('owners'), 'remove', {_id: _id})
      .then(() => Q.resolve(`deleted id ${_id}`))
      .catch(e => {
        return Q.reject(e)
      });
  }

  ownPet(_id: string, pid: string): any {
    return Q.all([
      this.findById(_id),
      this.petService.findById(pid)
    ]).spread((owner: IOwner, pet: IPet) => {
        owner['owns'] = owner['owns'] || [];

        if (owner.hasOwnProperty('owns') && owner.owns.length) {
          owner.owns = owner.owns.filter((p: any) => p._id.toString() !== pid.toString());
        }

        owner['owns'].push(pet);

        return this.update(_id, owner)
          .then(() => Q.resolve(Object.assign({}, {_id}, owner)))
          .catch(e => Q.reject(e))
      }
    ).catch(e => Q.reject(e))
  }

  surrenderPet(_id: string, pid: string): any {
    return this.findById(_id)
      .then((owner: IOwner) => {
        if (owner.hasOwnProperty('owns') && owner.owns) {
          owner.owns = owner.owns.filter((pet: any) => pet._id.toString() !== pid.toString());
        }

        return this.update(_id, owner)
          .then(() => Q.resolve(Object.assign({}, {_id}, owner)))
          .catch(e => Q.reject(e))
      })
  }
}
