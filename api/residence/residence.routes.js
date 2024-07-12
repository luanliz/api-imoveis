const Router = require('@koa/router')
const { createResidence, getAllResidences, getResidenceById, updateResidence, deleteResidence  } = require('../residence/residence.middleware')

const router = new Router({
    prefix: '/residences'
})

router
    .get('/', getAllResidences)
    .get('/:residenceId', getResidenceById)
    .post('/', createResidence)
    .put('/:residenceId', updateResidence)
    .delete('/:residenceId', deleteResidence)

module.exports = router