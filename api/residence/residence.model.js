'use strict';

const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    residencePrice: {
        type: Number,
        required: true
    },
    residenceType: {
        type: String,
        required: true,
        enum: ['APARTMENT','CONDOMINIUM','HOUSE', 'BUSINESS', 'LAND']
    },
    size: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        default: []
    },
    picture: {
        type: ObjectId,
        ref: 'File'
    },
    status: {
        type: String,
        enum: ['AVAILABLE','SOLD','RENTED'],
        default: 'AVAILABLE'
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Residence', schema)