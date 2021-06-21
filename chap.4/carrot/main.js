const playStop = document.querySelector('.playStop');
const PSBtn = document.querySelector('.playStop > i');
const timer = document.querySelector('.timer');
const count = document.querySelector('.count');

const main = document.querySelector('.main');
const bugs = document.querySelectorAll('.imgs.bug');

let setInt;

function mainSet(change){
    let mainSetHtml = '';
    let setTime = '';
    if(change == 'fa-play'){
        PSBtn.setAttribute('class', 'fas fa-stop');
        setTime = 'play';

        mainSetHtml = `<img src="img/carrot.png" data-link="0" class="imgs carrot" alt="carrot">
                       <img src="img/carrot.png" data-link="1" class="imgs carrot" alt="carrot">
                       <img src="img/carrot.png" data-link="2" class="imgs carrot" alt="carrot">
                       <img src="img/carrot.png" data-link="3" class="imgs carrot" alt="carrot">
                       <img src="img/carrot.png" data-link="4" class="imgs carrot" alt="carrot">
                       <img src="img/carrot.png" data-link="5" class="imgs carrot" alt="carrot">
                       <img src="img/carrot.png" data-link="6" class="imgs carrot" alt="carrot">
                       <img src="img/carrot.png" data-link="7" class="imgs carrot" alt="carrot">
                       <img src="img/carrot.png" data-link="8" class="imgs carrot" alt="carrot">
                       <img src="img/carrot.png" data-link="9" class="imgs carrot" alt="carrot">
                       <img src="img/bug.png" data-link="10" class="imgs bug" alt="bug">
                       <img src="img/bug.png" data-link="11" class="imgs bug" alt="bug">
                       <img src="img/bug.png" data-link="12" class="imgs bug" alt="bug">
                       <img src="img/bug.png" data-link="13" class="imgs bug" alt="bug">
                       <img src="img/bug.png" data-link="14" class="imgs bug" alt="bug">
                       <img src="img/bug.png" data-link="15" class="imgs bug" alt="bug">
                       <img src="img/bug.png" data-link="16" class="imgs bug" alt="bug">
                       <img src="img/bug.png" data-link="17" class="imgs bug" alt="bug">
                       <img src="img/bug.png" data-link="18" class="imgs bug" alt="bug">
                       <img src="img/bug.png" data-link="19" class="imgs bug" alt="bug">
                       <div class="modal">
                           <div class="modalBox"></div>
                           <button class="reStart">
                               <i class="fas fa-undo"></i>
                           </button>
                           <div class="resultSet">You Won!</div>
                       </div>`;
    }else {
        PSBtn.setAttribute('class', 'fas fa-play');
        setTime = 'stop';

        mainSetHtml = '';
    } 

    main.innerHTML = mainSetHtml;

    reset();
    timeSet(setTime);
}

function reset(){
    const imgs = document.querySelectorAll('.imgs');

    imgs.forEach((item, index) => {
        const X = Math.random() * 10000;
        const Y = Math.random()* 1000;
    
        const setX = (X < 1450) ? X : (X / 10);
        const setY = (Y < 400) ? Y : (Y / 10);

        item.style.transform = `translate(${setX}px, ${setY}px)`;
    });

};

function timeSet(setTime){
    count.textContent = 10;
    let second = 10;
    timer.textContent = `00:${second}`;
    if(setTime == 'play'){        
        setInt = window.setInterval(() => {        
            second = second - 1;
            (second == 10) ? timer.textContent = `00:${second}` : timer.textContent = `00:0${second}`;
            if(second == 0){
                reStartBtn(false);        
                stopInterval();    
            }
        }, 1000);
    }else{
        stopInterval();    
    }

}

function stopInterval(){
    clearInterval(setInt);
}

function clickImg(targetImg){
    if(targetImg.className == 'imgs carrot'){
        targetImg.remove();

        const carrots = document.querySelectorAll('.imgs.carrot');
        remainCarrot(carrots);
    }else if(targetImg.className == 'imgs bug'){
        reStartBtn(false);
        stopInterval();
    }else{
        return;
    }
}

function remainCarrot(carrots){
    count.textContent = carrots.length;
    if(carrots.length == 0){
        modalLoad(true);
        stopInterval();
    };
}

function reStartBtn(result){
    modalLoad(result);

    const reStart = document.querySelector('.reStart');
    reStart.addEventListener('click', (e) => {
        mainSet('fa-play');        
    });
}

function modalLoad(result){
    const modal = document.querySelector('.modal');
    const modalBox = document.querySelector('.modalBox');
    const resultSet = document.querySelector('.resultSet');
    
    modal.style.visibility = 'visible';
    (result == true) ? resultSet.textContent = 'You Won!' : resultSet.textContent = 'You Lose!';
}

function changeBtn(){    
    let token = PSBtn.classList[1];    
    return token;
}

document.addEventListener('DOMContentLoaded', () => {

});

main.addEventListener('click', (e) => {
    const target = e.target;
    clickImg(target);
});

playStop.addEventListener('click', (e) => {
    changeBtn() == 'fa-play' ? mainSet('fa-play') : mainSet('fa-stop');
});


