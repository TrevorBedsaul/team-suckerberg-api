import { Entity, property, model } from "@loopback/repository";


@model({
    name: "portfolio-map"
})
export class PortfolioMap extends Entity {
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
        required: true
    })
    percentage: number;

    @property({
        type: 'number',
        required: true
    })
    charity_id: number;
}