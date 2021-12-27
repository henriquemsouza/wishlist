import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import WishlistEntity from "./WishlistEntity";

@Entity("customer")
class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => WishlistEntity, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "wishlist_id" })
  wishlist: WishlistEntity;
}

export default CustomerEntity;
