const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
router.use(express.json());
const todo = require("../model/crudSchema");
const User = require("../model/userSchema");
const crud = require('../model/crudSchema');
// router.get('/', (req, res) => {  
//     res.send("hello from router");
// });
// router.post('/', (req, res) => { 
//     res.json({ message: req.body })
// });
router.post("/signup", async (req, res) => {
    console.log("hello ytsh") 
    const { name, email, password, phone,imageUrl } = req.body;
   console.log(req.body);

    try {
        if (!name || !email || !password || !phone) {
            return res.status(422).json({ error: "please filled all field", status: 422 });

        };
        const userExist = await User.findOne({ email });


        if (userExist) {
            return res.status(422).json({ error: "Email already exist", status: 422 });
        };
        // generating token
        //  tokens=jwt.sign({email:email},process.env.PRIVATE_KEY);


        const user = new User({ name, email, password, phone,imageUrl });
        // const checkEmail = await User.findOne({ email: email });



        const final = await user.save();
        if (final) {
            return res.status(201).json({ message: "user is successfully registered", status: 201 })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "user is not registred", status: 500 });
    }

    // const salt=await bcrypt.genSalt(4);

    // const hashPassword=await bcrypt.hash(req.body.password, salt);
    // console.log(salt);
    // console.log(hashPassword);
});
router.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "please filled all field", status: 422 })
        };
        const checkEmail = await User.findOne({ email });
        if (!checkEmail) {
            return res.status(400).json({ error: 'invalid Credential', status: 400 });
        };
        const tokens = await checkEmail.generateAuthToken();
        // console.log(tokens);
        if (!tokens) {
            return res.json({ error: 'something went wrong Please try again ', status: 400 })
        } 
        // console.log(tokens);
        res.cookie("woken", tokens)
        const passwordChecker = await bcrypt.compare(password, checkEmail.password);
        if (!passwordChecker) {
            return res.status(400).json({ error: 'invalid Credential ', status: 400 })
        };


        if (passwordChecker) {
            return res.status(200).json({ message: "user is successfully login", status: 200, tokens })
        }
        // if (password !== checkEmail.password) {
        //     return res.status(400).json({ message: 'email or password wrong' })
        // }
        // if (password == checkEmail.password) {
        //     return res.status(200).json({ message: "user is successfully login" })
        // };  

    } catch (err) {
        res.status(500).json({ error: 'user in not login', status: 500 });
        console.log(err);
    }
});
router.get('/about', authenticate, async (req, res) => {
try {
    res.send(req.rootUser)
} catch (error) { 
    console.log(error);
}
  


});
router.get('/getData', authenticate, (req, res) => {
    const data =req.rootUser;
    if(data){
    res.status(200).json({message:data,status:200});
}  
if(!data){
    res.status(200).json({message:"user is not Found",status:401});
}
    console.log(req.rootUser);
});
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            res.json({ error: "please Filled all field" })
        };

        const check = await User.findOne({ _id: req.userID });
        if (check) {
            const userMessage = await check.addmessage(name, email, phone, message);
            await check.save();
            res.status(201).json({ message: "message is successfully send" })
        }

    } catch (error) { 
        console.log(error)
    }

});
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("woken");
        res.json({ message: "User is Successfully Logout",status:200 });
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: "User is not Logout" })
    }



});
router.post("/createCrud", authenticate, async (req, res) => {
    const { Fname, Sname, phone } = req.body;
    console.log(Fname)
    try {
        const cruds = await new crud({
            Fname: Fname,
            Sname: Sname,
            phone: phone,
            crudBy: req.user
        });
      const data =  await cruds.save();

        console.log("req.user", req.user);
        console.log('hello this is crud', cruds);
        if (data) {
            res.status(201).json({ message: cruds, status: 201 })
        }
    } catch (error) {
 res.status(500).json({message:"internal server error",status:500})
    }
});
router.get("/getCrud", authenticate, async (req, res) => {
    console.log(req.userID);
    try {
        const data = await crud.find({
            crudBy: req.userID
        });
        // console.log(data);
        if (data) {
           res.status(200).json({message:data})
        }
    } catch (error) {
        res.json({ message: [] });
        console.log(error)
    }

});
router.delete("/remove/:_id", authenticate, async (req, res) => {
    try {
        const remove = await todo.remove({
            _id: req.params._id
        });

        const id = req.params._id;

        if (remove) {
            res.status(200).json({ message: id })
        }
    } catch (error) { 
        console.log(error);
    }
});
router.patch("/updateCrud/:_id",authenticate, async (req, res) => {
    const { Fname, Sname, phone } = req.body;
    
    try {
        const update = await  crud.findOneAndUpdate({ _id:req.params._id }, {
            $set: {
            "Fname":Fname, 
            "Sname":Sname,
            "phone":phone
            } 
        });
        // console.log(update);
         const data =await crud.findOne({_id:req.params._id});
        if(update){
        await res.status(200).json({message:data})
        }
       
    } catch (error) { 
        console.log(error);
    }
})
module.exports = router;