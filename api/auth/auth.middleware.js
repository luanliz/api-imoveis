const checkRoleUser = (role) => {
    return async (ctx, next) => {
        if (ctx.state.user.role !== role) {
            ctx.status = 401;
            ctx.body = { message: 'Você não tem permissão para acessar este recurso.' };
            return;
        }
        await next();
    };
}