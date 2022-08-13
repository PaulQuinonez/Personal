import { connect } from "mongoose";

const dbConnection =async () => {
    
    try {
        
        const urlDB = process.env.MONGODB_CNN

        await  connect(urlDB || '')
        console.log("Base de datos conectada correctamente!");
        console.log("*******************************************");
    } catch (error) {
        console.log(error);
        throw new Error(`La base de datos no esta disponble`)    
    }

}

export {
    dbConnection
}