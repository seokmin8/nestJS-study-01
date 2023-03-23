import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { BoardRepository } from "./board.repository";
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardsService {

    // 이 서비스에서 (BoardRepo...) 이용한다고 변수 선언
    // @CustomRepo.. 사용시 @InjectRepository()를 쓰면 오류발생
    constructor(
        private boardRepository: BoardRepository) {}
    
    async getAllBoards(
        user: User
    ): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });

        const boards = await query.getMany();

        return boards;
        // return this.boardRepository.find();
    }

    // create 로직은 Repository.ts에 정의 해두고 가져오기만 한다
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        // findOne(id) 인식되지 않아 findOneBy({ id:id }) 코드변경
        const found = await this.boardRepository.findOneBy({ id:id })

        // 찾는값이 없을 때
        if (!found) {
            throw new NotFoundException(`Can't find Board with this id >> ${id}`);
        }
        return found;
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        
        // delete 메서드에 user가 인식되지 않음
        const result = await this.boardRepository.delete({id, user : { id: user.id }});

        // const query = this.boardRepository.createQueryBuilder('board');
       
        // 지우고자 하는 id값이 없어도 확인이 되지 않기에 확인 로직 추가
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with this id >> ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board
    }
} 