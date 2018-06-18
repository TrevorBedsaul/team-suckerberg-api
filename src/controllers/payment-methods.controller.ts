import { repository } from "@loopback/repository";
import { request } from "http";
import { UserRepository } from "../repositories/user.repository";
import { DonationRepository } from "../repositories/donation.repository";
import { CharityRepository } from "../repositories/charity.repository";
import { PaymentMethodRepository } from "../repositories/payment-method.repository";
import { post, get, requestBody, param, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { Charity } from "../models/charity";
import { Donation } from "../models/donation";
import { PaymentMethod } from "../models/payment-method";

export class PaymentMethodsController {

    constructor(
        @repository(DonationRepository) private paymentMethodRepo: PaymentMethodRepository
    ) { }

    @get('/payment-methods')
    async getPaymentMethod(): Promise<Array<PaymentMethod>> {
        return await this.paymentMethodRepo.find();
    }

    @post('/payment-methods')
    async makePaymentMethod(@requestBody() payment_method: PaymentMethod) {
        return await this.paymentMethodRepo.create(payment_method);
    }

    @post('/stripepayment')
    async createStripePayment(@requestBody() token: string) {
        var stripe = require("stripe")("pk_test_eYCX11dIxALec8Sqz2JpIfip");
        const charge = stripe.charges.create({
            amount: 999,
            currency: 'usd',
            description: 'Test',
            source: token,
            metadata: { order_id: 6735 },
        });
        return charge;
    }
}