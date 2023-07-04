/*--Menu-------------------------------------------------------------------------------------------------------------------------------------------*/
window.oncontextmenu = (e)=>{e.preventDefault()}
window.onload = initLoad;

function initLoad(){
    try{
        thawab = JSON.parse(localStorage.getItem("alphabet-game-thawab"));
        if(!thawab){
            localStorage.setItem("alphabet-game-thawab","0");
            thawab = 0;
        }
    }
    catch{
        localStorage.setItem("alphabet-game-thawab","0");
        thawab = 0;
    }
    document.querySelector(".thawab-value").innerHTML = thawab;
    addEvents();
    loadGameData();
}
function openWindow(element,callback,type){
    if(!type) type = "block";
    element.style.webkitAnimation = "fadeIn linear 0.1s";
    element.style.mozAnimation = "fadeIn linear 0.1s";
    element.style.animation = "fadeIn linear 0.1s";
    element.style.display = type;
    element.onanimationend = ()=>{
        element.style.webkitAnimation = "none";
        element.style.mozAnimation = "none";
        element.style.animation = "none";
        if(callback) callback();
    }
}
function closeWindow(element,callback){
    element.style.webkitAnimation = "fadeOut linear 0.1s";
    element.style.mozAnimation = "fadeOut linear 0.1s";
    element.style.animation = "fadeOut linear 0.1s";
    element.onanimationend = ()=>{
        element.style.webkitAnimation = "none";
        element.style.mozAnimation = "none";
        element.style.animation = "none";
        element.style.display = "none";
        if(callback) callback();
    }
}
function addEvents(){
    let games = document.querySelectorAll(".game");
    let gameHolder = document.querySelector(".game-holder");
    let homeButtons = document.querySelectorAll(".home-button");
    let thawabHolder = document.querySelector(".thawab-holder");
    let gamePreviews = document.querySelectorAll(".game-preview");
    let againButtons = document.querySelectorAll(".again-button");
    let beginButtons = document.querySelectorAll(".begin-button");
    let soundReplays = document.querySelectorAll(".sound-replay");
    
    for(let i = 0; i < gamePreviews.length; i++){
        gamePreviews[i].onclick = ()=>{
            initGame(i);
            openWindow(gameHolder,openWindow(games[i]));
            thawabHolder.style.webkitAnimation = "moveUp linear 0.1s";
            thawabHolder.style.mozAnimation = "moveUp linear 0.1s";
            thawabHolder.style.animation = "moveUp linear 0.1s";
            thawabHolder.onanimationend = ()=>{
                thawabHolder.style.webkitAnimation = "none";
                thawabHolder.style.mozAnimation = "none";
                thawabHolder.style.animation = "none";
                thawabHolder.onanimationend = null;
                thawabHolder.style.top = "2.5vh";
            }
        }
    }
    for(let i = 0; i < homeButtons.length; i++){
        homeButtons[i].onclick = ()=>{
            closeWindow(gameHolder,()=>{
                for(let j = 0; j < games.length; j++){
                    games[j].style.display = "none";
                }
            });
            closeWindow(document.getElementById("sound-replay-"+currGame.index));
            thawabHolder.style.webkitAnimation = "moveDown linear 0.1s";
            thawabHolder.style.mozAnimation = "moveDown linear 0.1s";
            thawabHolder.style.animation = "moveDown linear 0.1s";
            thawabHolder.onanimationend = ()=>{
                thawabHolder.style.webkitAnimation = "none";
                thawabHolder.style.mozAnimation = "none";
                thawabHolder.style.animation = "none";
                thawabHolder.onanimationend = null;
                thawabHolder.style.top = "5vh";
            }
        }
    } 
    for(let i = 0; i < soundReplays.length; i++){
        soundReplays[i].onclick = ()=>{
            currGame.audio[currGame.order[currGame.currLevel]].play();
        }
    }  
    for(let i = 0; i < beginButtons.length; i++){
        beginButtons[i].onclick = ()=>{
            closeWindow(document.getElementById("begin-button-"+currGame.index));
            openWindow(document.getElementById("display-image-"+currGame.index),null);
            openWindow(document.getElementById("level-count-"+currGame.index),null,"flex");
            openWindow(document.getElementById("sound-replay-"+currGame.index));
            gameLoop();
        }
    }
    for(let i = 0; i < againButtons.length; i++){
        againButtons[i].onclick = ()=>{
            closeWindow(document.getElementById("congrats-"+currGame.index));
            closeWindow(document.getElementById("again-"+currGame.index));
            initGame(currGame.index-1);
        }
    }
}

