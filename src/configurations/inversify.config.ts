import { Container } from 'inversify';
import {IOwnerService} from "../components/owner/owner.service.interface";
import {TYPES} from "./types";
import {OwnerService} from "../components/owner/owner.service";
import {ComponentRoutes, IComponentRoutes} from "../components/component.routes";
import {IOwnerRoutes, OwnerRoutes} from "../components/owner/owner.routes";
import {IPetService} from "../components/pet/pet.service.interface";
import {PetService} from "../components/pet/pet.service";
import {IPetRoutes, PetRoutes} from "../components/pet/pet.routes";

const container = new Container();

container.bind<IComponentRoutes>(TYPES.IComponentRoutes).to(ComponentRoutes);

container.bind<IOwnerService>(TYPES.IOwnerService).to(OwnerService);
container.bind<IOwnerRoutes>(TYPES.IOwnerRoutes).to(OwnerRoutes);

container.bind<IPetService>(TYPES.IPetService).to(PetService);
container.bind<IPetRoutes>(TYPES.IPetRoutes).to(PetRoutes);

export {container};
