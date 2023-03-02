import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common/decorators';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

// 들어오는 요청을 처리하고 클라이언트에 응답을 반환
@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {} 

    // 모든 게시물의 데이터를 가져올 수 있는 핸들러
    @Get('/')
    getAllBoard(): Board[] { 
        // 여기 리턴값도 서비스의 Board[]이 오게 되는것.
        // 따라서 메서드의 형식도 배열로 지정해주자.
        return this.boardsService.getAllBoards();
    }

    @Post()
    // 핸들러Lv의 파이프 생성, 유효성체크 파이프
    @UsePipes(ValidationPipe)
    createBoard(
        // @Body('title') title: string,
        // @Body('description') description: string
        @Body() createBoardDto: CreateBoardDto
    ): Board { 
    // service에서 리턴해주는값이 board 하나기 때문에 []을 형식에 넣지않는다
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    // 특정값이 아닌 두가지 이상을 찾아오고 싶을 땐
    // (@Param() params: string[]) 의 형태로 적어주면 된다
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id)
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }
    
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
    
}    