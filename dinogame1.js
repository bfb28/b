var PLAY = 1;
var END = 0;
var gameState = PLAY;


var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;


var cloud, cloudsGroup, cloudImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;


var score;


//variable gameover y restart
var gameOverImg, restartImg;


//Variables de sonidos
var jumpSound, checkPointSound, dieSound;




var newImage;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trex_collided= loadAnimation("trex_collided.png");


  groundImage = loadImage("ground2.png");


  cloudImage = loadImage("cloud.png");


  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");




  //imagenes gameover y restart
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");


  //sonidos salto, muerte, checkpoint*
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkpoint.mp3");
}


function setup() {
  createCanvas(600, 200);






  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;


  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;


  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
 


  restart = createSprite(300, 140);
  restart.addImage(restartImg);
  restart.scale = 0.5;


  //sprite piso invisible
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;


  //crear grupos de obstáculos y nubes
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();


  // colisionador del trex
trex.setCollider("circle",0,0,40);
trex.debug=true;


  //score
  score = 0;
}


function draw() {
  background(180);


  //mostrar puntuación


  score = score + Math.round(frameCount / 60);
  if (gameState === PLAY) {
    //game over visible
    gameOver.visible = false;
    restart.visible = false;

socre = score + Math.round(getFrameRate()/60);
ground.velocityX = -(6+3*score/100);

    //mover el suelo y aumentar su velocidad cada 100 puntos*
    ground.velocityX = -4;


    //puntuación
    text("Puntuación: " + score, 500, 50);
    //checkpoint*


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }


    //hacer que el trex salte al presionar la barra espaciadora
    if (keyDown("space") && trex.y >= 100 && trex.collide(invisibleGround)) {
      trex.velocityY = -12;
      //agregar sonido salto*


    }


    //agregar gravedad
    trex.velocityY = trex.velocityY + 0.8;


    //aparecer nubes
    spawnClouds();


    //aparecer los obstaculos en el suelo
    spawnObstacles();


    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
      //agregar sonido de muerte*


    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;


    ground.velocityX = 0;
trex.velocityY=0



    //cambiar la animación del trex
trex.changeAnimation("collided", trex_collided);




    //establecer lifetime de los objetos del juego para que no sean destruidos nunca
obstaclesGroup.setLifetimeEachs(-1);
cloudsGroup.setLifetimeEachs(-1);



    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }


  //evitar que el trex caiga
  trex.collide(invisibleGround);


   if(mousePressedOver(restart)){
      reset();
    }




  drawSprites();


}


function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400, 165, 10, 40);
    //aumentar velocidad de los obstaculos
    obstacle.velocityX = -6;




    //generar obstáculos al azar
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }


    //asignar escala y lifetime al obstáculo          
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;




    //agregar cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
  }
}




function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.y = Math.round(random(10, 60))
    cloud.addImage(cloudImage)
    cloud.scale = 0.4;
    cloud.velocityX = -3;


    //asignar lifetime a la variable
    cloud.lifetime = 210;


    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;


    //agregar cada nube al grupo
    cloudsGroup.add(cloud);


  }
}


function reset() {
 gameState = PLAY;
gameOver.visible = false;
restart.visible = false;

obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
score = 0;

trex.changeAnimation("runing", trex_running);

}

