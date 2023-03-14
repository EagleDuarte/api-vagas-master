import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { CandidacyEntity } from "./candidacy.entity";
import { UserEntity } from "./user.entity";

@Entity({
    name: "job",
})
export class JobEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    description: string;

    @Column()
    dtLimite: Date;

    @Column()
    indAtivo: boolean;

    @Column()
    maxCandidates: number;

    @Column({
        name: "id_recruiter",
    })
    idRecruiter: string;

    @CreateDateColumn({
        name: "created_at",
    })
    create: Date;

    @UpdateDateColumn({
        name: "updated_at",
    })
    update: Date;

    @ManyToOne(() => UserEntity, {
        eager: true,
    })
    @JoinColumn({
        name: "id_recruiter",
    })
    recruiter: UserEntity;

    @OneToMany(() => CandidacyEntity, (cand) => cand.job)
    candidaturas: CandidacyEntity[];
}
