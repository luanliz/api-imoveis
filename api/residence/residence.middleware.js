const Residence = require('../residence/residence.model')

module.exports.createResidence = async (ctx,next) => {
    try {
        const residence = new Residence(ctx.request.body);
        await residence.save();
        ctx.status = 201;
        ctx.body = residence;
    } catch (err) {
        ctx.status = 400;
        ctx.body = err.message;
    }
};

module.exports.getAllResidences = async (ctx,next) => {
    try {
        const residences = await Residence.find();
        ctx.body = residences;
    } catch (err) {
        ctx.status = 500;
        ctx.body = err.message;
    }
}

module.exports.getResidenceById = async (ctx,next) => {
    try {
        const residenceId = ctx.params.residenceId;
        const residence = await Residence.findById(residenceId);
        if (!residence) {
            ctx.status = 404;
            ctx.body = 404;
            return;
        }
        ctx.body = residence;
    } catch (err) {
        ctx.status = 500;
        ctx.body = err.message;
    }
};

module.exports.updateResidence = async (ctx,next) => {
    try {
        const residenceId = ctx.params.residenceId;
        const residence = await Residence.findByIdAndUpdate(residenceId,ctx.request.body, { new: true });
        if(!Residence){
            ctx.status = 404;
            ctx.body = 'Residence not found';
            return
        }
        ctx.body = residence;
    } catch(err) {
        ctx.status = 500;
        ctx.body = err.message;
    }
};

module.exports.deleteResidence = async (ctx,next) => {
    try {
        const residenceId = ctx.params.residenceId;
        const residence = await Residence.findByIdAndDelete(residenceId);
        if (!residence) {
            ctx.status = 404;
            ctx.body = 'Residence not found';
            return;
        }
        ctx.status = 200;
        ctx.body = 'Residência deletada com sucesso';
        return;
    } catch (err) {
        ctx.status = 500;
        ctx.body = err.message;
    }
}