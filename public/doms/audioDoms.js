const audioDoms = (userList,userId)=>{
    userList.reverse()
    let html = userList.map((i,index)=>{
        if(i.userId == userId){
            if(index == 0){
                audioList.push(`myAudio`)
                return`
                    <audio id="myAudio" class="firstAudio" audioType = 'ambient' audioCategory = 'playback' style="display:none;" autoplay></audio>
                `
            }else{
                audioList.push(`audio:${i.userId}`)
                return`
                    <audio id="myAudio" controls disablecontrols audioType = 'ambient' audioCategory = 'playback' style="display:none;"></audio>

                `
            }
        }else{
            if(index == 0){
                audioList.push(`audio:${i.userId}`)
                return`
                    <audio id="audio:${i.userId}" class="firstAudio" controls disablecontrols autoplay audioType = 'ambient' audioCategory = 'playback' style="display:none;"></audio>

                `
            }else{
                audioList.push(`audio:${i.userId}`)
                return`
                    <audio id="audio:${i.userId}" controls disablecontrols autoplay audioType = 'ambient' audioCategory = 'playback' style="display:none;"></audio>
                `
            }
        }
    })
    return html
}
const audioDoms2 = (userId)=>{
    let html = `
        <audio id="audio:${userId}" class="firstAudio" controls disablecontrols autoplay audioType = 'ambient' audioCategory = 'playback' style="display:none;"></audio>
    `
    audioList.push(`audio:${userId}`)
    return html
}
const myAudioDom = ()=>{
    let html = `
        <audio id="myAudio" class="firstAudio" controls disablecontrols autoplay audioType = 'ambient' audioCategory = 'playback' style="display:none;"></audio>
    `
    audioList.push(`audio:${userId}`)
    return html
}