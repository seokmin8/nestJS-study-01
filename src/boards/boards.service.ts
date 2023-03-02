import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

// service 안에서는 db관련 로직을 처리, db에서 데이터를 가져오거나
// db안에 게시판 생성 및 생성된 게시판 정보를 넣어주는 등의 로직 처리.
// cli를 이용해 서비스 생성 시 injectable 데코레이터가 있다! module에도 자동 추가됨
// nestJS는 이것을 이용해 다른 컴포넌트에서 이 서비스를 사용할 수 있게함
// 컨트롤러에서 서비스를 이용할 수 있게 하려면 (의존성 주입!)
@Injectable()
export class BoardsService {
    private boards: Board[] = []; 
    // 게시물은 하나가 아닌 여러개가 존재하게 될거니깐 배열로 지정 되어야한다.
    // boards에 대한 정보가 = []에 들어간다
    // 모델은 이미 생성했고 그의 데이터 형식은 정의되어 있으니
    // boards의 데이터타입도 모델에 정의되어있는 타입으로 지정해준다

    // 모든 게시물 보기
    getAllBoards(): Board[] {
        return this.boards;
        // 리턴값은 위 boards의 형식처럼 배열이 된다.
        // 메서드의 형식 또한 배열로 지정
    }
    // dto 생성 전 아래처럼 되어있음.
    // createBoard(title: string, description: string) {
    
    // 게시물 생성
    createBoard(createBoardDto: CreateBoardDto) {    
        // 데이터형식을 지정해주면 에러발생! 
        // 왜? 모든 게시물에는 유니크 id값이 필요하다. 여기엔 없어서!
        
        // dto 생성 후 아래처럼 정의
        const { title, description } = createBoardDto;
               
        const board: Board = {
            id: uuid(),
            // title: title, 이런형태가 아래처럼 생략가능
            title,
            description,
            status: BoardStatus.PUBLIC
        }
        // push메서드를 사용해 create 메서드의 board값이 인수로 들어감
        // title과 desc이 사용되어 새로운 게시물 생성, []에 포함되게 된다.
        this.boards.push(board);
        // 어떤정보가 사용되어 게시물이 만들어졌는지 status를 포함해 리턴!
        return board;
    }

    // 특정 게시물 가져오기(보기)
    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);

        if(!found) {
            throw new NotFoundException(`Can't find Board with your id ${id}`);
        }
        return found;
    }

    // 특정 게시물 지우기
    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }


}
