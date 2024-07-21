const Router = require('@koa/router');
const jwt = require('jsonwebtoken');
const User = require('../user/user.model');

const router = new Router();

router.post('/register', async (ctx) => {
    try {
        const { username, email, password, role } = ctx.request.body;
        const user = new User({ username, email, password, role });
        await user.save();
        ctx.body = { message: 'Usuário criado com sucesso.' };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { message: error.message };
    }
});

router.post('/login', async (ctx) => {
    try {
        const { username, email, password } = ctx.request.body;
        const user = await User.findOne({ username, email});
        if (!user || !(await user.checkPassword(password))) {
            ctx.status = 401;
            ctx.body = { message: 'Usuário ou senha inválidos.' };
            return
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        ctx.body = { token };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { message: error.message };
    }
});

module.exports = router;