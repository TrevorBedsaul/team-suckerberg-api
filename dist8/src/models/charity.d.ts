import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: string;
    mission: string;
    category: string;
    websiteUrl: string;
    logoUrl: string;
    imageUrl: string;
    getId(): number | undefined;
}
