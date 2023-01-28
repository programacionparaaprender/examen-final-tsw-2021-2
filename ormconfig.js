module.exports = {
  //type: 'mssql',
  //url: 'mssql://sa:123@localhost:1433/banking-ddd-nest',//process.env.MYSQL_UNMSM_BANKING_NEST_URL,
  //type: 'mysql',
  //url: 'mysql://root:@localhost:3306/examenfinal',//process.env.BANKING_DDD_NEST_MYSQL,
  type: 'mysql',
  url: 'mysql://root:12345678@examenfinal.crsvj1zxgap8.us-east-2.rds.amazonaws.com:3306/examenfinal',//process.env.BANKING_DDD_NEST_MYSQL,
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  bigNumberStrings: false,
 
  entities: [process.env.ENVIRONMENT == 'prod' ? '**/infrastructure/persistence/typeorm/entities/*.js' : 'dist/**/infrastructure/persistence/typeorm/entities/*.js'],
  migrations: [process.env.ENVIRONMENT == 'prod' ? 'common/infrastructure/persistence/typeorm/migrations/*.js' : 'dist/common/infrastructure/persistence/typeorm/migrations/*.js'],
  cli: {
    migrationsDir: process.env.ENVIRONMENT == 'prod' ? 'common/infrastructure/persistence/typeorm/migrations' : 'src/common/infrastructure/persistence/typeorm/migrations',
  },
};