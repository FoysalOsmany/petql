import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from "inversify";
import {TYPES} from "../../configurations/types";
import {IPetService} from "../pet/pet.service.interface";

@injectable()
export class PetRoutes implements IPetRoutes {
  constructor(@inject(TYPES.IPetService) private petService: IPetService) {
  }

  getAll(_req: Request, res: Response) {
    return this.petService
      .findAll()
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }

  get(req: Request, res: Response) {
    this.petService.findById(req.params['id'])
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }

  create(req: Request, res: Response) {
    this.petService.create(req.body)
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }

  update(req: Request, res: Response) {
    console.log('ID', req.params['id']);
    this.petService.update(req.params['id'], req.body)
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }

  delete(req: Request, res: Response) {
    this.petService.delete(req.params['id'])
      .then((data: any) => res.send(data))
      .catch((e: any) => res.status(400).send(e))
  }
}

export interface IPetRoutes {
  getAll(req: Request, res: Response, next: NextFunction): any;

  get(req: Request, res: Response, next: NextFunction): any;

  create(req: Request, res: Response, next: NextFunction): any;

  update(req: Request, res: Response, next: NextFunction): any;

  delete(req: Request, res: Response, next: NextFunction): any;
}
