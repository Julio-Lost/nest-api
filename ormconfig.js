module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'database',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'somePassword',
  database: process.env.DB_DATABASE || 'nest_api',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
