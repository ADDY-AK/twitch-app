const PORT = 8000;
const express = require('express');
const app = express();
const bcrypt =require('bcrypt');
const {v1: uuidv1} = require('uuid');
const {connect} = require('getstream');
const cors = require('cors');
app.use(cors());
app.use(express.json());


const API_KEY = '4vdv4j6mdtmt';
const API_SECRET = '4hpye3c3d6beg69ny2shs5n66wz2a34sgmprrqzrzxx6z88drz6za8wh2h7awc3b';
const API_ID = '1161527'

app.post('/signup', async(req,res) => {
    try{
        const {username, password} = req.body;
        const userId=uuidv1();
        const hashedPassword = await bcrypt.hash(password,10);
        const client = connect(API_KEY, API_SECRET, API_ID);
        const token = client.createUserToken(userId);

        res.status(200).json({username, userId, hashedPassword, token})
        console.log(username, password);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }
})


app.listen(PORT, () => console.log(`server running on port ${PORT}`));