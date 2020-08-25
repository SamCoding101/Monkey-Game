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
  
  monkey = createSprite(width - 850,height - 435, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(width - 580,height - 400, 1800, 10);
  ground.velocityX = -3;
  ground.x = ground.width / 2;

  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  console.log(windowWidth);
  console.log(windowHeight);
}

function draw() {
  background(255);


  if (game_state == "play") {
    foodSpawner();
    obstacleSpawner();
    survivalTime();
  }

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  monkey.collide(ground);

  if (keyDown("space") && monkey.y > 308) {
    monkey.velocityY = -14;

  }
  monkey.velocityY = monkey.velocityY + gravity;

  drawSprites();

}

function foodSpawner() {
  if (frameCount % 300 == 0) {
    food = createSprite(width - 575, Math.round(random(height - 820,height - 830)), 20, 20);
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -4;
    food.lifetime = (width - 575)/4;
    foodGroup.add(food);
  }
}

function obstacleSpawner() {
  if (frameCount % 300 == 0) {
    obstacle = createSprite(width - 575,height - 430,20, 20);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.14;
     obstacle.velocityX = -4;
    obstacle.lifetime =(width - 575)/4;
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
