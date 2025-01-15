import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";


export class Conversion{
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    value: number;

    @Column()
    symbol: string;
} 