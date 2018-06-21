import { Entity, property, model } from '@loopback/repository';

@model({
    name: "charity"
})
export class Charity extends Entity {
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
        type: 'string',
        required: true
    })
    mission: string;

    @property({
        type: 'string',
        required: true
    })
    category: string;

    @property({
        type: 'string',
        required: true
    })
    websiteUrl: string;

    @property({
        type: 'string',
        required: true
    })
    logoUrl: string;

    @property({
        type: 'string',
        required: true
    })
    imageUrl: string;
    
    getId() {
        return this.id;
    }
}