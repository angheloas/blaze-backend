const mongoose = require('mongoose');

//mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(db => console.log('DB connected'))
.catch(err => console.log(err));

mongoose.set('useCreateIndex', true);

module.exports  = mongoose;