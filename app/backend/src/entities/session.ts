import { Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn, Column, Timestamp } from 'typeorm';

@Entity()
export class Session{
	@PrimaryColumn()
	sid: string;
	@Column()
	session: string;
  @Column({type: "timestamp", precision: 6})
	expire: Date;
}