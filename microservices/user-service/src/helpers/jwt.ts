import jwt from 'jwt-simple'
import moment from'moment'

//Llave del token
const secret = 'polito';

//Generación de tokens por usuario
const createToken = function(user : any) {

    const payload = {

        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        cedula: user.cedula,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()

    }

    return jwt.encode(payload, secret);

}

export {createToken}