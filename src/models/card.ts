import { Entity, property, model } from '@loopback/repository';

@model({
    name: "card"
})
export class Card extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
        required: true
    })
    name: string;
    
    @property({
        type: 'number',
        required: true
    })
    number: number;

    @property({
        type: 'number',
        required: true
    })
    expiry_day : number;

    @property({
        type: 'number',
        required: true
    })
    expiry_month: number;

    @property({
        type: 'string',
        required: true
    })
    secure_code: string;

    getId() {
        return this.id;
    }
}