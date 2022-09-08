import Usuario from "../models/UsuarioModel.js";
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/jwt.js';

export const Login = async (req, res) =>{
    const usuario = await Usuario.findOne({
        where: {
            Email: req.body.email
        }
    });
    if(!usuario) return res.status(404).json({msg: "Usuario no existe"});
    const match = await bcrypt.compareSync(req.body.password, usuario.Password);
    if(!match) return res.status(400).json({msg: "Password incorrecto"});
    const token = await generarJWT(usuario.id, usuario.Nombre);
    /*req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});*/
    res.status(200).json({msg: "Logueado", token});
}

export const Me = async (req, res) =>{
    /*if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);*/
}

export const logOut = (req, res) =>{
    /*req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });*/
}