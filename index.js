import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let users = [{name:"mandeep",email:"mandeep@gmail.com",id:"ab5ke"},{name:"dewanshu",email:"dewa@gmail.com",id:"kk39d"},{name:"komal",email:"komal@email.com",id:"ajd3k"}]

app.get('/users',(req,res)=>{
    res.status(200).send(users)
})

app.post('/users',(req,res)=>{
    console.log(req.body);
    const {name} = req.body;
    const {email} = req.body;
    

    // generating random id
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    while(true){
        id = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * 36);
            id += characters[randomIndex];
        } 
        //  iterate over array to check uniqueness of id
        for(let user in users){
            if(user.id===id){
                continue;
            }
        }
        break;
    }

    const newUser = {name,email,id};

    users = [...users,newUser];

    res.status(201).send('new user created successfully');
})

app.delete('/users/:id',(req,res)=>{
    const {id} = req.params;
    let removed = false;
    users = users.filter(user => {
        const flag = user.id !== id;
        if(flag===false) removed = true;
        return flag;
    });
    console.log(users);
    if(removed){
        return res.status(200).send('user removed successfully');
    }
    res.status(404).send('user not found');
})

app.listen(5200,()=>{
    console.log('server is listening on port 5200')
})