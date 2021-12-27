import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}

export default WishlistEntity;
