const User = require('../models/userModel.js');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(404).json({ message: "Invalid credentials. User not found." });
      }
      res.status(200).json({ message: "Login successful!", user });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };


exports.create = async (req, res) => {
    const { firstname, lastname, phonenumber, dateofbirth, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ firstname, lastname, phonenumber, dateofbirth, email, password });
        const savedUser = await newUser.save();
        // res.status(200).json(savedUser);
        res.status(200).json({message: " user added successfully!"});

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


exports.getUsers = async (req, res) => {
    try {
      const userData = await User.find();
      if (!userData || userData.length === 0) {
        return res.status(404).json({ message: "User data not found" });
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };

exports.getUserId=async(req,res)=>{
    try{
        const id=req.params.id;
        const userExist= await User.findById(id);
        if(!userExist)
        {
            return res.status(404).json({ message: "User not found" });

        }
        res.status(200).json(userExist);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
      }
}

exports.updateUser=async(req,res)=>
{
    try
    {
        const id=req.params.id;
        const userExist= await User.findById(id);
        if(!userExist)
        {
            return res.status(404).json({ message: "User not found" });

        }
        const updateData=await User.findByIdAndUpdate(id,req.body,
            {
                new:true
            }
        )
        res.status(200).json(updateData);
    }
    catch{
        res.status(500).json({ errorMessage: error.message });

    }
}

exports.deleteUser =async(req,res)=>
{
    try{
        const id=req.params.id;
        const userExist= await User.findById(id);
        if(!userExist)
        {
            return res.status(404).json({ message: "User not found" });

        }
        await User.findByIdAndDelete(id);
        res.status(200).json({Message:"User deleted Successfully" });

    }
    catch(error)
    {
        res.status(500).json({ errorMessage: error.message });

    }
}