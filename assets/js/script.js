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

/**
 * the main game "loop", called when the script is first loaded
 *
 */
function runGame(){
    myGamePiece = new component(104,83,"assets/images/fighter/idle_rotated90cc.png", window.innerWidth/2,window.innerHeight-100, "image_defender");

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



    myGameArea.start();
    
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image_defender" || type == "image_enemy") {
        this.image = new Image();
        
        this.image.src = color;
    
    }
    
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
       
        
        if (type == "image_defender") {
            ctx.translate(this.x, this.y);
           // ctx.rotate(this.angle);
            ctx.drawImage(this.image, 
                this.width / -2, 
                this.height / -2,
                this.width, this.height);
            
        } else if(type == "image_enemy"){
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }else {
            ctx.fillStyle = color;
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

function updateGameArea() {

    for(let enemy of enemies){
        if (myGamePiece.collisionDetection(enemy)) {
            myGameArea.stop();
        } else {

            myGameArea.clear();
            myGamePiece.moveAngle = 0;
            myGamePiece.speed = 0;
         }
    }
    
  
        if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -5; }
        if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 5; }
        if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY= 1; }
        if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY= -1; }


        myGamePiece.newPos();
        myGamePiece.update();

        for(let item of enemies){
            console.log("tp1:"+item);
            item.speedY = -1;
            item.newPos();
            item.update();
        }
   
}
