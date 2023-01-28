import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1641606876296 implements MigrationInterface {
    name = 'InitialSchema1641606876296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`accounts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`number\` varchar(15) NOT NULL, \`balance\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`customer_id\` bigint UNSIGNED NOT NULL, \`created_at\` varchar(20) NOT NULL  default CURRENT_TIMESTAMP, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, UNIQUE INDEX \`UQ_accounts_number\` (\`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        //await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`customers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` enum ('C', 'P') NOT NULL DEFAULT 'C', \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, \`company_name\` varchar(150) NULL, \`ruc\` varchar(11) NULL, \`first_name\` varchar(75) NULL, \`last_name\` varchar(75) NULL, \`dni\` varchar(8) NULL, UNIQUE INDEX \`UQ_customers_ruc\` (\`ruc\`), UNIQUE INDEX \`UQ_customers_company_name\` (\`company_name\`), UNIQUE INDEX \`UQ_customers_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        //await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`transactions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` char(1) NOT NULL, \`status\` tinyint(2) UNSIGNED NOT NULL, \`account_id_from\` bigint UNSIGNED NOT NULL, \`account_id_to\` bigint UNSIGNED NULL, \`amount\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    
    
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`examenfinal\`.\`accounts\` (id bigint UNSIGNED NOT NULL AUTO_INCREMENT, number varchar(15) NOT NULL, balance decimal(10,2) NULL, currency varchar(3) NULL, customer_id bigint UNSIGNED NOT NULL, created_at varchar(20) NOT NULL  default CURRENT_TIMESTAMP, created_by bigint NULL, updated_at varchar(20) NOT NULL, updated_by bigint NULL, UNIQUE INDEX UQ_accounts_number (number), CONSTRAINT PK_accounts PRIMARY KEY(id)) ENGINE=InnoDB;`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`examenfinal\`.\`customers\` (id bigint UNSIGNED NOT NULL AUTO_INCREMENT, type varchar(1) NOT NULL DEFAULT 'C', created_at  varchar(20) NOT NULL  default CURRENT_TIMESTAMP, created_by bigint NULL, updated_at  varchar(20) NOT NULL, updated_by bigint NULL, company_name varchar(150) NULL, ruc varchar(11) NULL, first_name varchar(75) NULL, last_name varchar(75) NULL, dni varchar(8) NULL, UNIQUE INDEX UQ_customers_ruc (ruc), UNIQUE INDEX UQ_customers_company_name (company_name), UNIQUE INDEX UQ_customers_dni (dni), CONSTRAINT PK_customers PRIMARY KEY(id)) ENGINE=InnoDB;`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`examenfinal\`.\`transactions\` (id bigint UNSIGNED NOT NULL AUTO_INCREMENT, type char(1) NOT NULL, status tinyint(2) UNSIGNED NOT NULL, account_id_from bigint UNSIGNED NOT NULL, account_id_to bigint UNSIGNED NULL, amount decimal(10,2) NULL, currency varchar(3) NULL, created_at  varchar(20) NOT NULL  default CURRENT_TIMESTAMP, created_by bigint NULL, updated_at  varchar(20) NOT NULL, updated_by bigint NULL, CONSTRAINT PK_transactions PRIMARY KEY(id)) ENGINE=InnoDB;`);
        

          await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`examenfinal\`.\`convocatorias\` (
            id bigint NOT NULL AUTO_INCREMENT,
          convocatoriaName varchar(255) NOT NULL,
          created_at   varchar(20) NOT NULL default CURRENT_TIMESTAMP,
          created_by bigint NOT NULL,
          updated_at   varchar(20)  NULL,
          updated_by bigint NULL,
          state int not null default 1,
        UNIQUE KEY UQ_convocatoria_name (convocatoriaName),
        KEY IK_convocatorias_users_created (created_by),
        KEY IK_convocatorias_users_updated (updated_by),
          CONSTRAINT PK_convocatorias PRIMARY KEY(id),
          CONSTRAINT FK_convocatorias_users_created FOREIGN KEY(created_by) REFERENCES users(id),
          CONSTRAINT FK_convocatorias_users_updated FOREIGN KEY(updated_by) REFERENCES users(id)
        )ENGINE=InnoDB;`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`examenfinal\`.\`postulantes\` (
            id bigint NOT NULL AUTO_INCREMENT,
            first_name varchar(75) NULL, 
            last_name varchar(75) NULL, 
            dni varchar(8) NULL, 
        state int not null default 1,
              created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
              created_by bigint NOT NULL,
              updated_at   varchar(20) NULL,
              updated_by bigint NULL,
              
              CONSTRAINT PK_postulantes PRIMARY KEY(id),
              CONSTRAINT FK_postulantes_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
              CONSTRAINT FK_postulantes_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
    
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`detalle_convocatoria\` (
            id bigint NOT NULL AUTO_INCREMENT,
            convocatoria_id bigint NOT NULL,
            postulante_id bigint NOT NULL, 
              created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
              created_by bigint NOT NULL ,
              updated_at datetime NULL,
              updated_by bigint NULL,
              state int not null default 1,
          calificacion int default 0,
              CONSTRAINT PK_detalle_convocatoria PRIMARY KEY(id),
            CONSTRAINT FK_detalle_convocatoria_id_created FOREIGN KEY(convocatoria_id) REFERENCES convocatorias(id),
            CONSTRAINT FK_detalle_postulante_id_created FOREIGN KEY(postulante_id) REFERENCES postulantes(id),
          CONSTRAINT FK_detalle_convocatoria_users_created FOREIGN KEY(created_by) REFERENCES users (id),
          CONSTRAINT FK_detalle_convocatoria_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`); 

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`examenfinal\`.\`departments\` (id varchar(2) NOT NULL,name varchar(45) NOT NULL,CONSTRAINT PK_departments PRIMARY KEY(id),UNIQUE KEY UQ_departments_name (name)) ENGINE=InnoDB;`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`examenfinal\`.\`provinces\` (id varchar(4) NOT NULL,name varchar(45) NOT NULL,department_id varchar(2) NOT NULL,CONSTRAINT PK_provinces PRIMARY KEY(id),UNIQUE KEY UQ_provinces_name_department_id (name, department_id),KEY IX_provinces_department_id (department_id),CONSTRAINT FK_provinces_department_id FOREIGN KEY (department_id) REFERENCES departments (id)) ENGINE=InnoDB;`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`examenfinal\`.\`districts\` (id varchar(6) NOT NULL,name varchar(45) NOT NULL,province_id varchar(4) NOT NULL,CONSTRAINT PK_districts PRIMARY KEY(id),UNIQUE KEY UQ_districts_name_province_id (name, province_id),KEY IX_districts_province_id (province_id),CONSTRAINT FK_districts_province_id FOREIGN KEY (province_id) REFERENCES provinces (id)) ENGINE=InnoDB;`);
          

          await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`examenfinal\`.\`users\` (
            id bigint NOT NULL AUTO_INCREMENT,
            email varchar(255) NOT NULL,
            district_id varchar(6) NOT NULL,
            CONSTRAINT PK_users PRIMARY KEY(id),
            UNIQUE KEY UQ_users_email (email),
            KEY IX_users_district_id (district_id),
            CONSTRAINT FK_users_district_id FOREIGN KEY (district_id) REFERENCES districts (id)
          ) ENGINE=InnoDB;`);


        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`clientes\` (
          id bigint NOT NULL AUTO_INCREMENT,
          first_name varchar(75) NULL, 
          last_name varchar(75) NULL, 
          dni varchar(8) NULL, 
          state int not null default 1,
            created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
            created_by bigint NOT NULL,
            updated_at   varchar(20) NULL,
            updated_by bigint NULL,
            
            CONSTRAINT PK_clientes PRIMARY KEY(id),
            CONSTRAINT FK_clientes_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
            CONSTRAINT FK_clientes_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
      
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`pacientes\` (
          id bigint NOT NULL AUTO_INCREMENT,
          first_name varchar(75) NULL, 
          last_name varchar(75) NULL, 
          dni varchar(8) NULL, 
          state int not null default 1,
            created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
            created_by bigint NOT NULL,
            updated_at   varchar(20) NULL,
            updated_by bigint NULL,
            cliente_id bigint NOT NULL,
            CONSTRAINT PK_pacientes PRIMARY KEY(id),
            CONSTRAINT FK_pacientes_clientes FOREIGN KEY(cliente_id)	REFERENCES clientes(id),
            CONSTRAINT FK_pacientes_users_created FOREIGN KEY(created_by)	REFERENCES users(id),
            CONSTRAINT FK_pacientes_users_updated FOREIGN KEY(updated_by) REFERENCES users(id)
        )ENGINE=InnoDB;`);
      
      
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`tipomedicos\` (
          id bigint NOT NULL AUTO_INCREMENT,
          nombre varchar(75) NULL, 
          descripcion varchar(75) NULL, 
          state int not null default 1,
          created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
          created_by bigint NOT NULL,
          updated_at   varchar(20) NULL,
          updated_by bigint NULL,	
          CONSTRAINT PK_tipomedicos PRIMARY KEY(id),
          CONSTRAINT FK_tipomedicos_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
          CONSTRAINT FK_tipomedicos_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
      
      
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`medicos\` (
          id bigint NOT NULL AUTO_INCREMENT,
          first_name varchar(75) NULL, 
          last_name varchar(75) NULL, 
          dni varchar(8) NULL, 
          state int not null default 1,
            created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
            created_by bigint NOT NULL,
            updated_at   varchar(20) NULL,
            updated_by bigint NULL,
            tipomedico_id bigint NOT NULL,
            CONSTRAINT PK_medicos PRIMARY KEY(id),
            CONSTRAINT FK_medicos_clientes FOREIGN KEY(tipomedico_id)	REFERENCES tipomedicos(id),
            CONSTRAINT FK_medicos_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
            CONSTRAINT FK_medicos_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
      
      
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`tipoprocedimientos\` (
          id bigint NOT NULL AUTO_INCREMENT,
          nombre varchar(75) NULL, 
          descripcion varchar(75) NULL, 
          state int not null default 1,
          created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
          created_by bigint NOT NULL,
          updated_at   varchar(20) NULL,
          updated_by bigint NULL,	
          CONSTRAINT PK_tipoprocedimientos PRIMARY KEY(id),
          CONSTRAINT FK_tipoprocedimientos_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
          CONSTRAINT FK_tipoprocedimientos_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
      
      
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`procedimientos\` (
          id bigint NOT NULL AUTO_INCREMENT,
          nombre varchar(75) NULL, 
          descripcion varchar(75) NULL, 
          state int not null default 1,
          created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
          created_by bigint NOT NULL,
          updated_at   varchar(20) NULL,
          updated_by bigint NULL,	
          tipoprocedimiento_id bigint NOT NULL,
          CONSTRAINT PK_procedimientos PRIMARY KEY(id),
          CONSTRAINT FK_procedimientos_tipoprocedimientos FOREIGN KEY(tipoprocedimiento_id)	REFERENCES tipoprocedimientos (id),
          CONSTRAINT FK_procedimientos_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
          CONSTRAINT FK_procedimientos_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
      
      
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`salas\` (
          id bigint NOT NULL AUTO_INCREMENT,
          nombre varchar(75) NULL, 
          descripcion varchar(75) NULL, 
          state int not null default 1,
          created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
          created_by bigint NOT NULL,
          updated_at   varchar(20) NULL,
          updated_by bigint NULL,
          aforo int not null default 30,	
          CONSTRAINT PK_salas PRIMARY KEY(id),
          CONSTRAINT FK_salas_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
          CONSTRAINT FK_salas_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
      
      
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`tipocitas\` (
          id bigint NOT NULL AUTO_INCREMENT,
          nombre varchar(75) NULL, 
          descripcion varchar(75) NULL, 
          state int not null default 1,
          created_at varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
          created_by bigint NOT NULL,
          updated_at varchar(20) NULL,
          updated_by bigint NULL,
          CONSTRAINT PK_tipocitas PRIMARY KEY(id),
          CONSTRAINT FK_tipocitas_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
          CONSTRAINT FK_tipocitas_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
      
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`citas\` (
          id bigint NOT NULL AUTO_INCREMENT,
          state int not null default 1,
          created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
          created_by bigint NOT NULL,
          updated_at   varchar(20) NULL,
          updated_by bigint NULL,
          tipocitas_id bigint NOT NULL,	
          paciente_id bigint NOT NULL,	
          CONSTRAINT PK_salas PRIMARY KEY(id),
          CONSTRAINT FK_citas_tipocitas FOREIGN KEY(tipocitas_id)	REFERENCES tipocitas (id),
          CONSTRAINT FK_citas_pacientes FOREIGN KEY(paciente_id)	REFERENCES pacientes (id),
          CONSTRAINT FK_citas_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
          CONSTRAINT FK_citas_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
      
      
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`facturasmedica\` (
          id bigint NOT NULL AUTO_INCREMENT,
          state int not null default 1,
          created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
          created_by bigint NOT NULL,
          updated_at   varchar(20) NULL,
          updated_by bigint NULL,
          total decimal(10,2) NULL,
          CONSTRAINT PK_facturasmedica PRIMARY KEY(id),
          CONSTRAINT FK_facturasmedica_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
          CONSTRAINT FK_facturasmedica_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
      
        await queryRunner.query(`CREATE TABLE \`examenfinal\`.\`detallefactura\` (
          id bigint NOT NULL AUTO_INCREMENT,
          state int not null default 1,
          created_at   varchar(20) NOT NULL  default CURRENT_TIMESTAMP,
          created_by bigint NOT NULL,
          updated_at   varchar(20) NULL,
          updated_by bigint NULL,
          citas_id bigint NOT NULL,
          pago decimal(10,2) NULL,
          total decimal(10,2) NULL,
          CONSTRAINT PK_detallefactura PRIMARY KEY(id),
          CONSTRAINT FK_detallefactura_facturasmedica FOREIGN KEY(citas_id)	REFERENCES citas (id),
          CONSTRAINT FK_detallefactura_users_created FOREIGN KEY(created_by)	REFERENCES users (id),
          CONSTRAINT FK_detallefactura_users_updated FOREIGN KEY(updated_by) REFERENCES users (id)
        )ENGINE=InnoDB;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`transactions\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_dni\` ON \`examenfinal\`.\`customers\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_company_name\` ON \`examenfinal\`.\`customers\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_ruc\` ON \`examenfinal\`.\`customers\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`customers\``);
        await queryRunner.query(`DROP INDEX \`UQ_accounts_number\` ON \`examenfinal\`.\`accounts\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`accounts\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`departments\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`provinces\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`districts\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`convocatorias\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`postulantes\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`detalle_convocatoria\``);


        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`clientes\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`pacientes\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`tipomedicos\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`medicos\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`procedimientos\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`salas\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`tipocitas\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`citas\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`facturasmedica\``);
        await queryRunner.query(`DROP TABLE \`examenfinal\`.\`detallefactura\``);
    }

}
