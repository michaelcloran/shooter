//to make sure the site is loaded
document.addEventListener("DOMContentLoaded", function(){
  
    runGame();

})
/**
 * Globals
 */
var myGamePiece;

var enemies = [];
var enemyInitialPositions = [ 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
var bullets = [];

/**
 * the main game "loop", called when the script is first loaded
 *
 */
function runGame(){
    myGamePiece = new component(104,83,"assets/images/fighter/idle_rotated90cc.png", window.innerWidth/2,window.innerHeight-250, "image_defender");

    enemy1Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[0],100, "image_enemy");
    enemy2Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[1],100, "image_enemy");

    enemy3Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[2],100, "image_enemy");
    enemy4Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[3],100, "image_enemy");

    enemy5Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[4],100, "image_enemy");
    enemy6Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[5],100, "image_enemy");

    enemy7Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[6],100, "image_enemy");
    enemy8Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[7],100, "image_enemy");

    enemy9Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[8],100, "image_enemy");
    enemy10Piece = new component(104,179,"assets/images/corvette/idle_rotated90.png", enemyInitialPositions[9],100, "image_enemy");


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
    if(window.innerWidth < 1000){// digout https://stackoverflow.com/questions/19262141/resize-image-with-javascript-canvas-smoothly
        myGamePiece.width = Math.floor(myGamePiece.width * 0.5),
        myGamePiece.height =  Math.floor(myGamePiece.height * 0.5)
        for(let enemy of enemies){
            enemy.width = Math.floor(enemy.width * 0.5),
            enemy.height =  Math.floor(enemy.height * 0.5)
        
        }
    }



    myGameArea.start();
    
}

/**
 * setsup the game area with event listeners for keyup and keydown
 */
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight-200;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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

            if(e.keyCode == 32) {//spacebar
                let shot = new component(28,28,"assets/images/fighter/shot_weapon1.png", myGamePiece.x-15,myGamePiece.y-myGamePiece.height+30, "image_enemy");
                shot.speedY = +10;
                bullets.push(shot);
                
            }
        })
        document.getElementById("left-button").addEventListener("click",function(){
            if(myGamePiece.x > 104 ){
                moveleft();
            }  
        });
        document.getElementById("right-button").addEventListener("click",function(){
            if(( myGamePiece.x+myGamePiece.width) < (window.innerWidth-104)){
                moveright();
            }
        });
        document.getElementById("button-shoot-right").addEventListener("click",function(){
            let shot = new component(28,28,"assets/images/fighter/shot_weapon1.png", myGamePiece.x-15,myGamePiece.y-myGamePiece.height+30, "image_enemy");
            shot.speedY = +10;
            bullets.push(shot);
        });
        document.getElementById("button-shoot-left").addEventListener("click",function(){
            let shot = new component(28,28,"assets/images/fighter/shot_weapon1.png", myGamePiece.x-15,myGamePiece.y-myGamePiece.height+30, "image_enemy");
            shot.speedY = +10;
            bullets.push(shot);
        });


        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
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
    if (type == "image_defender" || type == "image_enemy") {
        this.image = new Image();
        
        this.image.src = image_url;
    
    }
    
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
       
        
        if (type == "image_defender") {
            ctx.translate(this.x, this.y);
           
            ctx.drawImage(this.image, 
                this.width / -2, 
                this.height / -2,
                this.width, this.height);
            
        } else if(type == "image_enemy"){
            if(this.y > 0){//for shots checks if the y position is off the screen
                ctx.drawImage(this.image, 
                    this.x, 
                    this.y,
                    this.width, this.height);
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
                item.x =  Math.floor(Math.random() * window.innerWidth);
                item.y = 100;
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

/**
 * updateGameArea
 * 
 * updates the game area
 */
function updateGameArea() {

    for(let enemy of enemies){//collision detection with spaceships
        if (myGamePiece.collisionDetection(enemy)) {
            myGameArea.stop();
        } 
    }
    let shot_index = 0;
    for(let shot of bullets){//collision detection with weapons firing
        let index = 0;
        for(let enemy of enemies){
            
            if (enemy.collisionDetection(shot)) {
                enemies.splice(index, 1);
                bullets.splice(shot_index,1);
                console.log("shot_index"+shot_index);
            } 
            index++;
        }
        shot_index++
    }
  
    /* clears the gameArea for a new paint*/
    myGameArea.clear();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;

    // tests for input
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -5; }//ArrowLeft
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 5; }//ArrowRight
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY= 1; }//UpArrow
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY= -1; }//ArrowDown
    
    //updates myGamePiece
    if(myGamePiece.speedX == -5 && (myGamePiece.x) > 104){//left
        myGamePiece.newPos();
    }else if(myGamePiece.speedX == 5 && (myGamePiece.x+myGamePiece.width) < (window.innerWidth-104)){//right
        myGamePiece.newPos();
    }
        
    myGamePiece.update();

    //updates every shot
    for(let shot of bullets){
        shot.newPos();
        shot.update();
    }

    //updates every enemy
    for(let item of enemies){
        item.speedY = -1;
        item.newPos();
        item.update();
    }
   
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
