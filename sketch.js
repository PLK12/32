const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var myEngine;
var myWorld;

var ground;
var rope;

var fruit;

var fruit_cons;

var bunny;

var backgroundImg, fruitImg, bunnyImg;

var button;

var blinkingImg, eatingImg, cryingImg;

var backgroundSound, sadSound, eatingSound, airSound, cutSound, cutSound2;

var balloon, muteButton



function preload()
{
  backgroundImg = loadImage("background.png");
  fruitImg = loadImage("melon.png");
  bunnyImg = loadImage("Rabbit-01.png");

  blinkingImg = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  cryingImg = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  eatingImg = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");

  blinkingImg.playing = true;
  eatingImg.playing = true;
  cryingImg.playing = true;

  eatingImg.looping = false;
  cryingImg.looping = false;

  backgroundSound = loadSound('sound1.mp3');
  airSound = loadSound('air.wav');
  sadSound = loadSound('sad.wav');
  eatingSound = loadSound('eating_sound.mp3');
  cutSound = loadSound('Cutting Through Foliage.mp3')
  cutSound2 = loadSound('rope_cut.mp3');


  
}

function setup() 
{
  createCanvas(500,700);
  myEngine = Engine.create();
  myWorld = myEngine.world;
  //backgroundSound.play();
  backgroundSound.setVolume(0.1)

  blinkingImg.frameDelay = 7;
  eatingImg.frameDelay = 5;
  cryingImg.frameDelay = 10;
 
  button  = createImg('cut_btn.png');
  button.position(240, 40)
  button.size(50, 50);
  button.mouseClicked(drop)

  balloon = createImg('balloon.png');
  balloon.position(350,200);
  balloon.size(100,100);
  balloon.mouseClicked(appliedForce);

  muteButton = createImg('mute.png');
  muteButton.position(10,10);
  muteButton.size(50,50);
  muteButton.mouseClicked(muteSound);

  bunny = createSprite(600,610,50,50);
  //bunny.addImage(bunnyImg);
  //for adding animation have to have identifier;
  bunny.addAnimation("blink", blinkingImg);
  bunny.addAnimation("cry", cryingImg);
  bunny.addAnimation("eat",eatingImg);
  

  bunny.scale = 0.2;
  
  
  ground = new Ground(250,690,500,10);

  rope = new Rope(6,{x: 250, y:40});
  
  var fruitoptions =
  {
    density:0.001,
  };
  fruit = Matter.Bodies.circle(250,300,15,fruitoptions);

  
  Matter.Composite.add(rope.body, fruit);

  fruit_cons = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  imageMode(CENTER);


}

function draw() 
{
  background(51);

 image(backgroundImg, width/2, height/2 ,500, 700)

  Engine.update(myEngine);
  
  
  ground.display();
  rope.show();

 // ellipse(fruit.position.x,fruit.position.y,15, 15);
 //image(fruitImg,fruit.position.x-30,fruit.position.y-30,60, 60);
  
  //edges cases 
  if(fruit!= null)
  {
    image(fruitImg,fruit.position.x,fruit.position.y,60, 60);
  }
  
   if(collide(fruit, bunny)===true)
   {
       bunny.changeAnimation("eat");
       eatingSound.play();
   }

   /*else if(collide(fruit, ground.body) ===true)
   {
      bunny.changeAnimation("cry");
      sadSound.play();
      backgroundSound.stop();
   }
*/
   //2nd way writing code
  if(fruit!=null && fruit.position.y >600)
  {
    bunny.changeAnimation("cry");
    sadSound.play();
    fruit = null;
  }
 drawSprites();
}


function drop()
{
    //1. detach the fruit, 2. break the rope. 3. fruit gets removed from the rope 
  
  cutSound2.play();
  rope.break();
  fruit_cons.detach();
  fruit_cons = null; 

}
/*
2steps (self defined function)
1)  define the function
2) call the function

*/




//bodyA : fruit
//bodyB: bunny
function collide(bodyA, bodyB)
{
  console.log('collided')

    if(bodyA!= null)
    {
        var dis = dist(bodyA.position.x,bodyA.position.y, bodyB.position.x, bodyB.position.y );

       
         if(dis <=80)
         {
             World.remove(myWorld, fruit);
             fruit = null;
             return true;
         }

        else
        {
            return false;
        }
    }

}

function appliedForce()
{
  //whom apply force, then x and y force
  console.log(fruit);
    Matter.Body.applyForce(fruit,{x:0, y:0}, {x:-0.02,y:0});

    airSound.play();
    airSound.setVolume(0.2);
}

function muteSound()
{
    if(backgroundSound.isPlaying())
      {
        backgroundSound.stop();

      }

      else
      {
          backgroundSound.play();
      }
  
}