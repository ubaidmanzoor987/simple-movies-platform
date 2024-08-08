import { Movie } from 'src/movies/entities/movie.entity';
import { Users } from 'src/user/entities/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export async function getDatabaseConfig(): Promise<DataSourceOptions> {
    try {
        return {
            type: process.env.DB_TYPE as 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE,
            entities: [Users, Movie],
            synchronize: true, // Recommended to be false for production
            logging: true,
        };
    } catch (error) {
        console.error('Failed to get database configuration', error);
        throw new Error('Failed to get database configuration');
    }
}

export async function ensureInitializedDataSource(): Promise<DataSource> {
    try {
        const config = await getDatabaseConfig();
        const dataSource = new DataSource(config);

        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        return dataSource;
    } catch (error) {
        throw error;
    }
}
