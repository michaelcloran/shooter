//to make sure the site is loaded
document.addEventListener("DOMContentLoaded", function(){
  runGame();
});


/**
 * Globals
 */
var myGamePiece;

var enemies = [];
var enemyInitialPositions = [ 50, 150, 250, 350, 450, 550, 650, 750, 850, 950];
var bullets = [];
var enemyBullets = [];
var enemyImages = [[
    "assets/images/corvette/Move_1_1.png",//move
    "assets/images/corvette/Move_1_2.png",
    "assets/images/corvette/Move_1_3.png"],
    [
    "assets/images/corvette/Attack_1_1.png",//shoot
    "assets/images/corvette/Attack_1_2.png",
    "assets/images/corvette/Attack_1_3.png",
    "assets/images/corvette/Attack_1_4.png"]
] ;
var widthOfCanvas = Math.floor(window.innerWidth);//landscape 0.7

let portrait = window.matchMedia("(orientation: portrait)");

portrait.addEventListener("change", function(e) {//digout https://dev.to/smpnjn/how-to-detect-device-orientation-with-javascript-29e5
    if(e.matches) {
        // Portrait mode
        if(window.innerWidth < 1000) widthOfCanvas = Math.floor(window.innerWidth* 0.8);//0.4
        myGamePiece.y = window.innerHeight -30;//55

    } else {
        // Landscape
        if(window.innerWidth < 1000) widthOfCanvas = Math.floor(window.innerWidth* 0.8);//0.7
        myGamePiece.y = window.innerHeight -30;//55
    }
})

/**
 * the main game "loop", called when the script is first loaded
 *
 */
function runGame(){
   
    if(window.innerWidth < 1050 || window.screen.orientation == 90 || window.screen.orientation === -90){
        widthOfCanvas = Math.floor(window.innerWidth* 0.8);
        myGamePiece = new component(104,83,"assets/images/fighter/idle_rotated90cc.png", widthOfCanvas/2,window.innerHeight-100, "image_defender");//-55
    }else{
        widthOfCanvas = Math.floor(window.innerWidth);
        myGamePiece = new component(104,83,"assets/images/fighter/idle_rotated90cc.png", widthOfCanvas/2,window.innerHeight-120, "image_defender");
    }
    enemy1Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[0],0, "image_enemy");
    enemy2Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[1],0, "image_enemy");

    enemy3Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[2],0, "image_enemy");
    enemy4Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[3],0, "image_enemy");

    enemy5Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[4],0, "image_enemy");
    enemy6Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[5],0, "image_enemy");

    enemy7Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[6],0, "image_enemy");
    enemy8Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[7],0, "image_enemy");

    enemy9Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[8],0, "image_enemy");
    enemy10Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[9],0, "image_enemy");

    enemies.push(enemy1Piece);
    enemies.push(enemy2Piece);
    enemies.push(enemy3Piece);
    enemies.push(enemy4Piece);
    enemies.push(enemy5Piece);
    enemies.push(enemy6Piece);
    enemies.push(enemy7Piece);
    enemies.push(enemy8Piece);
    enemies.push(enemy9Piece);
    enemies.push(enemy10Piece);

    //see if need to scale images for mobile or tablet                                      
    if(window.innerWidth < 1050 || window.screen.orientation == 90 || window.screen.orientation === -90){// digout https://stackoverflow.com/questions/19262141/resize-image-with-javascript-canvas-smoothly
        widthOfCanvas = Math.floor(window.innerWidth* 0.8);//portrait on mobile
        document.getElementById("left").style.display= "block";//need left and right buttons for mobiles
        document.getElementById("right").style.display= "block";

       if(window.matchMedia("(orientation: landscape)").matches){//digout: https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad
            document.getElementById("playSoundTrack").style.display = "none";
            document.getElementById("pauseSoundTrack").style.display = "none";
            if(getCookieValue("soundOn")) Audio();
            myGamePiece.y = window.innerHeight-30;//landscape only
        }


        myGamePiece.width = Math.floor(myGamePiece.width * 0.3),
        myGamePiece.height =  Math.floor(myGamePiece.height * 0.3)
        for(let enemy of enemies){
            enemy.width = Math.floor(enemy.width * 0.2),
            enemy.height =  Math.floor(enemy.height * 0.2)
        
        }
    }
    myGameArea.start(); 
}

/**
 * setsup the game area with event listeners for keyup and keydown
 */
var myGameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width =  widthOfCanvas;
        if(window.matchMedia("(orientation: landscape)").matches){
            this.canvas.height =window.innerHeight;// -100;
        }else{
            this.canvas.height =window.innerHeight;// -100;
        }
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
           
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
            
            myGamePiece.speedX = 0;
            myGamePiece.speedY = 0;

            if(e.key == ' ' ) {//spacebar
                let shot = new component(28,28,"assets/images/fighter/shot_weapon1.png", myGamePiece.x-15,myGamePiece.y-myGamePiece.height+30, "image_shot");
                shot.speedY = +10;
                bullets.push(shot);
                if(getCookieValue("soundOn").localeCompare("true")) playLaser();
                
            }
        })
        document.getElementById("left-button").addEventListener("click",function(){
            
            if((myGamePiece.x) > (myGamePiece.width/2 - 5)){
                moveleft();
            }
        });
        document.getElementById("right-button").addEventListener("click",function(){
            
            if((myGamePiece.x + (myGamePiece.width/2)) < (widthOfCanvas - (myGamePiece.width/2) + 5)){
                moveright();
            }
        });
        document.getElementById("right-shoot-button").addEventListener("click",function(){
            let shot = new component(28,28,"assets/images/fighter/shot_weapon1.png", myGamePiece.x-15,myGamePiece.y-myGamePiece.height+30, "image_shot");
            shot.speedY = +10;
            bullets.push(shot);
            if(getCookieValue("soundOn").localeCompare("true")) playLaser();
               
        });
        document.getElementById("left-shoot-button").addEventListener("click",function(){
            let shot = new component(28,28,"assets/images/fighter/shot_weapon1.png", myGamePiece.x-15,myGamePiece.y-myGamePiece.height+30, "image_shot");
            shot.speedY = +10;
            bullets.push(shot);
            if(getCookieValue("soundOn").localeCompare("true")) playLaser();
               
        });


        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        window.location = "end_game_page.html?"+parseInt(document.getElementById('score-value').innerHTML);
    },
    update : function(){//update the frame number which is used for to deter if enemy needs to shoot
        this.frameNo++;
        if(myGameArea.frameNo  % 100 == 0 && numberEnemies > 0){
            let randomEnemy = getRandomEnemy(enemies);
            let shooter = enemies[randomEnemy];
            
            enemyShoots(shooter);
        }

        if(this.frameNo > 1000){
            this.frameNo = 0;
        }
    }
}

/**
 * 
 * component
 * is the main object of the game 
 * used for defender and enemy aswell as shots
 * @param {Width of image} width 
 * @param {Height of image} height 
 * @param {The image url} image_url 
 * @param {the x coordinate of image} x 
 * @param {the y coordinate of image} y 
 * @param {either a defender or enemy} type 
 */

function component(width, height, image_url, x, y, type) {
    this.type = type;
    if (type == "image_defender" || type == "image_enemy" || type == "image_shot") {
        this.image = new Image();
        
        this.image.src = image_url;
    
    }
    this.health = 2;
    this.state = 0;//moving state
    this.maxImageCtr = 0;
    this.imageCtr = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    
    this.update = function() {
        switch(this.state){
            case 0://moving state
                maxImageCtr = 2;
                break;
            case 1://shooting state
                maxImageCtr = 3;
                break;
        }
        
        if(this.imageCtr < maxImageCtr){
            //this.imageCtr++;
            setTimeout(this.imageCtr++,1000);
           }else{
            this.state=0;//back to moving state
            this.imageCtr = 0;
           }
        ctx = myGameArea.context;
        ctx.save();
       
        if (type == "image_defender") {
            ctx.translate(this.x, this.y);
           
            ctx.drawImage(this.image, 
                this.width / -2, 
                this.height / -2,
                this.width, this.height);
            
        } else if(type == "image_enemy"){ 
            this.image.src = enemyImages[this.state][this.imageCtr];

            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);

        }else if(type == 'image_shot'){
            if(this.y > 0){//for shots checks if the y position is off the screen
                ctx.drawImage(this.image, 
                    this.x, 
                    this.y,
                    this.width, this.height);
                }else {//garbage collection removing off screen bullets
                    let index = 0;
                    for(let shot of bullets){
                        if(shot.x === this.x && shot.y == this.y){
                            bullets.splice(index,1);
                        }
                        index++;
                     }    
                }
        }else {
            ctx.fillStyle = blue;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }
    this.newPos = function() {
        
        this.x += this.speedX;
        this.y -= this.speedY; 

        let i = 0;
        for(let item of enemies){
            if(item.y > window.innerHeight){
                item.x =  Math.floor(Math.random() * widthOfCanvas);
                item.y = 0;
                myGameArea.frameNo = 0;
            }
        }
    }
    this.collisionDetection = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) ||(myleft > otherright)) {
          crash = false;
        }
        return crash;
      }
}

