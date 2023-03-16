import {
    Body, Controller, Get, Param, Post, Delete, ParseIntPipe,
    Patch, UsePipes, ValidationPipe, UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";

@Controller('boards')
@UseGuards(AuthGuard()) // 컨트롤러 레벨로 deco..를 지정(모든 핸들러가 영향)
export class BoardsController {
    // 서비스에 Repository를 넣고 생성자로 서비스를 불러오자
    constructor(private boardsService: BoardsService) { }
    
    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise <Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
}