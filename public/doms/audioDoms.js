const audioDoms = (userList,userId)=>{
    userList.reverse()
    let html = userList.map((i,index)=>{
        if(i.userId == userId){
            if(index == 0){
                return`
                    <audio id="myAudio" class="firstAudio"  autoplay></audio>
                `
            }else{
                return`
                    <audio id="myAudio" controls disablecontrols></audio>

                `
            }
        }else{
            if(index == 0){
                return`
                    <audio id="audio:${i.userId}" class="firstAudio" controls disablecontrols autoplay></audio>

                `
            }else{
                return`
                    <audio id="audio:${i.userId}" controls disablecontrols autoplay></audio>
                `
            }
        }
    })
    return html
}
const audioDoms2 = (userId)=>{
    let html = `
        <audio id="audio:${userId}" class="firstAudio" controls disablecontrols autoplay></audio>
    `
    return html
}
const myAudioDom = ()=>{
    let html = `
        <audio id="myAudio" class="firstAudio" controls disablecontrols autoplay></audio>
    `
    return html
}