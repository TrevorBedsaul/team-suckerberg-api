import { repository } from "@loopback/repository";
import { request } from "http";
import { UserRepository } from "../repositories/user.repository";
import { DonationRepository } from "../repositories/donation.repository";
import { CharityRepository } from "../repositories/charity.repository";
import { PortfolioRepository } from "../repositories/portfolio-map.repository";
import { post, get, requestBody, param, HttpErrors, del, patch } from "@loopback/rest";
import { User } from "../models/user";
import { Charity } from "../models/charity";
import { Donation } from "../models/donation";
import { PortfolioMap } from "../models/portfolio-map";

export class DonationsController {

    constructor(
        @repository(UserRepository) private userRepo: UserRepository,
        @repository(CharityRepository) private charityRepo: CharityRepository,
        @repository(DonationRepository) private donationRepo: DonationRepository,
        @repository(PortfolioRepository) private portfolioRepo: PortfolioRepository
    ) { }

    @get('/donations/{id}')
    async getDonations(@param.path.number('user_id') user_id: number): Promise<Array<Donation>> {
        return await this.donationRepo.find({
            where: {
                user_id: user_id
            }
        });
    }

    @post('/donation')
    async makeDonation(@requestBody() donation: Donation): Promise<Donation> {
        if (!(await this.userRepo.count({ id: donation.user_id }))) {
            console.log(donation.charity_id);
            throw new HttpErrors.Unauthorized('user does not exist');
        }

        if (!(await this.charityRepo.count({ id: donation.charity_id }))) {
            throw new HttpErrors.Unauthorized('charity does not exist');
        }

        if (donation.amount <= 0) {
            throw new HttpErrors.Unauthorized('amount is less than or equal to 0');
        }
        console.log("test");

        return await this.donationRepo.create(donation);
    }

    @post('/portfolio')
    async addToPortfolio(@requestBody() map: PortfolioMap) {
        if (!(await this.userRepo.count({ id: map.user_id }))) {
            throw new HttpErrors.Unauthorized('user does not exist');
        }

        if (!(await this.charityRepo.count({ id: map.charity_id }))) {
            throw new HttpErrors.Unauthorized('charity does not exist');
        }

        return await this.portfolioRepo.create(map);
    }

    @get('/portfolio/{id}')
    async getPortfolio(@param.path.number('user_id') user_id: number): Promise<Array<Charity>> {
        var charities = Array<Charity>();
        var portMap = await this.portfolioRepo.find({
            where:
                {
                    user_id: user_id,
                }
        });
        for (var i = 0; i < portMap.length; i++) {
            charities.push(await this.charityRepo.findById(portMap[i].charity_id))
        }
        return charities;
    }

    @del('/portfolio/{id}')
    async deleteCharityFromPortfolio(@param.path.number('id') id: number): Promise<boolean> {
        let charityExists: boolean = !!(await this.portfolioRepo.count({ id }));
        if (!charityExists) {
            throw new HttpErrors.BadRequest(`portfolio ID ${id} does not exist`);
        }
        return await this.portfolioRepo.deleteById(id);
    }

    @patch('/portfolio/{id}')
    async updatePortfolio(
        @param.path.number('id') id: number,
        @requestBody() map: PortfolioMap,
    ): Promise<boolean> {
        id = +id;
        return await this.portfolioRepo.updateById(id, map);
    }
}