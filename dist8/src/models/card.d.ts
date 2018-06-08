import { Entity } from '@loopback/repository';
export declare class Card extends Entity {
    id?: number;
    name: string;
    number: number;
    expiry_day: number;
    expiry_month: number;
    secure_code: string;
    getId(): number | undefined;
}
