import Usuario from "../models/UsuarioModel.js";

export const verifyUser = async (req, res, next) =>{
    console.log(req.session.usuarioId);
    if(!req.session.usuarioId){
        return res.status(401).json({msg: "¡Por favor, ingrese a su cuenta!"});
    }
    const usuario = await Usuario.findOne({
        where: {
            id: req.session.usuarioId
        }
    });
    if(!usuario) return res.status(404).json({msg: "Usuario no encontrado"});
    req.usuarioId = usuario.id;
    req.Role = usuario.Role; 
    next();
}

export const adminOnly = async (req, res, next) =>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});
    if(user.role !== "admin") return res.status(403).json({msg: "Acceso Prohibido"});
    next();
}