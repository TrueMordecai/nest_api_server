import * as bcryptjs from 'bcryptjs';
import { DiscordAuthEntity } from 'src/auth/entities/DiscordAuthEntity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => DiscordAuthEntity, (discordAuth) => discordAuth.user)
  discordAuth: Relation<DiscordAuthEntity>;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }// @Column()
  // accessToken: string;
}
