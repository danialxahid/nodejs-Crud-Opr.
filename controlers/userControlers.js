const prisma = require('../database/prismaClient');

const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        console.log('name', name)
        // req.pram for url access

        const existingEmail = await prisma.user.findFirst({
            where :{ email }
        })

        if (existingEmail) { 
            console.log('email already exists')
            return 
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);


        const user  = await prisma.user.create({
            data:{
                username: name, 
                email, 
                password: hashedPassword
            }
        })

        res.status(200).json({
        success: true,
        message: 'user created successfully' ,
        user   
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {createUser};