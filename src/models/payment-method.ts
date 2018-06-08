import { Entity, property, model } from '@loopback/repository';
import { Card } from '../models/card';
import { User } from './user';

@model({
    name: "payment-method"
})
export class PaymentMethod extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        required: true
    })
    user_id: number;


    @property({
        type: 'number',
    })
    card_id: number;

    // @property({
    //     type: 'PayPal',
    //     required: true
    // })
    // paypal: PayPal;

    // @property({
    //     type: 'WireTransfer',
    //     required: true
    // })
    // wire: WireTransfer;

    getId() {
        return this.id;
    }
}