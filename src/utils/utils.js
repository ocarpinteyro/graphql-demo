import Joi from "joi";

export function validateUser(user) {
    const schema = Joi.object().keys({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(10)
            .required(),
    });
    const { error, value } = Joi.validate(user, schema);
    if (error && error.details) {
        return { error };
    }
    return { value };
}

export function validateClient(client) {
    const schema = Joi.object().keys({
        key: Joi.string()
            .min(8)
            .max(64)
            .required(),
    });
    const { error, value } = Joi.validate(client, schema);
    if (error && error.details) {
        return { error };
    }
    return { value };
}

export function getDateInNumbers() {
    const date = new Date();
    return Date.parse(date);
}

export function parseDate(dateInNumbers) {
    const date = new Date();
    date.setTime(dateInNumbers);
    return date;
}
