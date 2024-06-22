var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://radheshyamlodhi48:1xzbMGqk9vi9T9G9@cluster0.sgywv3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})
