import { IsEmail, isEmail, Length, Min, min } from "class-validator";
import {Entity as ToEntity , PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import bcrypt  from 'bcrypt'
import { classToPlain,Exclude } from "class-transformer";
import Entity from './Entity'
import User from "./User";
import {makeid,SlugGenerete} from './../util/helper'
import Sub from "./subs";
import Comment from './Comments';

@ToEntity("post")
export default class Post extends Entity {
    constructor(post: Partial<Post>){
        super()
        Object.assign(this,post)
    }

    @Index()
    @Column()
    identifier: string // 7 Character Id
  
    @Column()
    title: string
  
    @Index()
    @Column()
    slug: string
  
    @Column({ nullable: true, type: 'text' })
    body: string
  
    @Column()
    subName: string
  
    @ManyToOne(() => User, (user) => user.post)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User
    
    
    @ManyToOne(() => Sub, (sub) => sub.posts)
    @JoinColumn({ name: 'subName', referencedColumnName: 'name' })
    sub: Sub

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]
    
    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeid(7)
        this.slug = SlugGenerete(this.title)
    }
    

   
}
