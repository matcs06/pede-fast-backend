import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid"

@Entity("delivery")
class Delivery {
   @PrimaryColumn()
   id: string;

   @Column()
   tax: string;

   @Column()
   deativate_delivery: boolean;

   @Column()
   has_discount: boolean;

   @Column()
   condition: string;

   @Column()
   parameter: string;

   @Column()
   discount_percentage: string;

   @Column()
   user_id: string;

   @CreateDateColumn()
   created_at: Date;

   constructor() {
      if (!this.id) {
         this.id = uuidv4();
      }
   }

}

export { Delivery }