let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% off","Hard Luck","70% Off","Swagpck","100% OFF","Netflix","50% OFF","Amazon Voucher","2 Extra Spin","CB Tshirt","CB Book"]
        
    }



let config = {
    type: Phaser.CANVAS,
    width : 800,
    height : 600,
    canspin : true,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
        
    }
};

let game = new Phaser.Game(config);

function preload(){
    this.load.image('background',"background.jpg");
    this.load.image('wheel',"wheel.png");
    this.load.image('pin',"pin.png");
    this.load.image('stand',"stand.png");
    this.load.image('spin',"spin and win.png");
    this.load.image('button',"button.jpg");
    this.load.image('logo', "cblogo.png");
    this.load.audio("audio_beam", ["sounds/beam.ogg", "sounds/beam.mp3"]);
    this.load.bitmapFont("pixelFont", "font.png", "font.xml");
    
    
}

function create(){
    let W = game.config.width;
    let H = game.config.height;
    this.background = this.add.tileSprite(0,0, config.width, config.height,"background");
         this.background.setOrigin(0,0);
    let pin = this.add.sprite(W/1.5,H/2-250,"pin").setScale(0.20);
    pin.depth = 5;
    this.add.sprite(W/1.5,H/2+250,"stand").setScale(0.20);
    this.wheel = this.add.sprite(W/1.5,H/2,"wheel");
    this.wheel.setScale(0.25);
    this.add.sprite(W/10,H/2-100,"spin").setScale(0.15);
    this.button = this.add.sprite(W/12,H/2+175,"button").setScale(0.4);
    this.logo = this.add.sprite(W/8, H/2+250, "logo").setScale(0.3);
    this.score = 0;
    this.label = this.add.bitmapText(W/30, H/2+100, "pixelFont", "Total spin done: ", 25);
    this.beamSound = this.sound.add("audio_beam");
    this.input.on("pointerdown",spinwheel,this);
    font_style = {
        font: "bold 30px Arial",
        align: "center",
        color: "red",
    }
    this.game_text = this.add.text(10,10,'welcome to spin n win',font_style);
    
}

function update(){
    
    this.background.tilePositionY -=0.5;   
}



function spinwheel(){
    //this.wheel.angle += 1700;
   
    this.game_text.setText("You won...");
    let rounds = Phaser.Math.Between(2,5);
    let extra_degree = Phaser.Math.Between(0,11)*30;
    let total_angle = rounds*360 + extra_degree;
    
    let idx = prizes_config.count-1-
        Math.floor(extra_degree/(360/prizes_config.count));
    
    this.beamSound.play();
    this.score +=1;
    this.label.text = "Total spin done: "+ this.score;
    let tween = this.tweens.add({
      targets: this.wheel,
      angle:  total_angle,
      ease : "Cubic.easeOut",
       duration: 6000,
        callbackScope: this,
        onComplete: function(){
            this.game_text.setText("You won " + prizes_config.prize_names[idx])
        },
    });
       
    
        
    
           
}
