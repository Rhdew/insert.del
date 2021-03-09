const mongoose = require('mongoose');
const {User,Profile} = require('./model');
let uri = 'mongodb://127.0.0.1/test'
const connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const findData = async()=>{
    try{
        let user = await Profile.find().populate('userId')
        let newuser = []
        user.forEach((element,index) => {
            
            // console.log(cyear);
            let tempuser = {
                profileid:element._id,
                userId:element.userId._id,
                firstName:element.userId.firstName,
                lastName:element.userId.lastName,
                email:element.userId.email,
                password:element.userId.password,
                dob:element.dob,
                phone:element.phone,
                age:  new Date().getFullYear()-parseInt(element.dob.split('/')[2])
            }
            newuser.push(tempuser)
            console.log(typeof newuser[0].age)

            let avg = newuser.reduce( ( p, c ) => parseInt(p.age) + parseInt(c.age), 0 ) / newuser.length;
            console.log(avg)
            
        });
        // console.log(newuser)
    }
    catch(err){
        console.log(err)
    }
}
findData();
