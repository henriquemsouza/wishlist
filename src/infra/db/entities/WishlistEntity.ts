import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CustomerEntity from "./CustomerEntity";
import WishlistItemEntity from "./WishlistItemEntity";

@Entity("wishlist")
class WishlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  brand: string;

  @Column()
  // tslint:disable-next-line: variable-name
  product_id: string;

  @Column()
  title: string;

  @OneToMany(() => WishlistItemEntity, (item) => item.wishlist, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  items: WishlistItemEntity[];

  @OneToOne(() => CustomerEntity, (order) => order.wishlist, { nullable: false })
  @JoinColumn({ name: "customer_id" })
  customer: CustomerEntity;
}

export default WishlistEntity;
