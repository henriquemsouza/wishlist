import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import CustomerEntity from "./CustomerEntity";
import WishlistItemEntity from "./WishlistItemEntity";

@Entity("wishlist")
class WishlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WishlistItemEntity, (item) => item.wishlist, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  items: WishlistItemEntity[];

  @OneToOne(() => CustomerEntity, (order) => order.wishlist, {
    nullable: false,
  })
  @JoinColumn({ name: "customer_id" })
  customer: CustomerEntity;
}

export default WishlistEntity;
