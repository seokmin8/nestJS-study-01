import { BoardStatus } from "./board-status.enum";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/user.entity";

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

    // 반대는 OneToMany()
    // 여기 board의 게시물은 여러개, user는 1명(순서)
    @ManyToOne(type => User, user => user.boards, { eager: false })
    user: User;
}