const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)
const ejs = require("ejs")
const body_pase = require("body-parser")
const session = require("express-session")
const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require('uuid');

const indexPage = fs.readFileSync("./public/views/index.ejs","utf-8")
const mainPage = fs.readFileSync("./public/views/main.ejs","utf-8")
const callPage = fs.readFileSync("./public/views/call.ejs","utf-8")
const createPage = fs.readFileSync("./public/views/createRoom.ejs","utf-8")
const catchPage = fs.readFileSync("./public/views/catchPage.ejs","utf-8")

const createData = require("./backSrc/createData")

let userList = []
let roomList = [ {
    roomId: 'f5934665-bf0d-4356-8777-6a9a25ed1000',
    roomName: 'aa',
    host: '36019a51-1371-4d43-8521-76cde88c7a61',
    pass: 'aa',
    userList: [],
    public: true
  }]


app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
    httpOnly: true,
    secure: false,
    maxage: null
    }
  }))

app.use(body_pase.json());//////////////////////////////   ここ重要
app.use(body_pase.urlencoded({ extended: true }));//////
app.use(express.static(path.join(__dirname, "js")));
app.use("/public",express.static("public"))


app.get("/",(req,res)=>{
    console.log("index")
})

app.get("/joinset/:id",(req,res)=>{

    console.log("joinset")

})
app.get("/mkcall",(req,res)=>{
    if(!req.session.userId){
        req.session.userId = uuidv4()
    }
    let renderPage = ejs.render(createPage,{
        userId:req.session.userId
    })
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write(renderPage)
    res.end()
})
app.get("/call/:id",(req,res)=>{
    let roomId = req.params.id
    let co = 0
    roomList.forEach((i)=>{
        if(i.roomId == roomId){
            co+=1
        }
    })
    if(co != 0){
        console.log("a")
        if(req.session.userId){
            let renderPage = ejs.render(callPage,{
                userId:req.session.userId,
                roomId:roomId,
                flg:false
            })
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(renderPage)
            res.end()
        }else{
            req.session.userId = uuidv4()
            let renderPage = ejs.render(callPage,{
                userId:req.session.userId,
                roomId:roomId,
                flg:true
            })
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(renderPage)
            res.end()
        }
    }else{
        console.log("b")
        res.writeHead(302, {
            'Location': '/main'
          });
         res.end();
    }

})
app.get("/catchpage",(req,res)=>{
    let renderPage = ejs.render(catchPage,{

    })
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write(renderPage)
    res.end()
})
app.get("/main",(req,res)=>{
    console.log(req.session.userId)
    if(!req.session.userId){
        req.session.userId = uuidv4()
    }
    let sendRoomList = roomList.map((i)=>{
        if(i.public){
            return i
        }
    })
    let renderPage = ejs.render(mainPage,{
        userId:req.session.userId,
    })
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write(renderPage)
    res.end()
}) 
io.on("connection",(socket)=>{
    let userId = ""
    let roomID = ""
    socket.on("createdSocketConnection",(data)=>{////////////////socketに接続したら最初はこの処理を行う
        socket.join(data.userId)
        userId = data.userId
        let co = 0
        userList.forEach((i)=>{
            if(i.userId == userId){
                co+=1
            }
        })
        if(co == 0){
            userList.push(createData.createUser(userId,data.page))
            console.log(userList)
        }
        if(data.page == "/main"){
            let publicRoomList = roomList.map((i)=>{
                if(i.public){
                    return i
                }
            })
            io.to(data.userId).emit("conMain",{roomList:publicRoomList})
        }
    })
    socket.on("createRoom",(data)=>{
        let host = data.host
        let roomName = data.roomName
        let pass = data.pass
        let co = 0
        roomList.forEach((i)=>{
            if(i.host == userId){
                co+=1
            }
        })
        if(co == 0){
            roomList.push(createData.createRoomData(host,pass,roomName,true))
            console.log(roomList)
        }else{
            io.to(userId).emit("createError","error1")
        }
    })
    socket.on("connectionMeet",(data)=>{
        console.log(data.roomId)
        io.to(data.roomId).emit("joinUser",{userId:userId,listData:createData.createRoomUser(data.roomId,userId,"user",null)})
        socket.join(data.roomId)
        userList.forEach((i)=>{
            if(i.userId == userId){
                i.page = `/call/${data.roomId}`
            }
            console.log(userList)
        })
        roomList.forEach((i)=>{
            if(i.roomId == data.roomId){
                roomID = data.roomId
                i.userList.push(createData.createRoomUser(data.roomId,userId,"user",null))
                console.log(i.userList)
                io.to(userId).emit("setUserNew",{userId:userId,userList:i.userList})
            }
        })
    })
    socket.on("disconnect",()=>{
        userList.forEach((i,index)=>{
            if(i.userId == userId){
                userList.splice(index,1)
                console.log(userList)
            }
        })
        if(roomID){
            roomList.forEach((i,index)=>{
                if(i.roomId == roomID){
                    i.userList.forEach((h,index2)=>{
                        if(h.userId == userId){
                            i.userList.splice(index2,1)
                            
                            console.log(i.userList)
                            if(i.userList.length<=0){
                                roomList.splice(index,1)
                                console.log(roomList)
                            }else{
                                io.to(i.roomId).emit("userDiscon",{data:userId})
                            }
                        }
                    })
                }
            })
        }
    })
})
server.listen(3000,()=>{
    console.log("server run")
})