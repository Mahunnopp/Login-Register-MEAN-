const bcrypt = require('bcrypt')
const mongomodel = require('../Model/customersModel')

module.exports = (req, res)=>{
    const UserID = req.body.UserID //รับ UserId ที่ User กรอกมา
    const Password = req.body.Password //รับ Password ที่ User กรอกมา

    mongomodel.findOne({UserID:UserID}).then((mongomodel)=>{ //ทำการใช้ Medthod FindOne ในการหาข้อมูล UserID ว่าตรงกับใน Database หรือไม่ จากนั้นถ้ามีให้นำกลับมาใส่ในตัวแปร mongomodel
        if(mongomodel)//ถ้ามีข้อมูลตรงกับในระบบ จะเรียกให้ทำคำสั่ง If เพื่อนำข้อมูล UserID มาเทียบรหัสผ่านต่อไป
        {
            let cmp = bcrypt.compare(Password, mongomodel.Password).then((match) =>{ //คำสั่ง Compare หรือ Method เทียบรหัสผ่านของ bcrypt จากนั้นนำมาใส่ตัวแปร match เป็น boolean ว่า true หรือ false 
                    if(match){ //ถ้า match = true ให้ทำคำสั่งต่อไปนี้
                        var mongomodelId = req.session //กำหนด ตัวแปร เรียก session 
                        mongomodelId = mongomodel._id; //นำ model._id ของ User มาเทียบกับ session ที่เราเก็บไว้ 
                        res.send(match)        
                    }else if(Password == ""){
                        res.send("null")
                    }else{ //ถ้า match = false ให้ทำคำสั่งต่อไปนี้
                        res.send(match);
                    }
                })
        }
        else
        {
            res.send("UserID Wrong!")
        }
    })
}
