import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { User } from "./user.entity";

// 사용하려면 controller 에 @UseGuards(AuthGuard()) 가 있어야 한다
// createParam.. 메서드로 커스텀데코 생성(2개의 파라미터를 갖는다)
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    // userEntity로 타입을 정의
    const req = ctx.switchToHttp().getRequest();
    return req.user;
}) 