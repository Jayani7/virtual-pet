var dog,sadDog,happyDog;
var foodObj;
var foodS,foodStock;
var fedTime,lastFed,feed,addFood;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedog);

  addFeed = createButton("Add Food");
  addFeed.position(800,95);
  addFeed.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("last feed: " + lastFed%20 + "PM",350,30);
  }else if(lastFed == 0){
           text("Last feed: 12AM",350,30);
  }
  else{
    text("Last feed: ", + lastFed + "AM" ,350,30);
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food : foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}
