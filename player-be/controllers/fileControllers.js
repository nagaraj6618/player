const filemodel = require("../models/filemodel")


const getAllFile = (req, res) => {
  res.status(200).json({ message: 'working..' })
}

const createFileUpload = async (req, res) => {

  console.log(req.body)
  const newFile = new filemodel(req.body)
  try {
    const savedFile = await newFile.save()
    res
      .status(200)
      .json({
        success: true,
        message: "Successfully Created",

      })

  }
  catch (err) {
    res.status(500)
      .json({
        succes: false, message: "failed to create. try again"
      })
  }
}
const uploadfile = (req, res) => {
  try {
    res
      .status(200)
      .json({
        success: true,
        message: "Successfully Created",
      })
  }
  catch (err) {
    res.status(500)
      .json({
        succes: false, message: "failed to create. try again"
      })
  }
}


const getAllFiles = async (req, res) => {

  try {
    const getAllDatas = await filemodel.find()
    console.log(getAllDatas)
    res.status(200).json(getAllDatas)
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }


}

const getByFileName = (req, res) => {
  const fileName = req.params.fileName
  const pareDirectory = (__dirname).split('\controllers')[0]
  const filePath = pareDirectory + "assets/" + fileName
  res.status(200).sendFile(filePath)
}
module.exports = { getAllFile, createFileUpload, getByFileName, uploadfile, getAllFiles }