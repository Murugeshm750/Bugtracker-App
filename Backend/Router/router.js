import  express  from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router()
const prisma = new PrismaClient()

// ROUTER FOR CREATE NEW USER
router.post('/registerUser', async(req,res) => {
    try {
        const {name,email,contact,role,password} = req.body;
        const result = await prisma.user.create({
            data:{
                name,
                email,
                contact,
                role,
                password
            }
        });
        console.log(result);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred from Register User" });
    }
})
// ROUTER FOR GET USER DETAILS
router.get('/users', async (req, res) => {
    try {
      const data = await prisma.user.findMany({});
      res.json({
        users: data
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
//   ROUTER FOR DELETE USER
router.delete('/deleteUser', async (req, res) => {

    try {
      const { userId } = req.body;
      const uid = parseInt(userId, 10);
  
      if(!uid){
        return res.status(400).send("User Id is Empty Values!")
      }
  
      const existingUser = await prisma.user.findUnique({
        where: {
          userId: uid
        }
      })
  
      if (!existingUser) {
        return res.status(400).send("User not Exist")
      }
      const result = await prisma.user.delete({
        where: {
          userId: existingUser.userId
        }
      })
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  
  });





export default router