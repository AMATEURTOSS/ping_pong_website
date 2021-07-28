import { Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Match{
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	winner_id: string;
	@Column()
	loser_id: string;
	@Column()
	winner_score: number;
	@Column()
	loser_score: number;	
	@Column()
	type: string;
  @CreateDateColumn()
  createdAt: Date;
	@Column()
	time: Date;
}