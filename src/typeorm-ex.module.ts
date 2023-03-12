import { DynamicModule, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TYPEORM_EX_CUSTOM_REPOSITORY } from './typeorm-ex.decorator';

export class TypeOrmExModule {
  
  // new는 클래스 데코레이터의 유형 클래스를 제한하기 위해 extends다음에 지정
  // (...args: any[])는 다양한 유형의 인수를 사용하는 생성자가 있는 일부 개체  
  // 나에게 리턴할때 repositories 배열 타입으로 보내달라!
  public static forCustomRepository<T extends new (...args: any[]) => any>(
    repositories: T[]
  ): DynamicModule {
    const providers: Provider[] = [];

    // 받은 repo들을 for문을 돌면서 아까 setMetadata했으니까 이번엔 get으로 얻어옵니다.
    //  Reflect는 반복 중 중간에 빼오는 느낌
    for (const repository of repositories) {
      const entity = Reflect.getMetadata(
        TYPEORM_EX_CUSTOM_REPOSITORY,
        repository
      );

      if (!entity) {
        continue;
      }
      // inject property는 Nest가 해결하고 인스턴스화 해줌
      // 프로세스 중 Factory function에 인수로 전달할 공급자 배열을 받고 Nest는 동일 순서로 
      // 주입 목록의 인스턴스를 인수로 Factory function에 전달. providers(공급자들) 을 채워줘야 함
      providers.push({
        // inject로 getDataSourceToken()으로 DB데이터 연결을 얻음
        inject: [getDataSourceToken()],
        // provide로 repository 제공
        provide: repository,
        // useFac.. 공급자를 동적으로 생성하는 아이, 실제 공급자는 Factory function에서 반환되는 녀석
        useFactory: (dataSource: DataSource): typeof repository => {
          const baseRepository = dataSource.getRepository<any>(entity);
          // 여기서 생성자 반환!
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }
    return {
      exports: providers,
      module: TypeOrmExModule,
      providers,
    };
  }
}
