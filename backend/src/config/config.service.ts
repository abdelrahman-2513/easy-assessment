import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
@Injectable()
export class ConfigService {
    constructor(private configSVC: NestConfigService) { }
    


    /**
     * This Function Used to get the enviroment variables by the keys
     * @param key 
     * @param defaultValue 
     * @returns The Value
     */
    get<T = string>(key: string, defaultValue?: string | number | null) {
        const value = this.configSVC.get(key);
        return value !== null && value !== undefined ? value : defaultValue;
    }
}
