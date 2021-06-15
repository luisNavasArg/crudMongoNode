import app from './app'
import './routes/database'
import config from './config'
import express from 'express'
const  Usuarios = require('./routes/usuarios');


app.set('port',process.env.PORT || 3000)
let puerto = app.get('port')
app.listen(puerto,()=>{
    console.log(config.MONGO_DATABASE/*, config,process.env*/)
    console.log(`Conectado en el puero: ${puerto}`)
   
});
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.get('/ingresar',async(req,res)=>{
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        <h2>Ingreso a comunicaciones</h2>
            <form action="/add" method="POST">
                <label for="user">Usuario</label>
                <input type="text" name="user" id="user">
                <label for="pass">Usuario</label>
                <input type="password" name="pass" id="pass">
                <input type="submit" value="Entrar">
            </form>

        </body>
        </html>`);
});
app.get('/perfil',(req,res)=>{

});
app.post('/inicio',async (req,res)=>{
    const usuario =new Usuarios(req.body)
        

        const consulta = await Usuarios.find();
        
        for(let a=0; a < consulta.length; a++){
            if(usuario.user == consulta[a].user){

                res.redirect('/perfil');
                console.log(consulta[a].user + " y "+ usuario.user);
            }
        }
 
   
    res.send('Estás en Inicio')
});
app.post('/add',async(req, res)=>{
    const usuario = new Usuarios(req.body)
    
    try {
        await usuario.save()
    } catch (error) {
        console.log(error)
    }
   
   // console.log(` Estamos recibiendo: ${req.body.user} ${req.body.pass}`);
    res.send('Recibido')
});
app.get('/consulta',async(req,res)=>{
    const usuarios = await Usuarios.find();
    let id="",nombre="",clave=""
    for(let a=0; a < usuarios.length;a++){
        id+=`${usuarios[a].id}`;
        nombre+=` <li>${usuarios[a].user}</li>`;
        clave+=`<li>${usuarios[a].pass}</li>`;
    }
    res.send(`
    <style>
        li{
            list-style:none;
            padding:10px;
        }
        a{
            text-decoration:none;
            background-color:transparent;
            box-shadow:2px 2px 2px black;
            padding:2px;
            color:black;
        }
    </style>
    <table>
    <thead>
        <th>Id</th>
        <th>Nombre</th>
        <th>Clave</th>
    </thead>
    <tbody>
        <td>${id} <a href="/borrar/${id}">Eliminar</a></td>
        <td><ul>${nombre}</ul></td>
        <td><ul>${clave}</ul></td>
    </tbody>
</table>
    `)
})
app.get('/borrar/:id',async(req,resp)=>{
    const {id} = req.params;
    await Usuarios.remove({_id:id})
    resp.redirect('/consulta')
    //resp.send('recibio')
})
