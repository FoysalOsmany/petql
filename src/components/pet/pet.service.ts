import {IPetService} from "./pet.service.interface";
import {injectable} from "inversify";
import {IPet} from "./pet.interface";
import {db} from "../../utils/db.driver";
import Q from "q";

@injectable()
export class PetService implements IPetService {
  create(petData: IPet): any {
    return Q.ninvoke(db.collection('pets'), 'insert', petData)
      .then((data: any) => Q.resolve(data && data.length ? data[0] : data))
      .catch((e: any) => Q.reject(e));
  }

  findAll(): any {
    return Q.ninvoke(db.collection('pets').find({}), 'toArray')
      .then((data: any) => Q.resolve(data))
      .catch((e: any) => Q.reject(e));
  }

  findById(_id: string): any {
    return Q.ninvoke(db.collection('pets'), 'findOne', {_id})
      .then((data: any) => Q.resolve(data))
      .catch((e: any) => Q.reject(e));
  }

  update(_id: string, petData: IPet): any {
    return Q.ninvoke(db.collection('pets'), 'update', {_id: _id}, petData)
      .then(() => Q.resolve({...{_id}, ...petData}))
      .catch((e: any) => {
        return Q.reject(e)
      });
  }

  delete(_id: string): any {
    return Q.ninvoke(db.collection('pets'), 'remove', {_id: _id})
      .then(() => Q.resolve(`deleted id ${_id}`))
      .catch((e: any) => {
        return Q.reject(e)
      });
  }
}
