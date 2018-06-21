import { Entity } from '@loopback/repository';
export declare class Donation extends Entity {
    id?: number;
    user_id: number;
    amount: number;
    charity_id: number;
    getId(): number | undefined;
}
