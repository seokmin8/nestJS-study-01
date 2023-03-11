import { SetMetadata } from "@nestjs/common";

// @EntityRepository 대체하기
export const TYPEORM_EX_CUSTOM_REPOSITORY = "TYPEORM_EX_CUSTOM_REPOSITORY";

// SetMetadata는 key(TYPEORM_EX_CUSTOM_REPOSITORY) : value(entity) 형태
export function CustomRepository(entity: Function): ClassDecorator {
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}