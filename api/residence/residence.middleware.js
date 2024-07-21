const Residence = require('../residence/residence.model')

module.exports.createResidence = async (ctx,next) => {
    try {

        if(!ctx.state.user) {
            ctx.status = 401;
            ctx.body = 'Você precisa estar logado para criar uma residência';
            return;
        }
        
        const userId = ctx.state.user.id;
        const residence = new Residence({...ctx.request.body, createdBy: userId});
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
            ctx.body = 'Imóvel não encontrado';
            return;
        }
        ctx.body = residence;
    } catch (err) {
        ctx.status = 500;
        ctx.body = err.message;
    }
};


module.exports.updateResidence = async (ctx, next) => {
    try {
        const residenceId = ctx.params.residenceId;
        const userRole = ctx.state.user.role;
        const userId = ctx.state.user.id;

        const residence = await Residence.findById(residenceId);

        if (!residence) {
            ctx.status = 404;
            ctx.body = 'Residence not found';
            return;
        }

        // Verificar se o usuário tem permissão para editar a residência
        if (userRole !== 'ADMIN' && residence.createdBy.toString() !== userId) {
            ctx.status = 401;
            ctx.body = 'Você não tem permissão para editar esta residência';
            return;
        }

        // Atualizar a residência se a verificação de permissão passar
        Object.assign(residence, ctx.request.body);
        residence.updatedBy = userId;
        await residence.save();

        ctx.body = residence;
    } catch (err) {
        ctx.status = 500;
        ctx.body = err.message;
    }
};


module.exports.deleteResidence = async (ctx, next) => {
    try {
        const residenceId = ctx.params.residenceId;
        const userRole = ctx.state.user.role;
        const userId = ctx.state.user.id;

        const residence = await Residence.findById(residenceId);

        if (!residence) {
            ctx.status = 404;
            ctx.body = 'Imóvel não encontrado';
            return;
        }

        // Verifique se o usuário tem permissão para deletar a residência
        if (userRole !== 'ADMIN' && residence.createdBy.toString() !== userId) {
            ctx.status = 401;
            ctx.body = 'Você não tem permissão para deletar este imóvel';
            return;
        }

        await Residence.deleteOne({ _id: residenceId });

        ctx.status = 200;
        ctx.body = 'Imóvel deletado com sucesso';
    } catch (err) {
        ctx.status = 500;
        ctx.body = err.message;
    }
};