var space_sprite, rocket_sprite;
var spaceImg, rocketImg;

var invisibleWall1, invisibleWall2, invisibleWall3, invisibleWall4;

var coinAnimation, coinSprite;

var coinsGroup;

var asteroidSprite, asteroidAnimation;

var coins = 0;
var bulletSprite, bulletGroup;
var gameState = "play";
var reloadButton;
var restartButton;

function preload(){
  spaceImg = loadImage("SPACE.jpg")
  rocketImg = loadImage("rocket_ship.png")
  coinAnimation = loadAnimation("CoinAnimation/coin1.png", "CoinAnimation/coin2.png", "CoinAnimation/coin3.png", "CoinAnimation/coin4.png", "CoinAnimation/coin5.png", "CoinAnimation/coin6.png", "CoinAnimation/coin7.png")
asteroidAnimation = loadAnimation("a1.png", "a2.png","a3.png","a4.png","a5.png","a6.png","a7.png","a8.png","a9.png","a10.png","a11.png","a12.png","a13.png","a14.png","a15.png","a16.png");
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight)
  space_sprite = createSprite(width / 2, height / 2, 10, 10)
  space_sprite.addImage(spaceImg)
  space_sprite.scale = 3.7
  rocket_sprite = createSprite(width / 2, height/ 1.3, 10, 10)
  rocket_sprite.addImage(rocketImg)
  rocket_sprite.scale = 0.5
  coinsGroup = new Group();
  asteroidG = new Group();
  bulletGroup = new Group();
}

function draw() {
  background(spaceImg)
  drawSprites()
  if (asteroidG.isTouching(rocket_sprite)) {
    gameState = "end"
  }
  if (gameState === "end") {
    coinsGroup.destroyEach()
    asteroidG.destroyEach()
    rocket_sprite.destroy()
    bulletGroup.destroyEach()
    frameCount = 3
  }
  if (frameCount % 100 === 0) {
    spawnAsteroids()
  }
  if (frameCount % 60 === 0) {
    spawnCoins()
  }
  if (keyDown("right")) {
    rocket_sprite.x += 7
  }
  if (keyDown("left")) {
    rocket_sprite.x -=7
  }
  if (keyDown("up")) {
    rocket_sprite.y -=7
  }
  if (keyDown("down")) {
    rocket_sprite.y += 7
  }
  //createEdgeSprites error so im making invisible walls
  invisibleWall1 = createSprite(1, height / 2, 1, height)
  rocket_sprite.collide(invisibleWall1)
  rocket_sprite.setCollider("rectangle", 0, 0, 120, 200)
  invisibleWall1.visible = false
  
  
  invisibleWall2 = createSprite(width / 2, 1, width, 1)
  rocket_sprite.collide(invisibleWall2)
  invisibleWall2.visible = false
  
  invisibleWall3 = createSprite(width, height / 2, 1, height)
  rocket_sprite.collide(invisibleWall3)
  invisibleWall3.visible = false
  
  invisibleWall4 = createSprite(width / 2, height, width, 1)
  rocket_sprite.collide(invisibleWall4)
  fill(255)
  textSize(20)
  text('Coins: ' + coins, width / 2.5, height - height + 50)
  text("Press space to shoot!", width/2, 50)
  if (rocket_sprite.isTouching(coinsGroup)) {
    coinsGroup.destroyEach()
    coins += 2
  }
  if (keyWentDown("SPACE")) {
    spawnBullet();
  }
  if (bulletGroup.collide(asteroidG)) {
    asteroidG.destroyEach()
  }
  coinsGroup.setColliderEach("circle", 0, 0, 5)
  space_sprite.velocityY = 5
  if (space_sprite.y > height) {
    space_sprite.y += 1
  }
}

function spawnCoins() {
  coin_sprite = createSprite(random(0, width), 0, 1, 1)
  coin_sprite.addAnimation("spinning_coin", coinAnimation)
  coin_sprite.scale = 0.4
  coin_sprite.velocityY = 4
  coin_sprite.lifetime = 130
  rocket_sprite.depth = coin_sprite.depth + 1
  coinsGroup.add(coin_sprite)
}

function spawnAsteroids() {
  asteroidSprite = createSprite(random(0, width / 2), 0, 1, 1)
  asteroidSprite.velocityX = 5
  asteroidSprite.velocityY = 5
  asteroidSprite.debug = false
  asteroidSprite.scale = 0.3
  asteroidSprite.lifetime = 200
  asteroidSprite.addAnimation("asteroid", asteroidAnimation)
  asteroidSprite.setCollider("circle", 0, 0, 70)
  asteroidSprite.depth = rocket_sprite.depth + 1
  asteroidG.add(asteroidSprite)
}
function spawnBullet() {
  bulletSprite = createSprite(rocket_sprite.x, rocket_sprite.y, 10, 50);
  bulletSprite.velocityY = -15
  bulletSprite.lifetime = 150;
  bulletSprite.shapeColor = "red";
  bulletGroup.add(bulletSprite);
}
/*function restart() {
  restartButton = swal({
    title: "Oh no! You died!",
    text: "Press ok to restart the game!",
    imageUrl: "https://c.tenor.com/eWKbzq3GhRUAAAAC/aesthetic-game-over.gif",
    imageSize: "100x100",
    confirmButtonText: "Okay, I will click it once this closes"
  })
  reloadButton = createImg("ok.gif")
  reloadButton.position(width / 2, height / 2);
  reloadButton.size(100, 100)
  reloadButton.mousePressed(()=>{
    window.location.reload()
  })
}*/