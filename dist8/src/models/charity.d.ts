import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: string;
    username: string;
    password: string;
    getId(): number | undefined;
}
