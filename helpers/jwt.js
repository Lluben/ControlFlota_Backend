import jwt from "jsonwebtoken";

export const generarJWT = (id, name) => {
    return new Promise((resolve, reject) => {
        const payload = {id, name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '365d'// it will be expired after 365 dias
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se puedo generar el token');
            }
            resolve(token);
        })

    })
}