import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { BoardRepository } from "./board.repository";
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardsService {

    constructor(
        // 이 서비스에서 (BoardRepo...) 이용한다고 변수 선언
        // @CustomRepo.. 사용시 @InjectRepository()를 쓰면 오류발생
        private boardRepository: BoardRepository) {}

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;
        
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })
        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        // findOne(id) 인식되지 않아 findOneBy({ id:id }) 코드변경
        const found = await this.boardRepository.findOneBy({ id:id })

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
        return found;
    }
} 