function getRandomEnemy(enemies){
    let randomeEnemyIndex = Math.floor(Math.random() * enemies.length);
    if(randomeEnemyIndex < enemies.length){
        return randomeEnemyIndex;    
    }
    return 0;
}
/**
 * updateGameArea
 * 
 * updates the game area
 */
function updateGameArea() {
    if(isPaused == false){

        for(let enemy of enemies){//collision detection with spaceships
            if (myGamePiece.collisionDetection(enemy)) {
                myGameArea.stop();
            } 
        }
        let shot_index = 0;
        for(let shot of bullets){//collision detection with weapons firing from defender
            let index = 0;
            for(let enemy of enemies){
                
                if (enemy.collisionDetection(shot)) {
                    enemy.health--;

                    if(enemy.health == 0){
                        enemies.splice(index, 1);
                        if(getCookieValue("soundOn").localeCompare("true")) playExposion();
                    }

                    bullets.splice(shot_index,1);
                    let currentScore = parseInt(document.getElementById("score-value").innerHTML);
                    currentScore += 100;
                    document.getElementById("score-value").innerHTML = currentScore;
                } 
                index++;
            }
            shot_index++
        }

        let enemy_shot_index = 0;
        for(let eshot of enemyBullets){
            if(myGamePiece.collisionDetection(eshot)){
                enemyBullets.splice(enemy_shot_index,1);
                myGameArea.stop(); 
            }
            enemy_shot_index++;
        }
    
        /* clears the gameArea for a new paint*/
        myGameArea.clear();
        myGamePiece.moveAngle = 0;
        myGamePiece.speed = 0;

        numberEnemies = enemies.length;

        myGameArea.update();//update the frame Number

        // tests for input
        if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -5; }//ArrowLeft
        if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 5; }//ArrowRight
        if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY= 1; }//UpArrow
        if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY= -1; }//ArrowDown
        
        //updates myGamePiece()
        if(myGamePiece.speedX == -5 && (myGamePiece.x) > (myGamePiece.width/2 - 5) ){//left
            myGamePiece.newPos();
        }else if(myGamePiece.speedX == 5 && ((myGamePiece.x + (myGamePiece.width/2)) < (widthOfCanvas - (myGamePiece.width/2) + 5))){//right
            myGamePiece.newPos();
        }
            
        myGamePiece.update();

        //updates every enemy
        for(let item of enemies){
            item.speedY = -1;
            item.newPos();
            item.update();
        }  

        //updates every shot
        for(let shot of bullets){
            shot.newPos();
            shot.update();
        }

        //update enemy bullets/shots
        let sIndex = 0;
        for(let eShot of enemyBullets){      
                
            eShot.newPos();
            eShot.update();
            if(eShot.y >= window.innerHeight){
                enemyBullets.splice(sIndex,1);
            }
            sIndex++;
        } 
        
        if(enemies.length == 0){//Game over you killed all enemies
            myGameArea.stop();
        }
    }
}

function enemyShoots(shooter){
    shooter.state = 1;//shooting
    let eShot = new component(28,28,"assets/images/fighter/shot_weapon1.png", shooter.x+shooter.width/2, shooter.y, "image_shot");
    eShot.speedY = -10;
    enemyBullets.push(eShot);
    if(getCookieValue("soundOn").localeCompare("true")) playEnemyLaser();
    
}

function moveleft() {
    myGamePiece.speedX = -5; 
     //updates myGamePiece
     myGamePiece.newPos();
     myGamePiece.update();
}

function moveright() {
    myGamePiece.speedX = 5; 
    //updates myGamePiece
    myGamePiece.newPos();
    myGamePiece.update();
}

function playLaser() { 
    const audio = new Audio(laserSound);
    audio.play();
} 

function playEnemyLaser() { 
    const audio = new Audio(enemyLaserSound);
    audio.play();
} 

function playExposion() { 
    const audio = new Audio(explosionSound);
    audio.play();
} 

function getCookieValue(cookieName){
    let cookieRawArr = document.cookie.split(";");
    for(let index in cookieRawArr){
        let keyArr = cookieRawArr[index].split("=");
        if(keyArr[0].localeCompare(cookieName)){
            return keyArr[1];
        }
    }
    return false;
}