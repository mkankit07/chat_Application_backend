const serviceUser=require("../models/users")
const Joi=require("joi")
const bcrypt=require("bcrypt")  

const newUserAdd=async(req,res)=>{
    console.log(req.body,"++++++++++++++");
    const Schema=Joi.object({
        username:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
    let validaSchema=Schema.validate(req.body)
    if(validaSchema.error){
        return res.status(200).json({
            message:validaSchema.error.message||'Bad request',
            status:400
        })
    }else{
        validaSchema=validaSchema.value
    }
    try{
        const userResponse = await serviceUser.findOne({email:validaSchema.email},'username')
        if(userResponse){
            return res.status(200).json({
                message:"user already exist !", 
                status:409
            })
        }else{
            validaSchema['password']=await bcrypt.hashSync(validaSchema.password,10)
            const result=await serviceUser.create(validaSchema)
            return res.status(201).json({
                message:"user added successfully !", 
                data:result, 
                status:201
            })
        }
    }catch(err){
        return res.status(200).json({
            message:err.message||"Internal server error!", 
            status:500
        })
    }
}

const loginAuth=async(req, res)=>{
    const Schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
    let validaSchema=Schema.validate(req.body)
    if(validaSchema.error){
        return res.status(200).json({
            message:validaSchema.error.message||'Bad request',
            status:400
        })
    }else{
        validaSchema=validaSchema.value
    }try{
        const userResponse  = await serviceUser.findOne({email :validaSchema.email})
        if(!userResponse){
            return res.status(200).json({
                message:"Email or Password Invalid",
                status:404
            })
        }else{
            console.log("asddddddddddddddddd");
            console.log(userResponse);
            const validPassword=  bcrypt.compareSync(validaSchema.password,userResponse.password)
            console.log(validPassword);
            if(validPassword){
                return res.status(200).json({
                    message:"user login successfully !", 
                    data:userResponse, 
                    status:200
                }) 
            }else{
                return res.status(200).json({
                    message:"Email or Password Invalid",
                    status:404
                }) 
            }
        }
    }catch(error){
        console.log(error);
        return res.status(200).json({
            message:err.message||"Internal server error!", 
            status:500
        })
    }
}

const updateUseImage= async(req,res)=>{
    console.log(req.body);
    const id=req.params.id;
    const data=req.body.image
    try{
        const result= await serviceUser.findByIdAndUpdate({_id:id},{image:data});
        console.log(result);
        return res.status(200).json({
            message:"image successfully updated", 
            data:result,
            status:200
        })
    }catch(Err){
        return res.status(200).json({
            message:"Internal server error !", 
            status:500
        })
    }
}

const getAllUsers= async(req,res)=>{
    try{
        result= await serviceUser.find({_id:{$ne:req.params.id}}).select(['email','username','image',"_id"])
        console.log(result);
        return res.status(200).json({
            message:"image successfully updated", 
            data:result,
            status:200
        })
    }catch(Err){
        return res.status(200).json({
            message:"Internal server error !", 
            status:500
        })
    }
}

module.exports={newUserAdd,loginAuth,updateUseImage,getAllUsers}