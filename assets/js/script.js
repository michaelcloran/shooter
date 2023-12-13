//to make sure the site is loaded
document.addEventListener("DOMContentLoaded", function(){

    runGame();

})
/**
 * Globals
 */
var myGamePiece;


/**
 * the main game "loop", called when the script is first loaded
 *
 */
function runGame(){
    myGamePiece = new component(104,83,"assets/images/fighter/idle_rotated90cc.png", window.innerWidth/2,window.innerHeight-100, "image");
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
    if (type == "image") {
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
       
        
        if (type == "image") {
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, 
                this.width / -2, 
                this.height / -2,
                this.width, this.height);
            
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }
    this.newPos = function() {
        /*this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);   */
        this.x += this.speedX;
        this.y -= this.speedY; 
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
   /*
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.moveAngle = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.moveAngle = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speed= 1; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speed= -1; }
*/
if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -5; }
if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 5; }
if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY= 1; }
if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY= -1; }


    myGamePiece.newPos();
    myGamePiece.update();
}
