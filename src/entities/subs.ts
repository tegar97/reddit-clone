import {Entity as ToEntity , PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ManyToMany, OneToMany} from "typeorm";
import bcrypt  from 'bcrypt'
import Entity from './Entity'
import User from "./User";
import Post from "./Post";

@ToEntity("subs")
export default class Sub extends Entity {
    constructor(sub: Partial<Sub>){
        super()
        Object.assign(this,sub)
    }

    @Column({unique: true})
    name:string

    @Column({nullable: true})
    title:string

   
    @Column({type: 'text' ,nullable: true})
    description : string

       
    @Column({nullable: true})
    imageUrn : string

       
    @Column({nullable: true})
    bannerUrn : string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @OneToMany(() => Post,post => post.subName)
    posts: Post[]
    

   
}
