import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // 반대는 ManyToOne()
    // 여기user는 user는 1명인데 게시글은 여러개
    @OneToMany(type => Board, board => board.user, { eager: true })
    boards: Board[]; 
}