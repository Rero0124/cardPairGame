import { Injectable } from "@nestjs/common";
import { ILoginService } from "./login.service.interface";

@Injectable()
export class LoginService implements ILoginService {
  constructor() {}

  
}