import Usuario from "../models/UsuarioModel.js";
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/jwt.js';

export const Login = async (req, res) =>{
    const usuario = await Usuario.findOne({
        where: {
            Email: req.body.Email
        }
    });
    if(!usuario) return res.status(404).json({msg: "Usuario no existe"});
    const match = await bcrypt.compareSync(req.body.Password, usuario.Password);
    if(!match) return res.status(400).json({msg: "Password incorrecto"});
    const token = await generarJWT(usuario.id, usuario.Nombre);
    req.session.usuarioId = usuario.id;
    const id = usuario.id;
    const Nombre = usuario.Nombre;
    const Email = usuario.Email;
    const Role = usuario.Role;
    res.status(200).json({id, Nombre, Email, Role,token});
    //res.status(200).json({msg: "Logueado", token});
}

export const Me = async (req, res) =>{
    if(!req.session.usuarioId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const usuario = await Usuario.findOne({
        attributes:['id','Nombre','Email','Role'],
        where: {
            id: req.session.usuarioId
        }
    });

    if(!usuario) return res.status(404).json({msg: "Usuario no existe"});
    res.status(200).json(usuario);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}