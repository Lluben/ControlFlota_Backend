import jwt from "jsonwebtoken";

export const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if(!token) return res.status(401).json({msg: "No existe token en la peticion"});
    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        console.log(payload);   
    } catch (error) {
        return res.status(401).json({msg: "token no válido"});        
    }
    next();
}