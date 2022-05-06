const Router = require('express')
const verifyToken = require('../helpers/verifyToken');

const { Usuario, Historial, Repositorio } = require('../db.js');

const router = Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


//POST LOGIN 
router.post('/login', async (req, res) =>
{
    const { email,password } = req.body;
    try 
    {
        const user = await Usuario.findOne({ where:{email} })
        if(!user)res.status(404).json("Not Found!");
        else
        {
            const accessToken = jwt.sign({id: user.id},   
                process.env.JWT_KEY,
                { expiresIn: '1d' }
            )
    
            const originPass = CryptoJS.AES.decrypt(user.password, process.env.HASH_CRYPTO).toString(CryptoJS.enc.Utf8); //Password decription
    
            if(originPass !== password)res.status(403).json("wrong password!")
            user._previousDataValues? res.json({...user.dataValues,accessToken}) : res.json({...user,accessToken}); 
        }


    }
    catch (error) 
    {
        console.log(error)
        res.status(500).json("Error on Server!");
    }
});



//POST REGISTER
router.post('/register', async (req, res) =>
{
    const { email,password,nombre,nacimiento,lenguajes } = req.body;
    try 
    {
        const user = await Usuario.findOrCreate(
        { 
            where:
            {
                email:email,
                password: CryptoJS.AES.encrypt(password,process.env.HASH_CRYPTO).toString(),
                nombre:nombre,
                nacimiento:nacimiento,
                lenguajes:lenguajes,
            } 
        });
        if(!user)res.status(500).json("Error creating!");
        res.json(user[0]);
    }
    catch (error) 
    {
        res.status(500).json("Error on Server!");
    }
});


//PUT NAME CHANGE BY 'id'
router.put('/', verifyToken , async (req, res) =>
{
    const { id, nombre } = req.body;
    try 
    {
        const usuario = await Usuario.findByPk( id );
        if(!usuario)res.status(404).json("Not found!");
        else 
        {
            usuario.nombre=nombre;
            usuario.save();
            res.json(usuario);
        }
    }
    catch (error) 
    {
        console.log(error)
        res.status(500).json("Error on Usuario!");
    }
});


module.exports =  router;