var dog;
var database, food, foodStock, lastFed, backgroundImg, gamestate = "hungry";

function preload() {
    backgroundImg = loadImage("normal.png")
    dogIMG = loadImage("dog.png");
    dogIMG2 = loadImage("dog2.png");
    bedroom = loadImage("bedroom.png");
    washroom = loadImage("bathroom.png");
    garden = loadImage("garden.png");
}

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    readState = database.ref('gamestate');
    readState.on("value", function(data){
        gamestate = data.val();
    });

    foodObj = new Food();

    foodStock = database.ref('Food');
    foodStock.on("value",readStock);

    dog = createSprite(250,250,10,10);
    dog.addImage(dogIMG);

    feed = createButton("feed the dog");
    feed.position(300, 95);
    feed.mousePressed(feedDog)

    addfood = createButton("add Food");
    addfood.position(400, 95);
    addfood.mousePressed(addFoods);

}

function draw(){
    background(backgroundImg);
    fill("red");

    fedTime = database.ref('FeedTime')
    fedTime.on("value", function(data){
        lastFed = data.val();
    })

    foodObj.display();

    if(gamestate !== "hungry") {
        feed.hide();
        addfood.hide();
        dog.remove();
    }
    else {
        feed.show();
        addfood.show();
        dog.addImage(dogIMG);
    }

    drawSprites();

    textSize(15);


    currentTime = hour();

    if(currentTime==(lastFed + 1)) {
      update("playing");
      foodObj.garden();
    }
    else if(currentTime==(lastFed + 1)) {
      update("sleeping");
      foodObj.bedroom();
    }
    else if(currentTime==(lastFed + 1)) {
        update("bathing");
        foodObj.washroom();
    }
    else {
        update("hungry")
    }

    if(lastFed >= 12) {
      text("last Fed = " + lastFed % 12 + "PM", 350, 30);
    }
    else if(lastFed === 0) {
      text("last Fed = 12 AM", 350, 30);
    }
    else {
      text("last Fed = " + lastFed + "AM", 350, 30);
    }

    text(foodStock, 250, 450);
}

function readStock(data) {
    foodStock = data.val();
    foodObj.updateFoodStock(foodStock);
}

function writeStock(x) {

    if(x <= 0) {
      x = 0;
    }
    else {
        x = x - 1
    }

    database.ref('/').update({
        foodStock:x,
    })
}

function feedDog() {
    dog.addImage(dogIMG2);

    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    database.ref('/').update({
        Food:foodObj.getFoodStock(),
        FeedTime:hour()
    });
}

function addFoods() {
    foodStock++;
    database.ref('/').update({
        Food:foodStock
    });
}

function update() {
    database.ref('/').update({
        gamestate:gamestate
    })
}