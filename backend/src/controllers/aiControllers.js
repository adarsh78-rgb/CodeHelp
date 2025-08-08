const aiService = require("../services/aiservice.js")
const { getResponse, getCode } = aiService;

module.exports.getResponse = async(req,res)=>{
    const code = req.body.code;

    if(!code){
        return res.status(400).json({error:"Prompt required! "});
    }
        
    const response = await getResponse(code);

    res.send(response)
}

module.exports.getCode = async(req,res)=>{
    const code = req.body.code;

    if(!code){
        return res.status(400).json({error:"Prompt required! "});
    }
        
    const response = await getCode(code);

    res.send(response)
}

