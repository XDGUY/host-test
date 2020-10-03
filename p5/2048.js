let brd=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
let save=0;
let savearr= [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
const direction = {
    right_left: 0,
    down: 1,
    left_right: 2,
    up: 3
};

function pushbrd(n,x,y){  //cor
    brd[x][y]=n;
}

function checkbrd(x, y){  //cor
    return brd[x][y]===0;
}

function ifNear(first, next){
    if(first==next && first!==0){
        return 1;
    }
    else{
        return 0;
    }
}

function getRandomInt(max){  //cor
    return Math.floor(Math.random()*Math.floor(max));
}

function initializeSavearr(){
    savearr = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
}

function setup(){  //cor
    createCanvas(400, 400);
    brd = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    console.table(brd);
    randomPush();
    console.table(brd);
    keyPressed();
}

function randomPush(times){  //cor
    let n, x, y;
    var count=0;
    while (count<times) {
        x=getRandomInt(4);
        y=getRandomInt(4);
        n=random(1);
        if(checkbrd(x,y)){
            n<0.5 ? pushbrd(2, x, y) : pushbrd(4, x, y);
            count++;
        }
    }
    
}

function mvRl(){
    var save=0
    for(let i=0;i<=3;i++){
        for(let j=0;j<=3;j++){
            if(checkbrd(j, i)){
                savearr[save][i]=brd[j][i];
                save++;
            }
        }
        save=0;
    }

    for(i=0;i<=3;i++){
        for(j=0;j<=3;j++){
            brd[j][i]=savearr[j][i];
        }
    }

    initializeSavearr();

}

function combineRl(){
    for(let i=0;i<=3;i++){
        for(let j=0;j<3;j++){  
            if(ifNear(brd[j][i], brd[j+1][i])==1){
                brd[j][i]=brd[j+1][i]+brd[j][i];
                brd[j+1][i]=0;
            }
        }
    }
}

function rotateClockwise(n){
    save=0;
    for(let k=0;k<n;k++){
        for(let i=0;i<=3;i++){
            for(let j=3;j>=0;j--){
                savearr[save][i]=brd[i][j];
                save++;
            }
            save=0;
        }
    
        for(i=0;i<=3;i++){
            for(j=0;j<=3;j++){
                brd[j][i]=savearr[j][i];
            }
        }
        initializeSavearr();
    }
}

/*function mvCombineRl(){
    mvRl();
    combineRl();
    mvRl();
}*/

function slide(dir){
    rotateClockwise(dir);
    mvCombineRl();
    dir%2===1 ? rotateClockwise(dir+2) : rotateClockwise(dir+4);
}

function keyPressed(){
    if(key == 'a'){
        pushbrd(2, 3, 0);
        pushbrd(4, 2, 0);
        slide(0);
        console.log(brd);
    }
}

function drawBrd(){  //cor
    let w=100;
    for(let i=0;i<=3;i++){
        for(let j=0;j<=3;j++){
            noFill();
            strokeWeight(2);
            stroke("#34be5b");
            rect(j*w, i*w, w, w);
            let val = brd[j][i];
            if(!checkbrd(j,i)){
                textAlign(CENTER, CENTER);
                textSize(64);
                fill(0);
                noStroke();
                text(i + ',' + j, j*w+w/2, i*w+w/2);
            }
        }
    }
}

function draw(){  //cor
    background(255);
    drawBrd();
}