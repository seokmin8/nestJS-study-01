import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";

// 이 클래스가 Board를 컨트롤하는 레파지토리 라는 선언
@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

}

// @Injectable()
// export class BoardRepository {
//     constructor(
//         @InjectRepository(Board)
//         private readonly boardRepository: Repository<Board>,
//     ) {}