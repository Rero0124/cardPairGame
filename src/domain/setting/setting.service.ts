import { Injectable } from "@nestjs/common";
import { SettingRepository } from "./setting.repository";
import { ISettingService } from "./setting.service.interface";

@Injectable()
export class SettingService implements ISettingService {
  constructor(private readonly settingRepository: SettingRepository) {}

  
}