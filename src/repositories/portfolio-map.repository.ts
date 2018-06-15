import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { PortfolioMap } from '../models/portfolio-map';

export class PortfolioRepository extends DefaultCrudRepository<
    PortfolioMap,
    typeof PortfolioMap.prototype.id
    > {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(PortfolioMap, datasource);
    }
}