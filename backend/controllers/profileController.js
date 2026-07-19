const User = require("../models/User");


// GET PROFILE

const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("-password");


    res.status(200).json({
      success: true,
      user,
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Server Error",
    });

  }

};



// UPDATE PROFILE

const updateProfile = async (req,res)=>{

  try{

    const {
      avatar,
      about,
      achievements
    } = req.body;


    const user = await User.findByIdAndUpdate(

      req.user.id,

      {
        avatar,
        about,
        achievements,
      },

      {
        new:true,
      }

    ).select("-password");


    res.status(200).json({

      success:true,

      message:"Profile Updated Successfully",

      user,

    });


  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Server Error",

    });

  }

};



module.exports = {
  getProfile,
  updateProfile,
};