const { body } = require("express-validator")

let validateLogin = [
    body('email')
        .notEmpty().withMessage('Completa el correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un correo válido'),
    body('password')
        .notEmpty().withMessage('Completa la contraseña').bail(),
]

module.exports = validateLogin