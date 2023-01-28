import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637301014705 implements MigrationInterface {
    name = 'InitialSchema1637301014705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE [banking-ddd-nest].dbo.accounts (id bigint IDENTITY(1,1) NOT NULL, number varchar(15) NOT NULL, balance decimal(10,2) NULL, currency varchar(3) NULL, customer_id bigint NOT NULL, created_at datetime NULL, created_by bigint NULL, updated_at datetime NULL, updated_by bigint NULL, CONSTRAINT [PK_accounts] PRIMARY KEY([id]))');
        await queryRunner.query("CREATE TABLE [banking-ddd-nest].dbo.customers (id bigint IDENTITY(1,1) NOT NULL, [type] varchar(1) NOT NULL DEFAULT 'C', created_at datetime NULL, created_by bigint NULL, updated_at datetime NULL, updated_by bigint NULL, company_name varchar(150) NULL, ruc varchar(11) NULL, first_name varchar(75) NULL, last_name varchar(75) NULL, dni varchar(8) NULL, CONSTRAINT [PK_customers] PRIMARY KEY([id]))");
        await queryRunner.query('CREATE TABLE [banking-ddd-nest].dbo.transactions (id bigint IDENTITY(1,1) NOT NULL, [type] char(1) NOT NULL, status tinyint NOT NULL, account_id_from bigint NOT NULL, account_id_to bigint  NULL, amount decimal(10,2) NULL, currency varchar(3) NULL, created_at datetime NULL, created_by bigint NULL, updated_at datetime NULL, updated_by bigint NULL, CONSTRAINT [PK_transactions] PRIMARY KEY([id]))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE [banking-ddd-nest].dbo.transactions');
        //await queryRunner.query('DROP INDEX UQ_customers_dni ON banking-ddd-nest.customers');
        //await queryRunner.query('DROP INDEX UQ_customers_company_name ON banking-ddd-nest.customers');
        //await queryRunner.query('DROP INDEX UQ_customers_ruc ON banking-ddd-nest.customers');
        await queryRunner.query('DROP TABLE [banking-ddd-nest].dbo.customers');
        //await queryRunner.query('DROP INDEX UQ_accounts_number ON banking-ddd-nest.accounts');
        await queryRunner.query('DROP TABLE [banking-ddd-nest].dbo.accounts');
    }

}
