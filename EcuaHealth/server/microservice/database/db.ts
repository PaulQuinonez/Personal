import mongoose, {connect} from "mongoose";

export const connectionDB =async () => {
    
    try {
        
        const url = process.env.DB_MONGO; //URL .ENV

        mongoose.set("strictQuery", false);

        await connect(url || '');

        console.log('');
        console.log('Estado de Base de datos: ');        
        console.log("Base de datos del microservicio conectada!");
        console.log('');      

    } catch (error) {
        
    }

}