//Carolina Turner CSCE 242
const express = require("express");
const app = express();
const multer = require("multer");
const Joi = require("joi");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require ("mongoose");

const upload = multer({dest : __dirname + "/public/images"});

mongoose
.connect("mongodb+srv://carturner:<csce242>@cluster0.m73w20w.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("connected yay!!!")})
.catch((error)=>console.log("couldnt connect !!"))

const contactSchema = new mongoose.Schema({
        name : String, 
        email: String,
        idea: String,
        img: String
});

const contact_form = mongoose.model ("contact_form", contactSchema);

app.get("/" , (req,res)=>{
    res.sendFile(__dirname+ "/index.html");
});

app.get("/api/project_ideas", (req, res) =>{  
    getContactForm(res);
  });

app.get("/api/project_ideas/:id", (req, res) => {
    getContactForm(res, req.params.id);
  });
  
const getContactForm = async (res, id) => {
    const contact_form = await contact_form.findOne({ _id: id });
    res.send(contact_form);
  };
  
app.post("/api/project_ideas", upload.single("img"), (req,res)=>{
    const result = validateContactForm(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const contact_form = new contact_form({
      name : req.body.String, 
      email: req.body.String,
      idea: req.body.String,
      img: req.body.String
    });
     if (req.file){
        contact_form.img="images/" + req.file.filename;
    }
    createContactForm(contact_form, res);
});

const createContactForm = async (contact_form, res) => {
    const result = await contact_form.save();
    res.send(contact_form);
  };


app.put("/api/project_ideas/:id",upload.single("img"), (req,res)=>{
    const result = validateContactForm(req.body);
    console.log(result);
    if (result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  updateContactForm(req, res);
});
    
const updateContactForm = async (req, res) => {
    let fieldsToUpdate = {
      name : req.body.String, 
      email: req.body.String,
      idea: req.body.String,
      img: req.body.String
    };
    if (req.file) {
      fieldsToUpdate.img = "images/" + req.file.filename;
    }
    const result = await contact_form.updateOne({ _id: req.params.id }, fieldsToUpdate);
    res.send(result);
  };

  app.delete("/api/project_ideas/:id", (req, res) => {
    removeContactForm(res, req.params.id);
  });
  
  const removeContactForm = async (res, id) => {
    const contact_form = await contact_form.findByIdAndDelete(id);
    res.send(contact_form);
  };

function validateContactForm (beverage) {
    const schema = Joi.object({ //Joi Validation
        name : Joi.string().required(), //joi validating it must be string of length three and is required, "tea" is minimum length
        email: Joi.string().required(),
        idea: Joi.string().required(),
        _id: Joi.allow(""),
        img: Joi.allow("")
    });

    return schema.validate(contact_form);
  }

  app.listen(3000, ()=>{
    console.log("working!");

});

