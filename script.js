// wrap in load event
window.addEventListener("load", function () {
  // canvas
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  const CANVAS_WIDTH = (canvas.width = 800); //same as css width
  const CANVAS_HEIGHT = (canvas.height = 600); //same as css width

  // player class
  class Player {
    constructor(width, height, movesObject, defaultMove) {
      this.width = width;
      this.height = height;
      this.movesObject = movesObject;
      this.image = new Image();
      this.frameX = 0;
      this.frameY = 0;
      this.defaultMove = defaultMove;
    }
    // update class
    update() {
      this.move = this.movesObject[this.defaultMove];
      console.log(`update this.move ${this.defaultMove}`);
      this.src = this.move.src;
      console.log(`update this.src ${this.src}`);
      this.maxFrames = this.move.maxFrames;
      this.movesStaggerFrames = this.move.movesStaggerFrames;
    }
    // drawImage
    draw(position) {
      this.image.src = this.src;
      // context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
      ctx.drawImage(
        this.image,
        this.width * position,
        this.height * this.frameY,
        this.width,
        this.height,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
    }
  }
  //assets/swordsman/Attack_1.png
  let gameFrame = 0;
  // variables

  // move list~
  const moveList = {
    idle: {
      src: "./assets/swordsman/Idle.png",
      maxFrames: 8,
      movesStaggerFrames: 8,
    },
    idle2: {
      src: "./assets/swordsman/Idle_2.png",
      maxFrames: 3,
      movesStaggerFrames: 8,
    },
    walk: {
      src: "./assets/swordsman/Walk.png",
      maxFrames: 8,
      movesStaggerFrames: 12,
    },
    run: {
      src: "./assets/swordsman/Run.png",
      maxFrames: 8,
      movesStaggerFrames: 4,
    },
    jump: {
      src: "./assets/swordsman/Jump.png",
      maxFrames: 8,
      movesStaggerFrames: 5,
    },
    attack1: {
      src: "./assets/swordsman/Attack_1.png",
      maxFrames: 6,
      movesStaggerFrames: 5,
    },
    attack2: {
      src: "./assets/swordsman/Attack_2.png",
      maxFrames: 2,
      movesStaggerFrames: 5,
    },
    attack3: {
      src: "./assets/swordsman/Attack_3.png",
      maxFrames: 4,
      movesStaggerFrames: 5,
    },
    hurt: {
      src: "./assets/swordsman/Hurt.png",
      maxFrames: 3,
      movesStaggerFrames: 5,
    },
    dying: {
      src: "./assets/swordsman/Dead.png",
      maxFrames: 3,
      movesStaggerFrames: 18,
    },
  };
  // initialize a new player
  const player_1 = new Player(128, 128, moveList, "run");

  player_1.defaultMove = "idle";
  const dropdown = document.getElementById("animations");
  dropdown.addEventListener("change", function (e) {
    // console.log(e.target.value)
    player_1.defaultMove = e.target.value;
  });

  // animate functions
  function animate() {
    player_1.update();
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position =
      Math.floor(gameFrame / player_1.movesStaggerFrames) % player_1.maxFrames;
    // context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
    player_1.draw(position);
    gameFrame++;
    requestAnimationFrame(animate);
  }

  animate();
});
