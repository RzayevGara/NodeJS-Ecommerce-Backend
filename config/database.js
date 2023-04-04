import mongoose from 'mongoose';

const db =()=>{
    mongoose.connect(process.env.MONGO_URI ,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(client=>{
        console.log('mongo running');
    })
    .catch(err=>console.log(err))
}

export default db