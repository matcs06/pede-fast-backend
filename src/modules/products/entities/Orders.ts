import { v4 as uuidv4 } from 'uuid';

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm"

@Entity("orders")
class Orders {
   @PrimaryColumn()
   id?: string;

   @Column()
   customer_name: string;

   @Column()
   customer_address: string;

   @Column()
   customer_phone: string;

   @Column()
   adm_user_id: string;

   @Column('text', { array: true, nullable: true })
   producs_ids: string[] // será passado id ao lado da quantidade, ex: 123asd-2312asd-a2233-asdas | 2

   @Column()
   product: string;

   @Column()
   status: "opened" | "closed"

   @CreateDateColumn()
   created_at: Date;

   constructor() {
      if (!this.id) {
         this.id = uuidv4();
      }
   }
}

export { Orders };
