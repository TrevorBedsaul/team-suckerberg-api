import { Entity } from '@loopback/repository';
export declare class PaymentMethod extends Entity {
    id?: number;
    user_id: number;
    card_id: number;
    getId(): number | undefined;
}
