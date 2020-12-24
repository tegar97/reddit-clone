import { IsEmail, isEmail, Length, Min, min } from "class-validator";
import {Entity as ToEntity , PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";
import bcrypt  from 'bcrypt'
import { classToPlain,Exclude } from "class-transformer";
import Entity from './Entity'

@ToEntity("users")
export default class User extends Entity {
    constructor(user: Partial<User>){
        super()
        Object.assign(this,user)
    }
  

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



    @BeforeInsert() 
    async hashPassword() {
        this.password = await bcrypt.hash(this.password,6)
    }

    
       
}
