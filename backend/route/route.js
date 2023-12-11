const express = require('express')
var userController = require('../Controller/customersController');
var userRegister = require('../Controller/customersRegister.js');
var userLogin = require('../Controller/customersLogin.js');
const router = require('express').Router(); 

//Controller Tables(CRUD)
router.route('/user/edit/post').post(userController.post) //ใช้กำหนด path และ CRUD ที่ต้องการทำให้ไม่ต้องไปประกาศใน File Controller แล้ว
router.route('/user/edit/del/:_id').delete(userController.delend) //ใช้กำหนด path และ CRUD ที่ต้องการทำให้ไม่ต้องไปประกาศใน File Controller แล้ว ** /:_id คือการรับค่า _id customers ตั้งแต่ใน path เพื่อทำการเข้า Function ต่อ
router.route('/user/edit/put/:_id').put(userController.put)
router.route('/user/edit/get/:_id').get(userController.get)
router.route('/user/edit/fetchAll').get(userController.fetchAll)

//Controller Features
router.route('/user/register').post(userRegister.Register);
router.route('/user/login').post(userLogin);


module.exports = router;
