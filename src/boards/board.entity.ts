import { BoardStatus } from "./board-status.enum";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 아래 데코가 붙어있는 클래스는 entity임을 나타냄
@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;
}