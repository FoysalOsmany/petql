import {inject, injectable} from 'inversify';
import express, {Router} from 'express';
import {IPetRoutes} from "./pet/pet.routes";
import {IOwnerRoutes} from "./owner/owner.routes";
import {TYPES} from "../configurations/types";

@injectable()
export class ComponentRoutes implements IComponentRoutes {
  private readonly router: Router;

  constructor(
    @inject(TYPES.IPetRoutes) private petRoutes: IPetRoutes,
    @inject(TYPES.IOwnerRoutes) private ownerRoutes: IOwnerRoutes,
  ) {
    this.router = express.Router();
  }

  setupRoutes(): any {
    this.router.get('/pets', this.petRoutes.getAll.bind(this.petRoutes));
    this.router.get('/pets/:id', this.petRoutes.get.bind(this.petRoutes));
    this.router.post('/pets', this.petRoutes.create.bind(this.petRoutes));
    this.router.put('/pets/:id', this.petRoutes.update.bind(this.petRoutes));
    this.router.delete('/pets/:id', this.petRoutes.delete.bind(this.petRoutes));

    this.router.get('/owners', this.ownerRoutes.getAll.bind(this.ownerRoutes));
    this.router.get('/owners/:id', this.ownerRoutes.get.bind(this.ownerRoutes));
    this.router.post('/owners', this.ownerRoutes.create.bind(this.ownerRoutes));
    this.router.put('/owners/:id', this.ownerRoutes.update.bind(this.ownerRoutes));
    this.router.delete('/owners/:id', this.ownerRoutes.delete.bind(this.ownerRoutes));
    this.router.put('/owners/:id/pet/:pid', this.ownerRoutes.ownPet.bind(this.ownerRoutes));
    this.router.delete('/owners/:id/pet/:pid', this.ownerRoutes.surrenderPet.bind(this.ownerRoutes));

    return this.router;
  }
}

export interface IComponentRoutes {
  setupRoutes(): any;
}
