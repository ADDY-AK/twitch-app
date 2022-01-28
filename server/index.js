const PORT = 8000;
const express = require('express');
const app = express();
const bcrypt =require('bcrypt');
const {v1: uuidv1} = require('uuid');
const {connect} = require('getstream');
const cors = require('cors');
const StreamChat = require('stream-chat').StreamChat
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

//login
app.post('/login', async(req,res) => {
    try{
        const {username, password} = req.body;
        const client = connect(API_KEY, API_SECRET);
        const chatClient = StreamChat.getInstance(API_KEY, API_SECRET);
        const {users} =await chatClient.queryUsers({name:username});
        if(!users.length) return res.json(400).json({message: 'user does not exist'});
        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = client.createUserToken(users[0].id);
        const confirmedName = users[0].name;
        const userId = users[0].id;

        if(success){
            res.json(200).json({token, username: confirmedName, userId})
        }else{
            res.status(500).res.json({message: 'Login Failed'});
        }


    }catch(error){
        console.log(error);
        res.status(500).json({message: error})

    }
})


app.listen(PORT, () => console.log(`server running on port ${PORT}`));