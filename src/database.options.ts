import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Board } from "./boards/board.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseOptions implements TypeOrmOptionsFactory {

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
        entities: [Board],
    };
  }
}