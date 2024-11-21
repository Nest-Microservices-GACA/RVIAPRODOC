import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Position } from "../../positions/entities/position.entity";
import { Application } from '../../applications/entities/application.entity';
import { UsersApplication } from "src/users-applications/entities/users-application.entity";


@Entity('cat_colaborador')
export class User {

    @PrimaryGeneratedColumn('identity')
    idu_usuario: string;

    @Column({
        type: 'varchar', 
        length:255, 
        unique:true
    })
    numero_empleado: string;

    @Column({
        type: 'varchar', 
        length:255, 
        unique:true
    })
    nom_correo: string;

    @Column('text', {
        select: false
    })
    nom_contrasena: string;

    @Column({
        type: 'varchar', 
        length:255,
    })
    nom_usuario: string;

    @Column('bool', {
        default: true
    })
    esactivo: boolean;

    // @CreateDateColumn({ type: 'timestamp' })
    // created_at: Date;
  
    // @UpdateDateColumn({ type: 'timestamp' })
    // updated_at: Date;

    @ManyToOne(
        () => Position, position => position.user,
        { eager:true }
    )
    @JoinColumn({ name: 'idu_rol' })
    position: Position

    @OneToMany(
        () => Application, application => application.applicationstatus,
    )
    application:Application[]

    @OneToMany(() => UsersApplication, usuariosAplicaciones => usuariosAplicaciones.usuario)
    usuariosXAplicaciones: UsersApplication[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.nom_correo = this.nom_correo.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
