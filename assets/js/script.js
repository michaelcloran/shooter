//to make sure the site is loaded
document.addEventListener("DOMContentLoaded", function(){
  runGame();
});


/**
 * Globals
 */
var myGamePiece;

var enemies = [];
var bullets = [];
var enemyBullets = [];
var bonusCredits = [];
var enemyImages = [[
    "assets/images/corvette/Move_1_1.png",//move
    "assets/images/corvette/Move_1_2.png",
    "assets/images/corvette/Move_1_3.png"],
    [
    "assets/images/corvette/Attack_1_1.png",//shoot
    "assets/images/corvette/Attack_1_2.png",
    "assets/images/corvette/Attack_1_3.png",
    "assets/images/corvette/Attack_1_4.png"],
    [
    "assets/images/explosion/Circle_explosion1.png",
    "assets/images/explosion/Circle_explosion2.png",
    "assets/images/explosion/Circle_explosion3.png",
    "assets/images/explosion/Circle_explosion4.png",
    "assets/images/explosion/Circle_explosion5.png",
    "assets/images/explosion/Circle_explosion6.png",
    "assets/images/explosion/Circle_explosion7.png",
    "assets/images/explosion/Circle_explosion8.png",
    "assets/images/explosion/Circle_explosion9.png",
    "assets/images/explosion/Circle_explosion10.png"]
] ;

var numberEnemies = 0;
var widthOfCanvas = Math.floor(window.innerWidth);//landscape 0.7

let portrait = window.matchMedia("(orientation: portrait)");

portrait.addEventListener("change", function(e) {//digout https://dev.to/smpnjn/how-to-detect-device-orientation-with-javascript-29e5
    if(e.matches) {
        // Portrait mode
        if(window.innerWidth < 1000) widthOfCanvas = Math.floor(window.innerWidth* 0.8);//0.4
        myGamePiece.y = window.innerHeight -100;//55

    } else {
        // Landscape
        if(window.innerWidth < 1000) widthOfCanvas = Math.floor(window.innerWidth* 0.8);//0.7
        myGamePiece.y = window.innerHeight -110;//55
    }
});

/**
 * the main game "loop", called when the script is first loaded
 *
 */
