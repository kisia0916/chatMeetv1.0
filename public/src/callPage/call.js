let userId = document.getElementById("userId").textContent
let roomId = document.getElementById("roomId").textContent
console.log(userId,roomId)
let flg = document.getElementById("flg").textContent
if(flg){
    Socket.emit("createdSocketConnection",{userId:userId,page:"/call"})
    window.sessionStorage.setItem(["userId"],userId)
}
Socket.emit("connectionMeet",{roomId:roomId,userId:userId})
Socket.on("userDiscon",(data)=>{
    // alert(data.data)
    let disconVideo = document.getElementById(`2video:${data.data}`)
    let disconAudio = document.getElementById(`audio:${data.data}`)

    console.log(disconVideo.classList)
    disconVideo.remove()
    disconAudio.remove()
    // if(disconVideo.classList.length>1){
    let warpp = document.querySelector(".roomCenterMain")
    let firstChild = warpp.querySelector(':first-child');
    console.log(firstChild)
    firstChild.classList.add("firstVideo")
    // }
    let warpp2 = document.getElementById("audioWindowsWaerpp")
    let firstChild2 = warpp2.querySelector(':first-child');
    console.log(firstChild2)
    firstChild2.classList.add("firstAudio")
    conList.forEach((i,index)=>{
        if(i.peer == data.data){
            conList.splice(index,1)
        }
    })
    streamList.forEach((i,index)=>{
        if(i.userId == data.data){
            streamList.splice(index,1)
        }
    })
    peerList.forEach((i,index)=>{
        if(i.userId == data.data){
            peerList.splice(index,1)
        }
    })
    audioTagList.forEach((i,index)=>{
        if(i == `audio:${data.data}`){
            audioTagList.splice(index,1)
        }
    })
    audioList.forEach((i,index)=>{
        if(i.userId == data.data){
            audioList.splice(index,1)
        }
    })
    userList.forEach((i,index)=>{
        if(i.userId == data.data){
            userList.splice(index,1)
        }
    })
    console.log(conList)
    console.log(streamList)
    console.log(peerList)
    console.log(audioTagList)
    console.log(audioList)
    console.log(userList)
    
})

let camFlg = window.sessionStorage.getItem(["cam"])
let mikeFlg = window.sessionStorage.getItem(["mike"])
let headFlg = window.sessionStorage.getItem(["audio"])

if(window.sessionStorage.getItem(["cam"]) == "true"){
    camFlg = true
}else{
    camFlg = false
    let camButton = document.querySelector(".camChangeText")
    if(camButton){
        camButton.textContent = "OFF"
        camButton.style.color = "#ff3838"
    }
}
if(window.sessionStorage.getItem(["mike"]) == "true"){
    mikeFlg = true
}else{
    mikeFlg = false
    let camButton = document.querySelector(".mikeChangeText")
    if(camButton){
        camButton.textContent = "OFF"
        camButton.style.color = "#ff3838"
    }
}
if(window.sessionStorage.getItem(["audio"]) == "true"){
    headFlg = true
}else{
    headFlg = false
    let audioIcon = document.querySelector(".audioIcon")
    let audioIcon2 = document.querySelector(".audioIcon2")
    console.log(audioIcon)

    audioIcon.style.display = "none"
    audioIcon2.style.display = "block" 
}
let camStream = null
let backStream = null
let mikeStream = null
let audioTagList = []
const caminit = (firstFlg)=>{
    console.log(camFlg)
    if(camFlg){
        console.log("caminit")
        let myVideo = document.getElementById("myVideo")
        console.log(myVideo)
        navigator.mediaDevices.getUserMedia({video : camFlg})
        .then((stream)=>{
            camStream = stream
            backStream = stream
            myVideo.srcObject = camStream
            if(firstFlg){
                sendVideo(camStream)
            }
        }
        ).catch((err)=>{
            console.log("camError"+err)
        })
    }
}

const audioInit = (flg)=>{
    if(mikeFlg){
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            mikeStream = stream
            const mediaRecorder = new MediaRecorder(mikeStream);
            // const audioElement = document.createElement('audio');
            // audioElement.controls = true;
            // audioElement.id = "myAudio"
            // audioElement.srcObject = mikeStream; // Blobではなく直接ストリームを設定
            // document.body.appendChild(audioElement);
            // // audioElement.muted()
            // audioElement.play()
            // let myAudio = document.getElementById("myAudio")
            // myAudio.audioType = 'ambient' // または 'ambient'
            // myAudio.audioCategory = 'playback'; // または 'playback'
            // audioTagList.push("myAudio")
            // myAudio.srcObject = mikeStream
            // myAudio.play()
            mediaRecorder.ondataavailable = function(event) {
            if (event.data.size > 0) {
                // 録音データの処理
            }
            };
        
            mediaRecorder.onstop = function() {
            // 録音停止後の処理
            };
        
            mediaRecorder.start();
            if(flg){
                sendAudio(mikeStream)
            }
        })
        .catch(function(err) {
        console.error('マイクアクセスが拒否されました: ', err);
        });
    }
}

