class Food {

    constructor() {
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("food.png");
    }

    updateFoodStock(foodStock){ 
    this.foodStock=foodStock;
    } 

    getFedTime(lastFed){ 
      this.lastFed=lastFed;
    }
    
    deductFood(){
     if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
    } 
    }

    getFoodStock(){
     return this.foodStock;
    }

    display() {
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image, 300, 220, 20, 20);

        if(this.foodStock !== 0) {
          for(var i = 0; i < this.foodStock; i++) {
             if(i % 12 === 0) {
               x = 80;
               y = y + 50
             }
             
          image(this.image, x, y, 50, 50);
          x = x + 30;
        }
      }
    }

    bedroom() {
      backgroundImg = addImage(bedroom);
    }

    garden() {
      backgroundImg = addImage(washroom);
    }

    washroom() {
      backgroundImg = addImage(garden);
    }
}