function runGame(){
   
    if(window.innerWidth < 1050 || window.screen.orientation == 90 || window.screen.orientation === -90){
        widthOfCanvas = Math.floor(window.innerWidth* 0.8);
        myGamePiece = new component(64,93,"assets/images/fighter/idle_rotated90cc.png", widthOfCanvas/2,window.innerHeight-120, "image_defender");//-55
    }else{
        widthOfCanvas = Math.floor(window.innerWidth);
        myGamePiece = new component(64,93,"assets/images/fighter/idle_rotated90cc.png", widthOfCanvas/2,window.innerHeight-160, "image_defender");
    }
   
    let enemy1Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", getRandomPosition(widthOfCanvas-104),0, "image_enemy");
    let enemy2Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", getRandomPosition(widthOfCanvas-104),0, "image_enemy");

    let enemy3Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", getRandomPosition(widthOfCanvas-104),0, "image_enemy");
    let enemy4Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", getRandomPosition(widthOfCanvas-104),0, "image_enemy");

    let enemy5Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", getRandomPosition(widthOfCanvas-104),0, "image_enemy");
    let enemy6Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", getRandomPosition(widthOfCanvas-104),0, "image_enemy");

    enemies.push(enemy1Piece);
    enemies.push(enemy2Piece);
    enemies.push(enemy3Piece);
    enemies.push(enemy4Piece);
    enemies.push(enemy5Piece);
    enemies.push(enemy6Piece);
    
    //see if need to scale images for mobile or tablet                                      
    if(window.innerWidth < 1050 || window.screen.orientation == 90 || window.screen.orientation === -90){// digout https://stackoverflow.com/questions/19262141/resize-image-with-javascript-canvas-smoothly
        widthOfCanvas = Math.floor(window.innerWidth* 0.8);//portrait on mobile
        document.getElementById("left").style.display= "block";//need left and right buttons for mobiles
        document.getElementById("right").style.display= "block";

       if(window.matchMedia("(orientation: landscape)").matches){//digout: https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad
            
            myGamePiece.y = window.innerHeight-110;//landscape only
        }


        myGamePiece.width = Math.floor(myGamePiece.width * 0.3);
        myGamePiece.height =  Math.floor(myGamePiece.height * 0.3);
        for(let enemy of enemies){
            enemy.width = Math.floor(enemy.width * 0.2);
            enemy.height =  Math.floor(enemy.height * 0.2);
        
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
           
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
            
            myGamePiece.speedX = 0;
            myGamePiece.speedY = 0;

            if(e.key == ' ' ) {//spacebar
                let shot = new component(28,28,"assets/images/fighter/shot_weapon1.png", (myGamePiece.x+myGamePiece.width/2)-14, (myGamePiece.y-myGamePiece.height+30), "image_shot");
                shot.speedY = +10;
                bullets.push(shot);
                if(getCookieValue("soundOn").localeCompare("true") == 0) playLaser();
                
            }
        });
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
            let shot = new component(28,28,"assets/images/fighter/shot_weapon1.png", (myGamePiece.x+myGamePiece.width/2)-14, myGamePiece.y-myGamePiece.height+30, "image_shot");
            shot.speedY = +10;
            bullets.push(shot);
            if(getCookieValue("soundOn").localeCompare("true") == 0) playLaser();
               
        });
        document.getElementById("left-shoot-button").addEventListener("click",function(){
            let shot = new component(28,28,"assets/images/fighter/shot_weapon1.png", (myGamePiece.x+myGamePiece.width/2)-14 ,myGamePiece.y-myGamePiece.height+30, "image_shot");
            shot.speedY = +10;
            bullets.push(shot);
            if(getCookieValue("soundOn").localeCompare("true") == 0) playLaser();
               
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
};

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
 * @param {either a defender or enemy or shot} type 
 */

function component(width, height, image_url, x, y, type) {
    this.type = type;
    if (type == "image_defender" || type == "image_enemy" || type == "image_shot" || type == "image_bonus") {
        this.image = new Image();
        
        this.image.src = image_url;
    
    }
    this.health = 2;
    this.state = 0;//moving state
    this.maxImageCtr = 0;
    this.delay = 2;
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
                this.maxImageCtr = 2;
                break;
            case 1://shooting state
                this.maxImageCtr = 3;
                break;
            case 2://explosion state
                this.maxImageCtr = 9;
                break;
        }
        if(this.delay === 2){
            this.delay = 0;
            if(this.imageCtr < this.maxImageCtr){
                this.imageCtr++;
                
            }else{
                this.state=0;//back to moving state
                this.imageCtr = 0;
            }
        }else{
            this.delay++;
        }
        let ctx = myGameArea.context;
        ctx.save();
       
        if (type == "image_defender") {
            ctx.translate(this.x, this.y);
           
            /* left here for debugging bounds
            ctx.fillStyle = "blue";
            ctx.fillRect(0,0, this.width, this.height);
            */
            ctx.drawImage(this.image,
                0,
                0,
                this.width,
                this.height);
  
        } else if(type == "image_enemy"){ 
            this.image.src = enemyImages[this.state][this.imageCtr];

            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);

        }else if(type == 'image_shot' || type == 'image_bonus'){
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
                     index = 0;
                     for(let bonus of bonusCredits){//collecting offscreen bonus
                        if(bonus.x === this.x && bonus.y == this.y){
                            bonusCredits.splice(index,1);
                        }
                        index++;
                     }        
                }
        }else {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    };
    this.newPos = function() {
        
        this.x += this.speedX;
        this.y -= this.speedY; 

        for(let item of enemies){
            if(item.y > window.innerHeight){
                item.x =  Math.floor(Math.random() * widthOfCanvas);
                item.y = 0;
                myGameArea.frameNo = 0;
            }
        }
    };
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
      };
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
            for(let enemy of enemies){//checking for shot hitting enemies
                
                if (enemy.collisionDetection(shot)) {
                    if(enemy.health!=0) enemy.health--;

                    if(enemy.health == 0){
                        //enemies.splice(index, 1);
                        enemyDies(index);
                        if(getCookieValue("soundOn").localeCompare("true") == 0) playExposion();
                        
                    }

                    bullets.splice(shot_index,1);
                    let currentScore = parseInt(document.getElementById("score-value").innerHTML);
                    currentScore += 100;
                    document.getElementById("score-value").innerHTML = currentScore;
                } 
                index++;
            }
            shot_index++;
        }

        shot_index = 0;
        for(let shot of bullets){//collision detection with weapons firing from defender
            let index = 0;
            for(let bonus of bonusCredits){//checking for shot hitting bonus
                
                if (bonus.collisionDetection(shot)) {
                    bonusCredits.splice(index, 1);
                    
                    if(getCookieValue("soundOn").localeCompare("true") == 0) playBonusPickup();
                    
                    bullets.splice(shot_index,1);
                    let currentScore = parseInt(document.getElementById("score-value").innerHTML);
                    currentScore += 500;
                    document.getElementById("score-value").innerHTML = currentScore;
                } 
                index++;
            }
            shot_index++;
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
        let index = 0;
        for(let item of enemies){
            if(item.health == 0 && item.state == 2){//dieing
                if(item.imageCtr == 8){
                    enemies[index].imageCtr = 0;
                    enemies.splice(index, 1);//dead
                }
                item.update();
            }else{
                item.speedY = -1;
                item.newPos();
                item.update();
            }
            index++;
        }  

        //updates every shot
        for(let shot of bullets){
            shot.newPos();
            shot.update();
        }

        //updates every bonus
        let bonusIndex = 0;
        for(let bonus of bonusCredits){
            bonus.speedY = -2;
            bonus.newPos();
            bonus.update();
            if(bonus.y >= window.innerHeight-32){
                bonusCredits.splice(bonusIndex,1);
            }
            bonusIndex++;
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
        
        if(enemies.length < 5){
            respawn();
        }

        if(bonusCredits.length == 0){
            let bonusPiece = new component(32,32,"assets/images/points-32x32.png", getRandomPosition(widthOfCanvas-104),Math.floor(Math.random() *window.innerHeight-32), "image_bonus");
            bonusCredits.push(bonusPiece);
        }

        if(enemies.length == 0){//Game over you killed all enemies
            myGameArea.stop();
        }
    }
}

