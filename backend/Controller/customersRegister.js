const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mongomodel = require('../Model/customersModel')
var crypto = require('crypto');

//POST Rsgister
var Register = async(req,res) =>{
            console.log('Im in Register function');
            var user = req.body.UserID
            var password = req.body.Password
            var firstName = req.body.Firstname
            var lastName = req.body.Lastname
            var Data = new mongomodel({ //สร้าง Schema customers ขึ้นมาใหม่
            UserID:user,
            Password:password,
            Firstname:firstName,
            Lastname:lastName
        })  

            await mongomodel.findOne({UserID:user}).then((mongomodel =>{
                if (mongomodel){
                    res.send("False") //กรณีมี UserID ซ้ำในระบบอยู่แล้วให้ส่ง False กลับมา
                    }else{
                        const val = Data.save(); // ทำการ Save Schema และเก็บไว้ใน val
                        res.send("Success");//ตอบกลับมา Success
                    }
                }
            ))           
    }

module.exports = {Register}