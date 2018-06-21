import { UserRepository } from "../repositories/user.repository";
import { DonationRepository } from "../repositories/donation.repository";
import { CharityRepository } from "../repositories/charity.repository";
import { PortfolioRepository } from "../repositories/portfolio-map.repository";
import { Charity } from "../models/charity";
import { Donation } from "../models/donation";
import { PortfolioMap } from "../models/portfolio-map";
export declare class DonationsController {
    private userRepo;
    private charityRepo;
    private donationRepo;
    private portfolioRepo;
    constructor(userRepo: UserRepository, charityRepo: CharityRepository, donationRepo: DonationRepository, portfolioRepo: PortfolioRepository);
    getDonations(user_id: number): Promise<Array<Donation>>;
    makeDonation(donation: Donation): Promise<Donation>;
    addToPortfolio(map: PortfolioMap): Promise<PortfolioMap>;
    getPortfolio(user_id: number): Promise<Array<Charity>>;
    deleteCharityFromPortfolio(id: number): Promise<boolean>;
    updatePortfolio(id: number, map: PortfolioMap): Promise<boolean>;
}
