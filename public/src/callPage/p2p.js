let p2pID = document.getElementById("userId").textContent
let peer = new Peer(p2pID,{
    host: 'peerserverinheroku-2753ea32a44b.herokuapp.com',
    port: 443,
    path: '/myapp',
    secure: true,
})
let conList = []
let streamList = []
let peerList = []
let audioList = []
let userList = []
let firstFlg = true

const sendVideo = (stream)=>{
    console.log("1")
    userList.forEach((i)=>{
        if(i.userId != p2pID){
            console.log(i.userId)
            let sendPeer = peer.call(i.userId,stream)
            peerList.push({userId:i.userId,peer:sendPeer})
        }
    })
}
const sendVideo2 = (stream,id)=>{
    console.log("2")
    if(id != p2pID){
        console.log(id)
        let sendPeer = peer.call(id,stream)
        peerList.push({userId:id,peer:sendPeer})
    }
}
const sendAudio = (stream)=>{
    userList.forEach((i)=>{
        if(i.userId != p2pID){
            let audioPeer = peer.call(i.userId,stream)
            audioList.push({userId:p2pID,peer:audioPeer})
        }
    })
}
const sendAudio2 = (stream,id)=>{
    if(id != p2pID){
        let audioPeer = peer.call(id,stream)
        audioList.push({userId:p2pID,peer:audioPeer})
    }
}
const unshiftList = (userList2)=>{
    userList2.forEach((i,index)=>{
        if(i.userId == p2pID){
            userList.splice(index,1)
            userList.unshift(i)
        }
    })
    console.log(userList)

}

Socket.on("setUserNew",async(data)=>{
    //始めて接続したクライアントが今までいたクライアントにっ接続
    let conCO = 0
    userList = data.userList
    unshiftList(userList)
    let videoWarpp = document.getElementById("videoWindowsWarpp")
    let audioWarpp = document.getElementById("audioWindowsWaerpp")
    audioWarpp.innerHTML = audioDoms(userList,p2pID)
    videoWarpp.innerHTML = videoWindow(userList,p2pID)
    if(userList.length-1>0){
        console.log("eee")
        userList.forEach((i)=>{
            if(i.userId != p2pID){
                console.log(i.userId)
                const conn = peer.connect(i.userId);
                conList.push(conn)
                conn.on("open",()=>{
                    conCO +=1
                    console.log(`${i.userId}に接続しました`)
                    if(conCO >= userList.length-1){
                        console.log(camStream)
                        caminit(true)
                        audioInit(true)
                    }
                })
            }
        })
    }else{
        caminit(false)
        audioInit(false)
    }
})
Socket.on("joinUser",(data)=>{
    userList.push(data.listData)
    let videoWarpp = document.querySelector(".firstVideo")
    videoWarpp.classList.remove("firstVideo")
    videoWarpp.insertAdjacentHTML('beforebegin',videoWindow2(data.userId))
    let audioWarpp = document.querySelector(".firstAudio")
    audioWarpp.classList.remove("firstAudio")
    audioWarpp.insertAdjacentHTML('beforebegin',audioDoms2(data.userId))
    const conn = peer.connect(data.userId)
    conList.push(conn)
    conn.on("open",()=>{
        console.log(`${data.userId}に接続しました`)
        sendVideo2(camStream,data.userId)
        sendAudio2(mikeStream,data.userId)
    })
    //今までいたクライアントが始めて接続したクライアントに接続
})
function sleep(waitMsec) {
    var startMsec = new Date();
  
    while (new Date() - startMsec < waitMsec);
  }
peer.on('connection', (conn) => {
    console.log(`${conn.peer}からの接続あり`);
});
peer.on("call",(call)=>{
    console.log("bbb")
    call.answer();
    let userVideo = document.getElementById("video:"+call.peer)
    let userAudio = document.getElementById("audio:"+call.peer)
    // streamList.forEach((i)=>{
    //     if(i.userId == call.peer){
    //         flg = true
    //     }
    // })
    call.on("stream",(stream)=>{
        if(stream.getVideoTracks().length > 0){
            streamList.push({userId:call.peer,stream:stream})
            console.log(streamList)
            userVideo.srcObject = stream
        }else if(stream.getAudioTracks().length > 0){
            console.log("audio")
            console.log(userAudio)
            if(call.peer != p2pID)
                userAudio.srcObject = stream
                userAudio.play()
        }
    })
})