/*--Game-------------------------------------------------------------------------------------------------------------------------------------------*/
let thawab, currGame, allGames = [];
function loadGameData(){
    allGames = [
        {
            backImgs:[
                "Images/Game 1/Question Image/Q1.jpg","Images/Game 1/Question Image/Q2.jpg","Images/Game 1/Question Image/Q3.jpg","Images/Game 1/Question Image/Q4.jpg",
                "Images/Game 1/Question Image/Q5.jpg","Images/Game 1/Question Image/Q6.jpg","Images/Game 1/Question Image/Q7.jpg","Images/Game 1/Question Image/Q8.jpg"
            ],
            imgs:["Images/Game 1/001-alif.png", "Images/Game 1/002-baa.png", "Images/Game 1/003-taa.png", "Images/Game 1/004-thaa.png"],
            audio:[new Audio("Audio/Game 1/001-alif.mp3"), new Audio("Audio/Game 1/002-ba.mp3"), new Audio("Audio/Game 1/003-taa.mp3"), new Audio("Audio/Game 1/004-tha.mp3")],
            order:[0,0,1,1,2,2,3,3], size:4, index:1, thawab:false, loop:false
        },
        {
            backImgs:[
                "Images/Game 2/Question Image/Q1.jpg","Images/Game 2/Question Image/Q2.jpg","Images/Game 2/Question Image/Q3.jpg","Images/Game 2/Question Image/Q4.jpg",
                "Images/Game 2/Question Image/Q5.jpg","Images/Game 2/Question Image/Q6.jpg","Images/Game 2/Question Image/Q7.jpg","Images/Game 2/Question Image/Q8.jpg",
                "Images/Game 2/Question Image/Q9.jpg","Images/Game 2/Question Image/Q10.jpg","Images/Game 2/Question Image/Q11.jpg","Images/Game 2/Question Image/Q12.jpg"
            ],
            imgs:["Images/Game 2/005-jeem.png", "Images/Game 2/006-haa.png", "Images/Game 2/007-khaa.png"],
            audio:[new Audio("Audio/Game 2/005-jeem.mp3"), new Audio("Audio/Game 2/006-haa.mp3"), new Audio("Audio/Game 2/007-khaa.mp3")],
            order:[0,0,0,0,1,1,1,1,2,2,2,2], size:3, index:2, thawab:false, loop:false
        },
        {
            backImgs:[
                "Images/Game 3/Question Image/Q1.jpg","Images/Game 3/Question Image/Q2.jpg","Images/Game 3/Question Image/Q3.jpg","Images/Game 3/Question Image/Q4.jpg",
                "Images/Game 3/Question Image/Q5.jpg","Images/Game 3/Question Image/Q6.jpg","Images/Game 3/Question Image/Q7.jpg","Images/Game 3/Question Image/Q8.jpg"
            ],
            imgs:["Images/Game 3/008-daal.png", "Images/Game 3/009-dhaal.png", "Images/Game 3/010-raa.png", "Images/Game 3/011-zaa.png"],
            audio:[new Audio("Audio/Game 3/008-daal.mp3"), new Audio("Audio/Game 3/009-dhaal.mp3"), new Audio("Audio/Game 3/010-raa.mp3"), new Audio("Audio/Game 3/011-zaa.mp3")],
            order:[0,0,1,1,2,2,3,3], size:4, index:3, thawab:false, loop:false
        },
        {
            backImgs:[
                "Images/Game 4/Question Image/Q1.jpg","Images/Game 4/Question Image/Q2.jpg","Images/Game 4/Question Image/Q3.jpg","Images/Game 4/Question Image/Q4.jpg",
                "Images/Game 4/Question Image/Q5.jpg","Images/Game 4/Question Image/Q6.jpg","Images/Game 4/Question Image/Q7.jpg","Images/Game 4/Question Image/Q8.jpg",
                "Images/Game 4/Question Image/Q9.jpg","Images/Game 4/Question Image/Q10.jpg","Images/Game 4/Question Image/Q11.jpg","Images/Game 4/Question Image/Q12.jpg"
            ],
            imgs:["Images/Game 4/012-seen.png", "Images/Game 4/013-sheen.png", "Images/Game 4/014-saad.png", "Images/Game 4/015-daad.png"],
            audio:[new Audio("Audio/Game 4/012-seen.mp3"), new Audio("Audio/Game 4/013-sheen.mp3"), new Audio("Audio/Game 4/014-saad.mp3"), new Audio("Audio/Game 4/015-daad.mp3")],
            order:[0,0,0,1,1,1,2,2,2,3,3,3], size:4, index:4, thawab:false, loop:false
        },
        {
            backImgs:[
                "Images/Game 5/Question Image/Q1.png","Images/Game 5/Question Image/Q2.png","Images/Game 5/Question Image/Q3.png","Images/Game 5/Question Image/Q4.png",
                "Images/Game 5/Question Image/Q5.png","Images/Game 5/Question Image/Q6.png","Images/Game 5/Question Image/Q7.png","Images/Game 5/Question Image/Q8.png"
            ],
            imgs:["Images/Game 5/016-toa.png", "Images/Game 5/017-zoa.png", "Images/Game 5/018-ain.png", "Images/Game 5/019-ghain.png"],
            audio:[new Audio("Audio/Game 5/016-toa.mp3"), new Audio("Audio/Game 5/017-zoa.mp3"), new Audio("Audio/Game 5/018-ain.mp3"), new Audio("Audio/Game 5/019-ghain.mp3")],
            order:[0,0,1,1,2,2,3,3], size:4, index:5, thawab:false, loop:false
        },
        {
            backImgs:[
                "Images/Game 6/Question Image/Q1.png","Images/Game 6/Question Image/Q2.png","Images/Game 6/Question Image/Q3.png","Images/Game 6/Question Image/Q4.png",
                "Images/Game 6/Question Image/Q5.png","Images/Game 6/Question Image/Q6.png","Images/Game 6/Question Image/Q7.png","Images/Game 6/Question Image/Q8.png"
            ],
            imgs:["Images/Game 6/020-faa.png", "Images/Game 6/021-qaaf.png", "Images/Game 6/022-kaaf.png", "Images/Game 6/023-laam.png"],
            audio:[new Audio("Audio/Game 6/020-faa.mp3"), new Audio("Audio/Game 6/021-qaaf.mp3"), new Audio("Audio/Game 6/022-kaaf.mp3"), new Audio("Audio/Game 6/023-laam.mp3")],
            order:[0,0,1,1,2,2,3,3], size:4, index:6, thawab:false, loop:false
        },
        {
            backImgs:[
                "Images/Game 7/Question Image/Q1.jpg","Images/Game 7/Question Image/Q2.jpg","Images/Game 7/Question Image/Q3.jpg","Images/Game 7/Question Image/Q4.jpg",
                "Images/Game 7/Question Image/Q5.jpg","Images/Game 7/Question Image/Q6.jpg","Images/Game 7/Question Image/Q7.jpg","Images/Game 7/Question Image/Q8.jpg"
            ],
            imgs:["Images/Game 7/024-meem.png", "Images/Game 7/025-noon.png", "Images/Game 7/026-waw.png", "Images/Game 7/027-hha.png"],
            audio:[new Audio("Audio/Game 7/024-meem.mp3"), new Audio("Audio/Game 7/025-noon.mp3"), new Audio("Audio/Game 7/026-waw.mp3"), new Audio("Audio/Game 7/027-hha.mp3")],
            order:[0,0,1,1,2,2,3,3], size:4, index:7, thawab:false, loop:false
        },
        {
            backImgs:[
                "Images/Game 8/Question Image/Q1.jpg","Images/Game 8/Question Image/Q2.jpg","Images/Game 8/Question Image/Q3.jpg","Images/Game 8/Question Image/Q4.jpg",
                "Images/Game 8/Question Image/Q5.jpg","Images/Game 8/Question Image/Q6.jpg","Images/Game 8/Question Image/Q7.jpg","Images/Game 8/Question Image/Q8.jpg",
                "Images/Game 8/Question Image/Q9.jpg"
            ],
            imgs:["Images/Game 8/028-laamalif.png", "Images/Game 8/029-hamza.png", "Images/Game 8/030-yaa.png"],
            audio:[new Audio("Audio/Game 8/028-laamalif.mp3"), new Audio("Audio/Game 8/029-hamza.mp3"), new Audio("Audio/Game 8/030-yaa.mp3")],
            order:[0,0,0,1,1,1,2,2,2], size:3, index:8, thawab:false, loop:false
        },
        {
            backImgs:[
                "Images/Game 9/Question Image/Q1.png","Images/Game 9/Question Image/Q2.png","Images/Game 9/Question Image/Q3.png","Images/Game 9/Question Image/Q4.png","Images/Game 9/Question Image/Q5.png",
                "Images/Game 9/Question Image/Q6.png","Images/Game 9/Question Image/Q7.png","Images/Game 9/Question Image/Q8.png","Images/Game 9/Question Image/Q9.png","Images/Game 9/Question Image/Q10.png",
                "Images/Game 9/Question Image/Q11.png","Images/Game 9/Question Image/Q12.png","Images/Game 9/Question Image/Q13.png","Images/Game 9/Question Image/Q14.png","Images/Game 9/Question Image/Q15.png",
                "Images/Game 9/Question Image/Q16.png","Images/Game 9/Question Image/Q17.png","Images/Game 9/Question Image/Q18.png","Images/Game 9/Question Image/Q19.png","Images/Game 9/Question Image/Q20.png",
                "Images/Game 9/Question Image/Q21.png","Images/Game 9/Question Image/Q22.png","Images/Game 9/Question Image/Q23.png","Images/Game 9/Question Image/Q24.png","Images/Game 9/Question Image/Q25.png",
                "Images/Game 9/Question Image/Q26.png","Images/Game 9/Question Image/Q27.png","Images/Game 9/Question Image/Q28.png","Images/Game 9/Question Image/Q29.png","Images/Game 9/Question Image/Q30.png",
                "Images/Game 9/Question Image/Q31.png","Images/Game 9/Question Image/Q32.png","Images/Game 9/Question Image/Q33.png","Images/Game 9/Question Image/Q34.png","Images/Game 9/Question Image/Q35.png",
                "Images/Game 9/Question Image/Q36.png","Images/Game 9/Question Image/Q37.png","Images/Game 9/Question Image/Q38.png","Images/Game 9/Question Image/Q39.png","Images/Game 9/Question Image/Q40.png",
                "Images/Game 9/Question Image/Q41.png","Images/Game 9/Question Image/Q42.png","Images/Game 9/Question Image/Q43.png","Images/Game 9/Question Image/Q44.png","Images/Game 9/Question Image/Q45.png",
                "Images/Game 9/Question Image/Q46.png","Images/Game 9/Question Image/Q47.png","Images/Game 9/Question Image/Q48.png","Images/Game 9/Question Image/Q49.png","Images/Game 9/Question Image/Q50.png",
                "Images/Game 9/Question Image/Q51.png","Images/Game 9/Question Image/Q52.png","Images/Game 9/Question Image/Q53.png","Images/Game 9/Question Image/Q54.png","Images/Game 9/Question Image/Q55.png",
                "Images/Game 9/Question Image/Q56.png","Images/Game 9/Question Image/Q57.png","Images/Game 9/Question Image/Q58.png","Images/Game 9/Question Image/Q59.png","Images/Game 9/Question Image/Q60.png"
            ],
            imgs:[
                "Images/Game 9/001-alif.png", "Images/Game 9/002-baa.png", "Images/Game 9/003-taa.png",
                "Images/Game 9/004-thaa.png", "Images/Game 9/005-jeem.png", "Images/Game 9/006-haa.png",
                "Images/Game 9/007-khaa.png", "Images/Game 9/008-daal.png", "Images/Game 9/009-dhaal.png",
                "Images/Game 9/010-raa.png", "Images/Game 9/011-zaa.png", "Images/Game 9/012-seen.png",
                "Images/Game 9/013-sheen.png", "Images/Game 9/014-saad.png", "Images/Game 9/015-daad.png",
                "Images/Game 9/016-toa.png", "Images/Game 9/017-zoa.png", "Images/Game 9/018-ain.png",
                "Images/Game 9/019-ghain.png", "Images/Game 9/020-faa.png", "Images/Game 9/021-qaaf.png",
                "Images/Game 9/022-kaaf.png", "Images/Game 9/023-laam.png", "Images/Game 9/024-meem.png",
                "Images/Game 9/025-noon.png", "Images/Game 9/026-waw.png", "Images/Game 9/027-hha.png",
                "Images/Game 9/028-laamalif.png", "Images/Game 9/029-hamza.png", "Images/Game 9/030-yaa.png"
            ],
            audio:[
                new Audio("Audio/Game 9/001-alif.mp3"), new Audio("Audio/Game 9/002-ba.mp3"), new Audio("Audio/Game 9/003-taa.mp3"),
                new Audio("Audio/Game 9/004-tha.mp3"), new Audio("Audio/Game 9/005-jeem.mp3"), new Audio("Audio/Game 9/006-haa.mp3"),
                new Audio("Audio/Game 9/007-khaa.mp3"), new Audio("Audio/Game 9/008-daal.mp3"), new Audio("Audio/Game 9/009-dhaal.mp3"),
                new Audio("Audio/Game 9/010-raa.mp3"), new Audio("Audio/Game 9/011-zaa.mp3"), new Audio("Audio/Game 9/012-seen.mp3"),
                new Audio("Audio/Game 9/013-sheen.mp3"), new Audio("Audio/Game 9/014-saad.mp3"), new Audio("Audio/Game 9/015-daad.mp3"),
                new Audio("Audio/Game 9/016-toa.mp3"), new Audio("Audio/Game 9/017-zoa.mp3"), new Audio("Audio/Game 9/018-ain.mp3"),
                new Audio("Audio/Game 9/019-ghain.mp3"), new Audio("Audio/Game 9/020-faa.mp3"), new Audio("Audio/Game 9/021-qaaf.mp3"),
                new Audio("Audio/Game 9/022-kaaf.mp3"), new Audio("Audio/Game 9/023-laam.mp3"), new Audio("Audio/Game 9/024-meem.mp3"),
                new Audio("Audio/Game 9/025-noon.mp3"), new Audio("Audio/Game 9/026-waw.mp3"), new Audio("Audio/Game 9/027-hha.mp3"),
                new Audio("Audio/Game 9/028-laamalif.mp3"), new Audio("Audio/Game 9/029-hamza.mp3"), new Audio("Audio/Game 9/030-yaa.mp3")
            ],
            order:[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29],
            size:3, index:9, thawab:true, loop:true
        }
    ]
}
function initGame(index){
    currGame = allGames[index];
    currGame.order = shuffleArray(currGame.order);
    currGame.currLevel = 0;
    currGame.count = 0;

    document.getElementById("level-count-"+currGame.index).style.display = "none";
    document.getElementById("begin-button-"+currGame.index).style.display = "flex";
    let letterHolder = document.getElementById("letter-holder-"+currGame.index);
    while(letterHolder.children.length > 0) letterHolder.removeChild(letterHolder.lastChild);
    for(let i = 0; i < currGame.size; i++){
        let letter = document.createElement("div");
        letter.className = "letter letter-"+currGame.index;
        letter.id = i;
        letterHolder.appendChild(letter);
    }

    let letters = document.querySelectorAll(".letter-"+currGame.index);
    for(let i = 0; i < letters.length; i++){
        letters[i].style.backgroundImage = "url('"+currGame.imgs[i]+"')";
        letters[i].style.height = "0px";
        letters[i].style.width = "0px";
        letters[i].id = i;
    }

    let displayImage = document.getElementById("display-image-"+currGame.index);
    displayImage.style.backgroundImage = "url('"+currGame.backImgs[0]+"')";
    displayImage.style.height = "0px";
    displayImage.style.width = "0px";
}
function shuffleArray(array){
    let randIndex, currIndex = array.length;
    while (currIndex != 0){
        randIndex = Math.floor(Math.random() * currIndex);
        currIndex--;
        [array[currIndex], array[randIndex]] = [array[randIndex], array[currIndex]];
    }
    return array;
}
function guessMade(correct){
    let holder, check1, check2;
    if(correct){
        holder = document.querySelector(".correct");
        check1 = document.querySelector(".correct-check-1");
        check2 = document.querySelector(".correct-check-2");
    }
    else{
        holder = document.querySelector(".wrong");
        check1 = document.querySelector(".wrong-check-1");
        check2 = document.querySelector(".wrong-check-2");
    }
    openWindow(holder,()=>{
        check1.style.webkitAnimation = "extend linear 0.1s";
        check1.style.mozAnimation = "extend linear 0.1s";
        check1.style.animation = "extend linear 0.1s";
        check1.style.display = "block";

        check2.style.webkitAnimation = "extend linear 0.1s";
        check2.style.mozAnimation = "extend linear 0.1s";
        check2.style.animation = "extend linear 0.1s";
        check2.style.display = "block";

        setTimeout(()=>{
            closeWindow(holder,()=>{
                check1.style.webkitAnimation = "none";
                check1.style.mozAnimation = "none";
                check1.style.animation = "none";
                check1.style.display = "none";

                check2.style.webkitAnimation = "none";
                check2.style.mozAnimation = "none";
                check2.style.animation = "none";
                check2.style.display = "none";
            });
        },750);
    });
}
function gameLoop(){
    let displayImage = document.getElementById("display-image-"+currGame.index);
    displayImage.style.backgroundImage = "url('"+currGame.backImgs[currGame.currLevel]+"')";
    let letters = document.querySelectorAll(".letter-"+currGame.index);
    let outOf = "/"+currGame.order.length;
    if(currGame.loop){
        outOf = "";
        let currLetters = [];
        for(let i = 0; i < currGame.size-1; i++){
            let currLett, lettFound = false;
            while(!lettFound){
                currLett = Math.floor(Math.random()*30);
                if(currLett != currGame.order[currGame.currLevel]){
                    let numFound = false;
                    for(let j = 0; j < currLetters.length; j++){
                        if(currLetters[j] === currLett){
                            numFound = true;
                            break;
                        }
                    }
                    if(!numFound){
                        lettFound = true;
                        currLetters.push(currLett);
                    }
                }
            } 
        }
        currLetters.push(currGame.order[currGame.currLevel]);
        //console.log(currLetters)
        for(let i = 0; i < letters.length; i++){
            letters[i].id = currLetters[i];
            letters[i].style.backgroundImage = "url('"+currGame.imgs[currLetters[i]]+"')";
        }
    }
    document.getElementById("level-count-"+currGame.index).innerHTML = "Level "+(currGame.count+1)+outOf;
    let letterHolder = document.getElementById("letter-holder-"+currGame.index);
    for(let i = letterHolder.children.length-1; i >= 0; i--){
        letterHolder.appendChild(letterHolder.children[Math.random() * i | 0]);
    }

    displayImage.style.webkitAnimation = "sizeUp linear 0.1s";
    displayImage.style.mozAnimation = "sizeUp linear 0.1s";
    displayImage.style.animation = "sizeUp linear 0.1s";
    displayImage.onanimationend = ()=>{
        displayImage.style.webkitAnimation = "none";
        displayImage.style.mozAnimation = "none";
        displayImage.style.animation = "none";
        displayImage.onanimationend = null;
        displayImage.style.height = "57vh";
        displayImage.style.width = "40vh";
    }

    for(let i = 0; i < letters.length; i++){
        letters[i].style.webkitAnimation = "sizeUp linear 0.1s";
        letters[i].style.mozAnimation = "sizeUp linear 0.1s";
        letters[i].style.animation = "sizeUp linear 0.1s";
        letters[i].onanimationend = ()=>{
            letters[i].style.webkitAnimation = "none";
            letters[i].style.mozAnimation = "none";
            letters[i].style.animation = "none";
            letters[i].onanimationend = null;

            letters[i].style.width = "calc(min(15vh,15vw) * 1.12)";
            letters[i].style.height = "min(15vh,15vw)";
        }
        letters[i].onclick = ()=>{
            let answer = JSON.parse(letters[i].id);
            if(answer != currGame.order[currGame.currLevel]) guessMade(false);
            else{
                guessMade(true);
                currGame.count++;
                currGame.currLevel++;
                if(currGame.thawab){
                    thawab++;
                    document.querySelector(".thawab-value").innerHTML = thawab;
                    localStorage.setItem("alphabet-game-thawab",JSON.stringify(thawab));
                }
            }
            for(let j = 0; j < letters.length; j++){
                letters[j].style.webkitAnimation = "sizeDown linear 0.1s";
                letters[j].style.mozAnimation = "sizeDown linear 0.1s";
                letters[j].style.animation = "sizeDown linear 0.1s";
                letters[j].onanimationend = ()=>{
                    letters[j].style.height = "0px";
                    letters[j].style.width = "0px";
                }
            }
            displayImage.style.webkitAnimation = "sizeDown linear 0.1s";
            displayImage.style.mozAnimation = "sizeDown linear 0.1s";
            displayImage.style.animation = "sizeDown linear 0.1s";
            displayImage.onanimationend = ()=>{
                displayImage.style.height = "0px";
                displayImage.style.width = "0px";
            }
            if(currGame.currLevel < currGame.order.length) setTimeout(gameLoop,1000);
            else{
                if(!currGame.loop){
                    setTimeout(()=>{
                        openWindow(document.getElementById("congrats-"+currGame.index),null,"flex");
                        openWindow(document.getElementById("again-"+currGame.index),null,"flex");
                        closeWindow(document.getElementById("level-count-"+currGame.index));
                    },1000);
                    return;
                }
                else{
                    currGame.currLevel = 0;
                    setTimeout(gameLoop,1000);
                    return;
                }    
            }
        }
    }
    currGame.audio[currGame.order[currGame.currLevel]].play();
}