import { IsEmail, isEmail, Length, Min, min } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";
import bcrypt  from 'bcrypt'
import { classToPlain,Exclude } from "class-transformer";
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

    @Exclude()
    @Index()
    @Length(6,255,{message: 'password must length than 3'})
    @Column()
    password: string;

    @Length(3,10,{message: 'username must length than 3'})
    @Column({unique: true})
    username: string

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @BeforeInsert() 
    async hashPassword() {
        this.password = await bcrypt.hash(this.password,6)
    }

    toJSON(){
        return classToPlain(this)
    }
       
}
