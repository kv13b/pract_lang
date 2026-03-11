import type { UserModel } from "../models/UserModel";
import { injectable } from "tsyringe";
import { DBOperations } from "./dbOperations";
import type { ProfileInput } from "../models/dto/AddressInput";
import type { AddressModel } from "../models/AddressMode";
@injectable()
export class CartRepository extends DBOperations {
    constructor() {
        super();
    }
}