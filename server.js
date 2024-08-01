const mongoose = require("mongoose");
const express =require("express")
const cors= require("cors")
let app = express()
app.use(cors())
let empolyeeSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    department: String,
    image: String,
    cars: String,
    country: String,
  });
  let Employee= new mongoose.model("employee",empolyeeSchema,"detailsofemployees")
  
app.listen(2387,()=>{
    console.log(`2387 is listening.....`)
})
app.get("/employedetails", async (req,res)=>{
    let employeData= await Employee.find().and([{ country:req.query.country},{gender:req.query.gender},])//{department:req.query.department}
    console.log(req.query) // to print url in object in terminal
    res.json(employeData)
})
app.get("/countriesList",async(req,res)=>{
  let countriesList= await Employee.find().distinct("country")
  res.json(countriesList)
})
app.get("/departmentsList",async(req,res)=>{
  let departmentsList= await Employee.find().distinct("department")
  res.json(departmentsList)
})
app.get("/gendersList",async(req,res)=>{
  let gendersList= await Employee.find().distinct("gender")
  res.json(gendersList)
})
let connectToDataBase = () => {
  try {
    mongoose.connect(
      "mongodb+srv://pavanajjarapu:pavan@findmethod.sziutcn.mongodb.net/DummyData?retryWrites=true&w=majority&appName=findmethod"
    );
    console.log(`connected successfully to DB`);
  } catch (error) {
    console.log(`not connected to DB`);
    console.log(error);
  }
};
connectToDataBase();