function respawn(){
    let currentEnemiesCount = enemies.length;
    let enemiesToAdd = 5 - currentEnemiesCount;//keeps a nice set of enemies on screen
    for(let i=0; i<enemiesToAdd; i++){
        let enemyPiece = new component(104,179,"assets/images/corvette/idle_rotated90.png", getRandomPosition(widthOfCanvas-104),0, "image_enemy");

        if(window.innerWidth < 1050){
            enemyPiece.width = Math.floor(enemyPiece.width * 0.2);
            enemyPiece.height =  Math.floor(enemyPiece.height * 0.2);
        }

        enemies.push(enemyPiece);
    } 
}

function enemyDies(index){
    enemies[index].state = 2;
}

function enemyShoots(shooter){
    shooter.state = 1;//shooting
    let eShot = new component(28,28,"assets/images/fighter/shot_weapon1.png", shooter.x+shooter.width/2, shooter.y, "image_shot");
    eShot.speedY = -10;
    enemyBullets.push(eShot);
    if(getCookieValue("soundOn").localeCompare("true") == 0) playEnemyLaser();
    
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

function playBonusPickup(){
    const audio = new Audio(bonusPickupSound);
    audio.play();
}

function getCookieValue(cookieName){
    let cookieRawArr = document.cookie.split(";");
    for(let index in cookieRawArr){
        let keyArr = cookieRawArr[index].split("=");
        if(cookieName.localeCompare(keyArr[0].trim()) == 0){
            return keyArr[1];
        }
    }
    return false;
}

function getRandomPosition(canvasWidth){
    return Math.floor(Math.random() * canvasWidth);
}