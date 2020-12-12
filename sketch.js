var dog,happyDog;
var database;
var foodS,foodStock;
var dogImage;
var happyDogImage;

function preload()
{
dogImage=loadImage("images/dogImg1.png");
happyDogImage=loadImage("images/dogImg.png");
}

function setup() {
  database=firebase.database();

  createCanvas(500, 500);
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46.139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);

  }

  drawSprites();
 
  fill(255,255,254);
  stroke("black");
  textSize(20);
  text("Food remaining : " + foodS, 170, 200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 130, 10, 300, 20);
}

function readStock (data){
foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else {
    x = x-1;
  }
  database.ref('/').update({
      Food: x


    })


}