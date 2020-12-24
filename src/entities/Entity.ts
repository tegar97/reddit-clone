import { PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";
import { classToPlain } from "class-transformer";
export default abstract class Entity extends BaseEntity {
 
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

   
    toJSON(){
        return classToPlain(this)
    }
       
}
