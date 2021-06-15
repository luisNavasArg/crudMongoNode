import dotenv from 'dotenv'
dotenv.config();
//console.log(`Variable de entorno en .env ${process.env.USUARIO} ${process.env.PASSWORD}`)
export default{
    MONGO_DATABASE:'usuarios',
    MONGO_USER:'luisNavasArg',
    MONGO_PASSWORD:'Alejandro01',
    MONGO_HOST:''
}