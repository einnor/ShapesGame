// Start enchant.js
enchant();

// On document load
window.onload = function () {
    
    // Global variables
    var WIDTH = 640, HEIGHT = 512;
    var right, wrong;
    var array = [];
    var counter;
    var texts;
    var label, label2;
    var beginning;
    var music;

    var currentshape;
    var shapes = {
        Rectangle: 0, Square: 1, Circle: 2, Triangle: 3, Oval: 4
    };
    
    var answer;
    var answers = {
        Wrong: 0, Correct: 1, Null: 2
    }
    
    // Starting point
    var game = new Game(WIDTH, HEIGHT);
    
    // Preload resources
    game.preload('res/bg.png', 'res/shapes.png', 'res/frame.png', 'res/RightOrWrongSpritesheet.png', 'res/bgm.ogg');
    
    game.fps = 15;
    game.scale = 1;
    
    game.onload = function () {
        // Debugging purposes
        console.log("On Game Load");
        
        var scene = new SceneGame();
        
        // Start scene
        game.pushScene(scene);
        
        
    }
    
    // Start the game
    game.start();
    
    // Hide the address bar in mobile devices
    window.scrollTo(0, 0);
    
    
    // SceneGame
    var SceneGame = Class.create(Scene, {
        
        // The main game play
        // Constructor
        initialize: function () {
            var game , bg, shapes, answerFrame;
            
            counter = 0;
            texts = new Array();
            beginning = 1;
            music = 0;
            
            setText();            
            
            // Call suoerclass constructor
            Scene.apply(this);
            
            // Access the game singleton instance
            game = Game.instance;
            
            // Background music
            this.bgm = game.assets['res/bgm.ogg'];
            //this.bgm.play();
            
            // Set the background
            bg = new Sprite(WIDTH, HEIGHT);
            bg.image = game.assets['res/bg.png'];
            
            // Shapes
            shapes = new Shapes();
            shapes.x = (game.width - shapes.width)/2;
            shapes.y = 100;
            
            label2 = setLabel("Click on the game to start...")
            label2.x = (game.width - label2.width)/2;
            label2.y = game.height - 100;
            
            // Answer Frame
            answerFrame = new AnswerFrame();
            answerFrame.x = (game.width - answerFrame.width)/2;
            answerFrame.y = 250;  
            
            // Sprite for the Right and Wrong
            right = new Sprite(64, 64);
            right.image = game.assets['res/RightOrWrongSpritesheet.png'];
            right.frame = 0;
            right.x = 480;
            right.y = 255;
            
            wrong = new Sprite(64, 64);
            wrong.image = game.assets['res/RightOrWrongSpritesheet.png'];
            wrong.frame = 1;
            wrong.x = 480;
            wrong.y = 255;
            
            // Add child nodes to the scene
            this.addChild(bg);
            this.addChild(shapes);
            this.addChild(answerFrame); 
            this.addChild(label2);
            
            
            setShape();
            
            // Debugging purposes
            for(var i = 0; i<array.length; i++) {
                console.log(array[i]);
            }
            
            currentshape = array[counter];
            
            // Event Listener
            this.addEventListener(Event.ENTER_FRAME, this.update);
            this.addEventListener(Event.TOUCH_START, this.playGame);
            
            // Event Listener for debugging purpose
            /*this.addEventListener(Event.TOUCH_START, this.getLocation);*/
            
            // Instance variable
            this.timer = 0;
        },
        
        
        update: function (evt) {
            
            if (music == 1) {
                this.bgm.play();
            }
        
            // Loop background music
            if (this.bgm.currentTime >= this.bgm.duration) {
                this.bgm.play();
            }
            
            // Handle the Right and Wrong sprites as time elapses            
            if (answer === answers.Correct) {
                this.timer += evt.elapsed *0.001;
                if (this.timer >= 3.0) {
                    
                    this.removeChild(right);
                    this.removeChild(wrong);
                    this.timer = 0;
                    answer = answers.Null;
                }
                this.removeChild(label);
            }
            
            if (answer === answers.Wrong) {
                this.timer += evt.elapsed *0.001;
                if (this.timer >= 3.0) {
                    
                    this.removeChild(wrong);
                    this.removeChild(right);
                    this.timer = 0;
                    answer = answers.Null;
                    
                }
            }
            
            if (counter >= 5) {
                endGame();
            }
        },

        
        playGame: function (evt) {
            
            this.removeChild(label2);
            music = 1;
            
            if (beginning == 1) {
                label = setLabel(texts[array[counter]]);
                label.x = (game.width - label.width)/2;
                label.y = 270;
                this.addChild(label);
                beginning = 0;
            }
            else {
                this.removeChild(label);
                beginning = 1;
            }
            
            // Get the event position
            var mx = evt.x, my = evt.y;
            
            
            // Rectangle clicked
            if (59 < mx && mx < 161 && 100 < my && my < 142) {
                console.log("Rectangle clicked");
                
                if (currentshape === shapes.Rectangle) {
                    answer = answers.Correct;
                    this.addChild(right);
                    console.log("Correct");
                    counter++;
                    currentshape = array[counter];
                    beginning = 0;
                    
                }
                else {
                    answer = answers.Wrong;
                    this.addChild(wrong);
                    beginning = 1;
                }
            }
            
            // Square clicked
            if (207 < mx && mx < 252 && 100 < my && my < 144) {
                console.log("Square clicked");
                if (currentshape === shapes.Square) {
                    answer = answers.Correct;
                    this.addChild(right);
                    counter++;
                    currentshape = array[counter];
                    beginning = 0;
                }
                else {
                    answer = answers.Wrong;
                    this.addChild(wrong);
                    beginning = 1;
                }
            }
            
            // Circle clicked
            if (306 < mx && mx < 351 && 100 < my && my < 144) {
                console.log("Circle clicked");
               if (currentshape === shapes.Circle) {
                    answer = answers.Correct;
                    this.addChild(right);
                   console.log("Correct");
                   counter++;
                    currentshape = array[counter];
                   beginning = 0;
                }
                else {
                    answer = answers.Wrong;
                    this.addChild(wrong);
                    beginning = 1;
                }
            }
            
            // Triangle clicked
            if (391 < mx && mx < 453 && 100 < my && my < 140) {
                console.log("Triangle clicked");
                if (currentshape === shapes.Triangle) {
                    answer = answers.Correct;
                    this.addChild(right);
                    console.log("Correct");
                    counter++;
                    currentshape = array[counter];
                }
                else {
                    answer = answers.Wrong;
                    this.addChild(wrong);
                    beginning = 1;
                }
            }
            
            // Oval clicked
            if (499 < mx && mx < 579 && 100 < my && my < 144) {
                console.log("Oval clicked");
                if (currentshape === shapes.Oval) {
                    answer = answers.Correct;
                    console.log("Correct");
                    this.addChild(right);
                    counter++;
                    currentshape = array[counter];
                    beginning = 0;
                }
                else {
                    answer = answers.Wrong;
                    this.addChild(wrong);
                    beginning = 1;
                }
            }
        }
    });
    
    var Shapes = Class.create(Sprite, {
    
        initialize: function () {
            Sprite.apply(this, [522, 47]);
            this.image = Game.instance.assets['res/shapes.png'];
        }
    });
    
    
    var AnswerFrame = Class.create(Sprite, {
        initialize: function () {
            Sprite.apply(this, [503, 85]);
            this.image = Game.instance.assets['res/frame.png'];
        }
    });
    
    
    // A function to generate random numbers within range without duplicates
    function setShape () {

        for (var i = 0; i < 5; i++) {
            array[i] = i;
        }
        
        // Randomize the array
        array.sort(function () {
            return Math.random() - 0.5;
        });
        
        // Modify the code below
        //currentshape = array[0];
    }
    
    function setLabel (text) {
        var label = new Label(text);
        label.color = 'blue';
        label.font = '24px strong';
        label.textAlign = 'center';
        label._style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
        return label;
        
    }
    
    function setText () {
        texts[0] = "Rectangle";
        texts[1] = "Square";
        texts[2] = "Circle";
        texts[3] = "Triangle";
        texts[4] = "Oval";
    }
    
    
    function endGame() {

    }
    
    
    function restartGame () {}
    
}