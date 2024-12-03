const app = require('../../app');
const User = require('../../api/user/user.model')
const Residence = require('../../api/residence/residence.model')
const supertest = require('supertest');
const { faker } = require('@faker-js/faker');

describe('Residence Middleware', () => {
    let token;
    let residence
    let chai, request;

    before(async () => {
        chai = await import('chai');
        request = supertest.agent(app.callback());
        await User.deleteMany();
        await Residence.deleteMany();

        let userFake;
        try {
            userFake = new User({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: "USER"
            });
            console.log('userFake:', userFake);
        } catch (error) {
            console.error('Erro ao salvar o usuário:', error);
        }

        // Create a new user
        await request
        .post('/register')
        .send({username: userFake.username, email: userFake.email, password: userFake.password, role: userFake.role})
        .expect(200)

        const loginResponse = await request
        .post('/login')
        .send({username: userFake.username, email: userFake.email, password: userFake.password, role: userFake.role})
        .expect(200)

        token = loginResponse.body.token
    });

    describe('createResidence', () => {
        it('should create a new residence', async () => {
            residence = {
                name: "Luxury Apartment",
                description: "A beautiful luxury apartment with ocean view.",
                address: "123 Ocean Drive",
                residencePrice: 500000,
                residenceType: "APARTMENT",
                size: 120,
                bedrooms: 3,
                bathrooms: 2,
                amenities: ["Pool", "Gym", "Sauna"],
                city: "Miami",
                state: "FL",
                country: "USA"
            }

            await request
            .post('/residences')
            .set('Authorization', `Bearer ${token}`)
            .send(residence)
            .expect(201)
        });

        after('should get created residence',async () => {
            const expect = chai.expect;
            const storedResidence = await Residence.findOne({ name: residence.name });
            expect(storedResidence).to.exist;
            
            expect(storedResidence.name).to.be.eql(residence.name)
            expect(storedResidence.description).to.be.eql(residence.description)
            expect(storedResidence.address).to.be.eql(residence.address)
            expect(storedResidence.residencePrice).to.be.eql(residence.residencePrice)
            expect(storedResidence.residenceType).to.be.eql(residence.residenceType)
            expect(storedResidence.size).to.be.eql(residence.size)
            expect(storedResidence.bedrooms).to.be.eql(residence.bedrooms)
            expect(storedResidence.bathrooms).to.be.eql(residence.bathrooms)
            expect(storedResidence.amenities).to.be.eql(residence.amenities)
            expect(storedResidence.city).to.be.eql(residence.city)
            expect(storedResidence.state).to.be.eql(residence.state)
            expect(storedResidence.country).to.be.eql(residence.country)
        })

        it('should return an error if required fields are missing', () => {
            // Test implementation here
        });
    });

    describe('getAllResidences', () => {
        it('should return all residences', () => {
            // Test implementation here
        });

        it('should return an empty array if no residences found', () => {
            // Test implementation here
        });
    });

    describe('getResidenceById', () => {
        it('should return the residence with the specified ID', () => {
            // Test implementation here
        });

        it('should return an error if residence ID is invalid', () => {
            // Test implementation here
        });
    });

    describe('updateResidence', () => {
        it('should update the residence with the specified ID', () => {
            // Test implementation here
        });

        it('should return an error if residence ID is invalid', () => {
            // Test implementation here
        });
    });

    describe('deleteResidence', () => {
        it('should delete the residence with the specified ID', () => {
            // Test implementation here
        });

        it('should return an error if residence ID is invalid', () => {
            // Test implementation here
        });
    });
});