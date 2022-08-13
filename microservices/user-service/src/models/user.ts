import mongoose, { Mongoose } from "mongoose";
import { IUser } from "../interfaces/IUser";
const {Schema, model} = mongoose;

const UserSchema : mongoose.Schema = new Schema<IUser>({

    nombres: {
        type: String,
        require: [true, 'El nombre del usuario es obligatorio'],
    },
    apellidos: {
        type: String,
        require: [true, 'El apellido del usuario es obligatorio'],
    },
    cedula: {
        type: String,
        require: [true, 'La cédula del usuario es obligatorio'],
    },
    email: {
        type: String,
        require: [true, 'El correo del usuario es obligatorio'],
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        require: [true, 'El rol del usuario es obligatorio'],
    }

})

const User = mongoose.model<IUser>('User', UserSchema);

export {User}