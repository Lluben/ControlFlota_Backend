import Usuario from "../models/UsuarioModel.js";
import bcrypt from 'bcryptjs';

export const getUsuarios = async(req, res) =>{
    try {
        const response = await Usuario.findAll({
            attributes:['nombre','email','password','role','empresaId']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUsuario = async(req, res) =>{
    try {
        const usuario = await Usuario.findOne({
            attributes:['nombre','email','role'],
            where: {
                usuarioId: req.params.id
            }
        });
        if(!usuario) return res.status(404).json({msg: "Usuario no existe"});
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUsuario = async(req, res) =>{
    const {Nombre,Email,Password,Role,empresaId} = req.body;
    //if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    //const hashPassword = await argon2.hash(password);
    try {
        const usuario = await Usuario.findOne({
            where: {
                Email: Email,
            }
        });
        if(usuario) return res.status(400).json({msg: "Ya existe usuario con ese correo"});
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const passwordEncriptado = bcrypt.hashSync(Password, salt);
        await Usuario.create({
            Nombre: Nombre,
            Email: Email,
            Password: passwordEncriptado,
            Role: Role,
            empresaId: empresaId
        });
        res.status(201).json({msg: "Usuario creado con éxito !!!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUsuario = async(req, res) =>{
    const usuario = await Usuario.findOne({
        where: {
            usuarioId: req.params.id
        }
    });
    if(!usuario) return res.status(404).json({msg: "Usuario no encontrado"});
    const {nombre, email, password, role, empresaId} = req.body;
    /*let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});*/
    try {
        await Usuario.update({
            nombre: nombre,
            email: email,
            password: password,
            role: role,
            empresaId: empresaId
        },{
            where:{
                usuarioId: usuario.usuarioId
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUsuario = async(req, res) =>{
    const usuario = await Usuario.findOne({
        where: {
            usuarioId: req.params.id
        }
    });
    if(!usuario) return res.status(404).json({msg: "Usuario no encontrado"});
    try {
        await Usuario.destroy({
            where:{
                usuarioId: usuario.usuarioId
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}