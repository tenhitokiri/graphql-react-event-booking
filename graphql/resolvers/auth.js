const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator')
const User = require('../../models/users');
const {
    user
} = require('./merge')

module.exports = {
    createUser: async (args) => {
        const {
            name,
            email,
            password,
            date
        } = args.userInput;

        //Validar datos ingresados
        //Check valid email
        if (!emailValidator.validate(email)) {
            throw new Error('Por favor Colocar un correo valido')
        }

        // Verificar largo de contraseña
        if (password.length < 8) {
            throw new Error('La contraseña debe ser de mas de 8 caracteres')
        }
        try {
            const userFound = await User.findOne({
                email
            });
            //verificar datos duplicados
            if (userFound) {
                throw new Error('Usuario ya existe, no se puede repetir!!')
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                date: new Date(date)
            });
            const result = await newUser.save()
            return {
                ...result._doc,
                password: null,
                _id: result.id
            };
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}