import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column('text', {unique: true})
	brand: string

	@Column('text')
	model: string 
}