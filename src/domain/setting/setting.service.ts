import { SettingRepository } from "./setting.repository";
import { ISettingService } from "./setting.service.interface";

export class SettingService implements ISettingService {
  constructor(private readonly settingRepository: SettingRepository) {}

  
}