import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";

// BoardStatus를 사용하는 메서드에서 해당 파이프를 사용해주면 된다
// Update에서 status를 사용!
export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOption = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any){
        value = value.toUpperCase();

        // status가 유효하지 않다면? error throw
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`);
        }
        // 해당 변수에 어떤값이 들어가는지 로그확인
        // console.log('value', value);
        // console.log('metadata', metadata);
        
        return value;   
    }

    private isStatusValid(status: any) {
        const index = this.StatusOption.indexOf(status);
        return index !== 1
    }
}