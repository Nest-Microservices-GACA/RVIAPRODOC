import { Application } from "./application.entity";
import { User } from "./user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('usuarios_x_aplicaciones')
export class UsersApplication {

    @PrimaryGeneratedColumn('identity')
    idu: number;

    @Column()
    idu_usuario: number;
  
    @Column()
    idu_aplicacion: number;
  
    @ManyToOne(() => User, usuario => usuario.usuariosXAplicaciones)
    @JoinColumn({ name: 'idu_usuario' })
    usuario: User;
  
    @ManyToOne(() => Application, aplicacion => aplicacion.usuariosXAplicaciones)
    @JoinColumn({ name: 'idu_aplicacion' })
    aplicacion: Application;

}
