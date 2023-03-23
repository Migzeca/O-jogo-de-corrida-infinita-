var mario,marioImg,mario_correndo,solo,soloImg,reiniciarImg,reiniciar;
var JOGAR = 1;
var FIM = 0;
var estadoJogo = JOGAR;
var gameOver;
var somMorte, somPontos, somSalto;
var obstaculo1, obstaculo2, obstaculo3;
var grupoObstaculos;

function preload(){
    mario_correndo = loadAnimation("trex mario 1.png", "trex mario 2.png", "trex mario 3.png");
    
    soloImg = loadImage("ground2.png");
    
    reiniciarImg = loadImage("restart.png");

    somMorte = loadSound("die.mp3");
    
    somSalto = loadSound("jump.mp3");

    obstaculo1 = loadImage("obstacle1-1.png");

    obstaculo2 = loadImage("obstacle2-1.png");

    obstaculo3 = loadImage("obstacle3-1.png");
}

function setup() {
   createCanvas(600,200);
    
    mario = createSprite(50,160, 20,50);
    mario.addAnimation("correndo",mario_correndo);
    mario.scale = 0.5;
    //mario.debug = true;
     mario.setCollider("circle", 0,0,40);


    solo = createSprite(300,180,600,20);
    solo.addImage(soloImg);
    solo.velocityX = -3;

    soloInvisivel = createSprite(200,190,400,10);
    soloInvisivel.visible = false;

    reiniciar = createSprite(300, 100);
    reiniciar.addImage(reiniciarImg);
    reiniciar.scale = 0.5;
    reiniciar.visible = false;



    pontos = 0;

    grupoObstaculos = new Group();
}

function draw() {
    background("white");
   text("Pontuação: "+pontos, 500, 50);

   if (estadoJogo == JOGAR){

    pontos = pontos + Math.round((frameRate()/60));

    if(keyDown("space") && mario.y >= 150){
      mario.velocityY = -10;
       somSalto.play();
    }
   
    mario.velocityY += 0.5;
   

   if(solo.x <0){
      solo.x = width/2;
    }

   gerarObstaculos();

   if(grupoObstaculos.isTouching(mario)){
      estadoJogo = FIM;
      somMorte.play();
      
    }
    }else if(estadoJogo == FIM){
    solo.velocityX = 0;

    grupoObstaculos.setVelocityXEach(0);
    grupoNuvens.setVelocityXEach(0);



    gameOver.visible = true;
    //reiniciar.visible = true;
  }
   
   
  mario.collide(soloInvisivel);
   
   
   drawSprites();
  }
  
  function gerarObstaculos(){
  if(frameCount % 60 == 0){
    var obstaculo = createSprite(600, 165, 10, 40);
    obstaculo.velocityX = -3;

    var aleatoria = Math.round(random(1,2));
    switch (aleatoria) {
      case 1: obstaculo.addImage(obstaculo1);
        break;

      case 2: obstaculo.addImage(obstaculo2);
      break;

      case 3: obstaculo.addImage(obstaculo3);
      break;

     }
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 250;
    grupoObstaculos.add(obstaculo);
  }
}