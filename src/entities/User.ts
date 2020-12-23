import { IsEmail, isEmail, Min, min } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
    constructor(user: Partial<User>){
        super()
        Object.assign(this,user)
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @IsEmail()
    @Column({unique: true})
    email: string;

    @Index()
    @Min(6,{message: "Password must length than 6"})
    @Column()
    password: string;

    @Min(3)
    @Column({unique: true})
    username: string

}
