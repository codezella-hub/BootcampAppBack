const yup = require('yup');

async function validateResponseData(req, res, next) {
    try {
        const Schema = yup.object().shape({
            user_id: yup.string().required(),
            quiz_id: yup.string().required(),
            answers: yup.array().of(
                yup.object().shape({
                    question_id: yup.string().required(),
                    selected_option: yup.string().required(),
                    is_correct: yup.boolean().required(),
                })
            ).required(),
            score: yup.number().required(),
            isPassed: yup.boolean().required(),
            attemptNumber: yup.number().required(),
            timeTaken: yup.number().required(),
        });
        await Schema.validate(req.body);
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = validateResponseData;
