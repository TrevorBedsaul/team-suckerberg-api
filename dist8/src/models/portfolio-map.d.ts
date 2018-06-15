import { Entity } from "@loopback/repository";
export declare class PortfolioMap extends Entity {
    id?: number;
    user_id: number;
    percentage: number;
    charity_id: number;
}
