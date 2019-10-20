import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from "inversify";
import {IOwnerService} from "./owner.service.interface";
import {TYPES} from "../../configurations/types";

@injectable()
export class OwnerRoutes implements IOwnerRoutes {
  constructor(
    @inject(TYPES.IOwnerService) private ownerService: IOwnerService) {
  }

  getAll(_req: Request, res: Response) {
    return this.ownerService
      .findAll()
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }

  get(req: Request, res: Response) {
    this.ownerService.findById(req.params['id'])
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }

  create(req: Request, res: Response) {
    this.ownerService.create(req.body)
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }

  update(req: Request, res: Response) {
    console.log('ID', req.params['id']);
    this.ownerService.update(req.params['id'], req.body)
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }

  delete(req: Request, res: Response) {
    this.ownerService.delete(req.params['id'])
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }

  ownPet(req: Request, res: Response) {
    this.ownerService.ownPet(req.params['id'], req.params['pid'])
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }

  surrenderPet(req: Request, res: Response): any {
    this.ownerService.surrenderPet(req.params['id'], req.params['pid'])
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }
}

export interface IOwnerRoutes {
  getAll(req: Request, res: Response, next: NextFunction): any;

  get(req: Request, res: Response, next: NextFunction): any;

  create(req: Request, res: Response, next: NextFunction): any;

  update(req: Request, res: Response, next: NextFunction): any;

  delete(req: Request, res: Response, next: NextFunction): any;

  ownPet(req: Request, res: Response, next: NextFunction): any;

  surrenderPet(req: Request, res: Response, next: NextFunction): any;
}
