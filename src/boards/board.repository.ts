import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

// 이 클래스가 Board를 컨트롤하는 레파지토리 라는 선언
@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

    // db관련 로직은 service -> Repository에 만든다
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })
        await this.save(board);
        return board;
    }
}

// @Injectable()
// export class BoardRepository {
//     constructor(
//         @InjectRepository(Board)
//         private readonly boardRepository: Repository<Board>,
//     ) {}