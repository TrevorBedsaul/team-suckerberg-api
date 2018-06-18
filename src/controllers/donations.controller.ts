import { repository } from "@loopback/repository";
import { request } from "http";
import { UserRepository } from "../repositories/user.repository";
import { DonationRepository } from "../repositories/donation.repository";
import { CharityRepository } from "../repositories/charity.repository";
import { PortfolioRepository } from "../repositories/portfolio-map.repository";
import { post, get, requestBody, param, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { Charity } from "../models/charity";
import { Donation } from "../models/donation";
import { PortfolioMap } from "../models/portfolio-map";

export class DonationsController {

    constructor(
        @repository(DonationRepository) private userRepo: UserRepository,
        @repository(CharityRepository) private charityRepo: CharityRepository,
        @repository(DonationRepository) private donationRepo: DonationRepository,
        @repository(PortfolioRepository) private portfolioRepo: PortfolioRepository
    ) { }

    @post('/donation')
    async makeDonation(@requestBody() donation: Donation): Promise<Donation> {
        if (!(await this.userRepo.count({ id: donation.user_id }))) {
            throw new HttpErrors.Unauthorized('user does not exist');
        }

        if (!(await this.charityRepo.count({ id: donation.charity_id }))) {
            throw new HttpErrors.Unauthorized('charity does not exist');
        }

        if( donation.amount <= 0 ) {
            throw new HttpErrors.Unauthorized('amount is less than or equal to 0');
        }
        console.log("test");

        return await this.donationRepo.create(donation);
    }

    @get('/portfolio/{id}')
    async getPortfolio(@param.path.number('user_id') user_id: number): Promise<Array<Charity>>{  
        let charities = Array<any>();
        var portMap = await this.portfolioRepo.find({
            where:
            {
                user_id: user_id,
            }
        });

        portMap.forEach(element => {
            var temp = this.charityRepo.findById(element.charity_id);
            charities.push(temp);
        });
        return charities;
    }
}