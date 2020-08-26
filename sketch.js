var monkey, monkey_running;
var banana, bananaImage;
var food, foodImage, foodGroup;
var score;
var ground;
var obstacle, obstacleImage, obstacleGroup;
var gravity = 0.9;
var game_state = "play";
var survival=0;


function preload() {
  
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
createCanvas(windowWidth,windowHeight);
  console.log(windowWidth);
  console.log(windowHeight);
  monkey = createSprite(width - 1400,height - 435, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(width - 1580,height - 400, 2500, 10);
  ground.velocityX = -3;
  ground.x = ground.width - 2300;

  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
}

function draw() {
  background(255);

  if (game_state == "play") {
    foodSpawner();
    obstacleSpawner();
    survivalTime();
  }

  if (ground.x < 4000) {
    ground.x = ground.width - 2000;
  }

  monkey.collide(ground);

  if ((keyDown("space") || touches.length>0)&& monkey.y > 308) {
    monkey.velocityY = -14;
    touches = [];
  }
  monkey.velocityY = monkey.velocityY + gravity;

  drawSprites();

}

function foodSpawner() {
  if (frameCount % 200 == 0) {
    food = createSprite();
    food.y = Math.round(random(height + 530,height - 450)) 
    food.x = width - 36;
    food.width = 20;
    food.height = 20;
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -4;
    food.lifetime = (width - 36)/4;
    foodGroup.add(food);
  }
}

function obstacleSpawner() {
  if (frameCount % 200 == 0) {
    obstacle = createSprite(width - 36,height - 430,20, 20);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.14;
     obstacle.velocityX = -4;
    obstacle.lifetime =(width - 36)/4;
     obstacleGroup.add(obstacle);
  }
}

function survivalTime(){
 stroke("black");
  textSize(20);
  fill("black");
  survival = survival + Math.round(getFrameRate()/60);
  text("Survival Time:"+survival,width - 880,height - 700);
}
