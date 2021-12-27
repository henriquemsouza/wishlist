import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import WishlistEntity from "./WishlistEntity";

@Entity("wishlist_item")
class WishlistItemEntity {
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

  @ManyToOne(() => WishlistEntity, (order) => order.items, { nullable: false })
  @JoinColumn({ name: "wishlist_id" })
  wishlist: WishlistEntity;
}

export default WishlistItemEntity;
