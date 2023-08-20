const audioDoms = (userList,userId)=>{
    userList.reverse()
    let html = userList.map((i,index)=>{
        if(i.userId == userId){
            if(index == 0){
                return`
                    <audio id="myAudio" class="firstAudio" controls></audio>
                `
            }else{
                return`
                    <audio id="myAudio" controls></audio>

                `
            }
        }else{
            if(index == 0){
                return`
                    <audio id="audio:${i.userId}" class="firstAudio" controls></audio>

                `
            }else{
                return`
                    <audio id="audio:${i.userId}" controls></audio>
                `
            }
        }
    })
    return html
}
const audioDoms2 = (userId)=>{
    let html = `
        <audio id="audio:${userId}" class="firstAudio" controls></audio>
    `
    return html
}