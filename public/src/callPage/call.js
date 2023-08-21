let userId = document.getElementById("userId").textContent
let roomId = document.getElementById("roomId").textContent
let flg = document.getElementById("flg").textContent
if(flg){
    Socket.emit("createdSocketConnection",{userId:userId,page:"/call"})
    window.sessionStorage.setItem(["userId"],userId)
}
Socket.emit("connectionMeet",{roomId:roomId,userId:userId})
Socket.on("userDiscon",(data)=>{
    alert(data.data)
})

let camFlg = true
let mikeFlg = true
let camStream = null
let backStream = null
let mikeStream = null
const caminit = (firstFlg)=>{
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

const audioInit = (flg)=>{
    if(mikeFlg){
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            mikeStream = stream
            const mediaRecorder = new MediaRecorder(mikeStream);
            const audioElement = document.createElement('audio');
            audioElement.controls = true;
            audioElement.id = "myAudio"
            audioElement.srcObject = mikeStream; // Blobではなく直接ストリームを設定
            document.body.appendChild(audioElement);
            audioElement.play()
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
        let tracks = mikeStream.getTracks()
        tracks.forEach((i)=>{
            i.stop()
        })
        mikeStream = null
    }else{
        mikeFlg = true
        navigator.mediaDevices.getUserMedia({ audio: mikeFlg })
        .then(function(stream) {
            mikeStream = stream
            const mediaRecorder = new MediaRecorder(mikeStream);
            const audioElement = document.getElementById("myAudio")
            audioElement.controls = true;
            audioElement.srcObject = mikeStream; // Blobではなく直接ストリームを設 
            audioElement.play()       
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
        const tracks = myVideo.srcObject.getTracks();
        tracks.forEach(track => {
        track.stop();
        });
        myVideo.srcObject = null
        camStream = null
    }else{
        camFlg = true
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

// Socket.on("joinUser",(data)=>{
//     // alert("newUuser")
//     //今までいたクライアントが始めて接続したクライアントに接続
// })
// Socket.on("setUserNew",(data)=>{
//     alert("conn")
//     //始めて接続したクライアントが今までいたクライアントにっ接続
// })