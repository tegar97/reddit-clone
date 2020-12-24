import {Entity as ToEntity , PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ManyToMany, OneToMany} from "typeorm";
import bcrypt  from 'bcrypt'
import Entity from './Entity'
import User from "./User";
import Post from "./Post";
import { makeid } from "../util/helper";

@ToEntity("comments")
export default class Comments extends Entity {
    constructor(comment: Partial<Comments>){
        super()
        Object.assign(this,comment)
    }

    @Column()
    identifier: string

    @Column()
    body: string

    @Column()
    username: string

    @ManyToOne(() => User)
    @JoinColumn({name: 'username',referencedColumnName: 'username'})
    user: User

    @ManyToOne(() => Post,post => post.comments)
    post: Post


    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeid(8)
    }

    


    

   
}