const changeMike = ()=>{
    if(mikeFlg){
        mikeFlg = false
        let mikeButton = document.querySelector(".mikeChangeText")
        if(mikeButton){
            mikeButton.textContent = "OFF"
            mikeButton.style.color = "#ff3838"
        }
        let tracks = mikeStream.getTracks()
        tracks.forEach((i)=>{
            i.stop()
        })
        mikeStream = null
    }else{
        mikeFlg = true
        let mikeButton = document.querySelector(".mikeChangeText")
        if(mikeButton){
            mikeButton.textContent = "ON"
            mikeButton.style.color = "#50FA7B"
        }
        navigator.mediaDevices.getUserMedia({ audio: mikeFlg })
        .then(function(stream) {
            mikeStream = stream
            const mediaRecorder = new MediaRecorder(mikeStream);
            // const audioElement = document.getElementById("myAudio")
            // audioElement.controls = true;
            // audioElement.srcObject = mikeStream; // Blobではなく直接ストリームを設 
            // audioElement.play()       
            mediaRecorder.ondataavailable = function(event) {
            if (event.data.size > 0) {
                // 録音データの処理
            }
            };
        
            mediaRecorder.onstop = function() {
            // 録音停止後の処理
            };
        
            mediaRecorder.start();
            if(mikeFlg){
                sendAudio(mikeStream)
            }
        })
        .catch(function(err) {
        console.error('マイクアクセスが拒否されました: ', err);
        });
    }
}

const camChange = ()=>{
    let myVideo = document.getElementById("myVideo")

    if(camFlg){
        camFlg = false
        peerList = []
        let camButton = document.querySelector(".camChangeText")

        Socket.emit("camState",{userId:p2pID,roomId:roomId,flg:true})
        if(camButton){
            camButton.textContent = "OFF"
            camButton.style.color = "#ff3838"
        }
        const tracks = myVideo.srcObject.getTracks();
        tracks.forEach(track => {
        track.stop();
        });
        myVideo.srcObject = null
        camStream = null
    }else{
        camFlg = true
        let camButton = document.querySelector(".camChangeText")

        Socket.emit("camState",{userId:p2pID,roomId:roomId,flg:false})
        if(camButton){
            camButton.textContent = "ON"
            camButton.style.color = "#50FA7B"
        }
        navigator.mediaDevices.getUserMedia({video : camFlg})
        .then((stream)=>{
            camStream = stream
            backStream = stream
            myVideo.srcObject = camStream
            if(firstFlg){
                sendVideo(camStream)
            }
        }
        ).catch(()=>{
    
        })
    }
}
const changeAudios = ()=>{
    if(headFlg){
        audioTagList.forEach((i)=>{
            console.log(1)
            console.log(i)
            let tag = document.getElementById(i)
            if(tag){
                tag.muted = true
            }
            let audioIcon = document.querySelector(".audioIcon")
            let audioIcon2 = document.querySelector(".audioIcon2")
            console.log(audioIcon)

            audioIcon.style.display = "none"
            audioIcon2.style.display = "block" 
            headFlg = false
        })
    }else{
        audioTagList.forEach((i)=>{
            console.log(2)
            console.log(i)
            let tag = document.getElementById(i)
            if(tag){
                tag.muted = false
            }
            let audioIcon = document.querySelector(".audioIcon")
            let audioIcon2 = document.querySelector(".audioIcon2")
            console.log(audioIcon)
            audioIcon.style.display = "block"
            audioIcon2.style.display = "none"
            headFlg = true
        })
    }
}
const moveMeet = ()=>{
    location.href = "/main"
}
Socket.on("camState",(data)=>{
    let audioDom = document.getElementById("video:"+data.userId)
    console.log("camState")
    if(audioDom){
        if(data.flg){
            audioDom.style.display = "none"
        }else{
            audioDom.style.display = "block"
        }
    }
})
// Socket.on("joinUser",(data)=>{
//     // alert("newUuser")
//     //今までいたクライアントが始めて接続したクライアントに接続
// })
// Socket.on("setUserNew",(data)=>{
//     alert("conn")
//     //始めて接続したクライアントが今までいたクライアントにっ接続
// })