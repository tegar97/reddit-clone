import { IsEmail, isEmail, Length, Min, min } from "class-validator";
import {Entity as ToEntity , PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";
import bcrypt  from 'bcrypt'
import { classToPlain,Exclude } from "class-transformer";
import Entity from './Entity'

@ToEntity("post")
export default class Post extends Entity {
    constructor(post: Partial<Post>){
        super()
        Object.assign(this,post)
    }

    @Column()
    identifier:string

    @Column()
    title:string

    @Column()
    slug:string

    @Column({nullable: true,type: 'text'})
    body:string

    @Column()
    subName:string
   
}
