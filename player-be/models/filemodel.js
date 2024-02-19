const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema(
   {
      title:{
         type:String,
         required:true
      },
      audio: {
         type: String,
         required: true,
         unique: true,
      },
      video: {
         type: String,
         required: true,
         unique: true,
      },
      type: {
         type: String,
         required: true,
      },
      language:{
         type:String,
         required:true
      },
      trending:{
         type:Boolean,
         required:true
      },
      rating:{
         type:String,
         required:true
      }
   }, {
   collection: 'files'
}
)

module.exports = mongoose.model('files', fileSchema)