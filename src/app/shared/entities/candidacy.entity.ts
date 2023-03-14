import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { JobEntity } from "./job.entity";

@Entity({
    name: "candidacy",
})
export class CandidacyEntity {
    @PrimaryColumn({
        name: "id_candidate",
    })
    idCandidate: string;

    @PrimaryColumn({
        name: "id_job",
    })
    idJob: string;

    @Column({
        name: "id_sucesso",
    })
    indSucesso: boolean;

    @Column()
    dtCandidacy: Date;

    @ManyToOne(() => UserEntity, {
        eager: true,
    })
    @JoinColumn({
        name: "id_candidate",
    })
    candidate: UserEntity;

    @ManyToOne(() => JobEntity, {
        eager: true,
    })
    @JoinColumn({
        name: "id_job",
    })
    job: JobEntity;
}
