const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mongomodel = require('../Model/customersModel')
var crypto = require('crypto');
const bcrypt = require('bcrypt')

//POST
var post = async(req,res) =>{
            console.log('Im in post function');
            var Data = new mongomodel({ //สร้าง Schema customers ขึ้นมาใหม่
            UserID:req.body.UserID,
            Password:req.body.Password,
            Firstname:req.body.Firstname,
            Lastname:req.body.Lastname
        })
        await mongomodel.findOne({UserID:user}).then((mongomodel =>{ //ใช้ findOne ตรวจสอบว่ามี UserID ซ้ำในระบบหรือไม่
            if (mongomodel){
                res.send("False") //กรณีมี UserID ซ้ำในระบบอยู่แล้วให้ส่ง False กลับมา
                }else{
                    const val = Data.save(); // ทำการ Save Schema และเก็บไว้ใน val
                    res.send("Success");//ตอบกลับมาว่าสำเร็จ
                }
            }
        ))     
}

//DELETE
var delend = async (req,res) =>{
            console.log('Im in delete function');
            let delid = req.params._id //รับค่า _id มาจากไฟล์ route และทำการดึงข้อมูล _id มาทั้งหมดมาไว้ใน delid
            let delad = await mongomodel.findByIdAndDelete(delid) // ทำการนำ delid มาใส่ใน Function findByIdAndDelete เพื่อทำการลบ Object ทิ้ง
            res.send("Deleted")
}

//PUT
var put = async (req,res) =>{
            console.log('Im in update function');
            let upID = req.params._id //รับค่า _id มาจากไฟล์ route และทำการดึงข้อมูล _id มาทั้งหมดมาไว้ใน upID
            let upUserid = req.body.UserID //รับค่าจาก Body ใน POSTMAN แล้วยิงไปที่ Field UserID ของ Schema
            let upPassword = req.body.Password
            let upFirstname = req.body.Firstname
            let upLastname = req.body.Lastname

            let uppPassword = await bcrypt.hash(upPassword,10); //ทำการ HASH รหัสใหม่ที่พึ่งกรอกลงไป
            let upCustomers = await mongomodel.findByIdAndUpdate(upID, //นำ _id จาก upID 
                {$set:{UserID:upUserid, //นำค่าใหม่ที่เขียนมา Replace ใส่ข้อมูลเดิม
                    Password:uppPassword,
                    Firstname:upFirstname,
                    Lastname:upLastname},
                },{new:true}) //new:true ต้องมีทุกครั้งหลังทำการ Replace ข้อมูลเพื่อให้ POSTMAN Res ออกมาเป็นข้อมูลใหม่จริงๆ
            res.json(upCustomers);
}

//GET
var get = async (req,res)=>{
            console.log('Im in get function');
            let getID = req.params._id //รับค่า _id มาจากไฟล์ route และทำการดึงข้อมูล _id มาทั้งหมดมาไว้ใน getID
            let findData = await mongomodel.findById(getID); //รับค่า _id มาและทำการดึงข้อมูล _id มาทั้งหมดมาไว้ใน getID
            res.send(findData); //นำ findData มาแสดงในส่วน Response
}

//FETCH ALL
var fetchAll = async (req,res)=>{
            console.log('Im in fetch all function');
            let fetchAllID = req.params._id //รับค่า _id มาจากไฟล์ route และทำการดึงข้อมูล _id มาทั้งหมดมาไว้ใน  fetchAllID
            let fetchData = await mongomodel.find(fetchAllID); //รับค่า _id มา และทำการดึงข้อมูล _id มาทั้งหมดมาไว้ใน fetchData
            res.send(fetchData);
}

module.exports = {post,delend,put,get,fetchAll};
