import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Applicationstatus } from '../../applicationstatus/entities/applicationstatus.entity';
import { Sourcecode } from '../../sourcecode/entities/sourcecode.entity';
import { Scan } from '../../scans/entities/scan.entity';
import { User } from '../../auth/entities/user.entity';
import { UsersApplication } from "src/users-applications/entities/users-application.entity";
import { IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Checkmarx } from "src/checkmarx/entities/checkmarx.entity";
import { Cost } from "src/cost/entities/cost.entity";

@Entity('tbl_aplicaciones')
export class Application {

    @PrimaryGeneratedColumn('identity')
    idu_aplicacion: number;

    @Column({ type: 'bigint' })
    idu_proyecto: string;

    @Column({type: 'varchar', length:255})
    nom_aplicacion: string;

    @Column()
    @IsNumber()
    @Type(() => Number)
    num_accion: number;

    @Column()
    @IsNumber()
    @Type(() => Number)
    opc_lenguaje: number;

    @Column()
    @IsNumber()
    @Type(() => Number)
    opc_estatus_doc: number;

    @Column()
    @IsNumber()
    @Type(() => Number)
    opc_estatus_doc_code: number;

    @Column()
    @IsNumber()
    @Type(() => Number)
    opc_estatus_caso: number;

    @Column()
    @IsNumber()
    @Type(() => Number)
    opc_estatus_calificar: number;

    @Column({ type: 'jsonb', default: { "1": false, "2": false, "3": false, "4": false } })
    opc_arquitectura: Record<string, boolean>;
    // @CreateDateColumn({ type: 'timestamp' })
    // created_at: Date;
  
    // @UpdateDateColumn({ type: 'timestamp' })
    // updated_at: Date;

    @ManyToOne(
        () => Applicationstatus, applicationstatus => applicationstatus.application,
        { eager:true }
    )
    @JoinColumn({ name: 'clv_estatus' })
    applicationstatus: Applicationstatus

    @ManyToOne(
        () => Sourcecode, sourcecode => sourcecode.application,
        { eager:true }
    )
    @JoinColumn({ name: 'idu_codigo_fuente' })
    sourcecode: Sourcecode

    @ManyToOne(
        () => User, user => user.application,
        { eager:true }
    )
    @JoinColumn({ name: 'idu_usuario' })
    user: User

    @OneToMany(() => UsersApplication, usuariosAplicaciones => usuariosAplicaciones.aplicacion)
    usuariosXAplicaciones: UsersApplication[];

    @OneToMany(() => Scan, scan => scan.application)
    scans: Scan[];

    @OneToMany(() => Checkmarx, checkmarx => checkmarx.application)
    checkmarx: Checkmarx[];

    @OneToMany(() => Cost, cost => cost.application)
    cost: Cost[];

}
