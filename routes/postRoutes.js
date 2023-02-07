const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser")
const Instapost = require("../models/instapost");
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dcip3zcp4', 
    api_key: '761659471794486', 
    api_secret: 'j_ETkpzIDJs0_Y6uCFtL8Utf2Qw',
    secure: true
  });

router.use(bodyParser.json());

router.get('/posts', async(req, res) => {
    try {
        console.log("I am inside get instapost")
        //here we are rendering the image giveing it in ressponse
        const instapost = await Instapost.find();
        console.log(instapost)
        res.json({
            status: "Sucess",
            instapost
        })
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.post('/posts', (req, res) => {
    try {
        console.log("I am Inside Posts")
        console.log(req)
        //  to upload Image fetch image and upload
        //for postaman use this file
        // const file = req.files.postImage;

        //for frontend file use this file
        const file = req.body.postImage
        console.log(file)
        // console.log(file.tempFilePath)
        // Upload file to Cloudinary
        cloudinary.uploader.upload(file, (err,result)=>{
            console.log(result)
             const instapost =new Instapost({
                postImage: result.url,
                name: req.body.name,
                location: req.body.location,
                description: req.body.description,
                likes : 0,
                date: new Date(),
            })
            instapost.save()
            .then(result=>res.status(200).json({
                status: "Sucess",
                result
            }))
        })

    } catch (e) {
        res.status(500).json({
            status: "I am Failed",
            message: e.message
        })
    }
})

router.delete('/posts/:id', async(req, res) => {
    try {
        console.log("I am inside delete post")
        console.log(req.params.id)
        //here we are rendering the image giveing it in ressponse
        const instapost = await Instapost.findOne({_id: req.params.id});
        if(instapost){
            console.log(instapost)
            await Instapost.deleteOne();
            res.json({
                status: "Sucess",
                message: "Post deleted"
            })
        }else {
            res.status(401).json({
                status: "Failed",
                message: "User is not authorised to make changes in this post"
            })
        }
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.put('/posts/:id', async(req, res) => {
    try {
        console.log("I am inside Edit post")
        console.log(req.params.id)
        //here we are rendering the image giveing it in ressponse
        const instapost = await Instapost.findOne({_id: req.params.id});
        if(instapost){
            console.log(instapost)
            let updateDoc = {$set:{likes:instapost.likes+1}}
            let filter = {_id: req.params.id}
            await Instapost.updateOne(filter, updateDoc);
            res.json({
                status: "Sucess",
                message: "Post updated"
            })
        }else {
            res.status(401).json({
                status: "Failed",
                message: "Post not available"
            })
        }
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})


module.exports = router;
