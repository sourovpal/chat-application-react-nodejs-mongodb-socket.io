
class UserController{
    
    constructor(){
    }
    info = async(req, res)=>{
        res.status(200).json({
            name:'info'
        });
    }


}

module.exports = UserController;