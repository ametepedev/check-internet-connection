let isOnline = true;
let tm = 10;//temps de reconnexion en s
let intervalConnect;
const popup = document.querySelector('.popup');

//VERIFIER LA CONNEXION INTERNET
const checkConnection = async() => {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
        //console.log(response);
        isOnline = response.status >= 200 && response.status < 300;//True
    } catch(e){
        //console.log(e);
        isOnline = false//False
    }
    tm = 10;
    clearInterval(intervalConnect);
    popupAnim(isOnline);
}

//ANIMER LE POPUP
const popupAnim = (isOnline) => {
    //SI isOnline est True
    if(isOnline){
        popup.querySelector('.icon span').innerText = 'wifi';
        popup.querySelector('.content .title').innerText = 'connexion restaurée';
        popup.querySelector('.content .description').innerText = 'vous etes connecte a l\'internet';
        return popup.classList.add('on-wifi');
    }
    //SI isOnline est False
    popup.querySelector('.icon span').innerText = 'wifi_off';
    popup.querySelector('.content .title').innerText = 'connexion perdue';
    popup.querySelector('.content .description').innerHTML = 'reconnexion dans <b>0</b>s';
    popup.classList.remove('on-wifi');

    intervalConnect = setInterval(() => {
        tm--;
        if(tm ===0) checkConnection();
        popup.querySelector('.content .description b').innerText = tm;
    }, 1000);

}

//VERIFIER LETAT DE LA CONNEXION CHAQUE 2s(2000ms)
//EXECUTER LA FOCNTION SI ISONLINE = TRUE
setInterval(() => {
    isOnline && checkConnection();
}, 2000);