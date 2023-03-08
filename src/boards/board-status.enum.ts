// 인터페이스는 Local 기준으로 작성되었고 entity에서 대체하므로 필요없음.

// export interface Board {
//     id: string;
//     title: string;
//     description: string;
//     status: BoardStatus;
// }

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}