import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { PortfolioMap } from '../models/portfolio-map';
export declare class PortfolioRepository extends DefaultCrudRepository<PortfolioMap, typeof PortfolioMap.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
