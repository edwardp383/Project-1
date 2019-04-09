console.log("hi");
//generate a map
//0 = floor
//1 = wall
//2 = pit
//3 = start
//4 = door
//5 = enemy1
//6 = enemy2
//7 = key

const player = {
	x: undefined,
	y: undefined,
	alive: true,
	won: false,
	direction: {
    	up: false,
    	down: false,
    	left: false,
    	right: false
    },
	locatePlayer(){
		for (let i = 0; i < game.map1.length; i++) {
			for (let j = 0; j < game.map1[i].length; j++) {
				if (game.map1[i][j] === 3) {
					player.x = j;
					player.y = i;
				}
			}
		}
	},
	move() {
		this.locatePlayer()
    	if(this.direction.up) {
    		if (game.map1[player.y - 1][player.x] === 4) {
    			player.won = true;
    		} else if (game.map1[player.y - 1][player.x] === 5) {
    			player.alive = false;
    		} else if (game.map1[player.y - 1][player.x] === 2) {
    			player.alive = false;
    		} else if (game.map1[player.y - 1][player.x] !== 1) {
    			game.map1[player.y][player.x] = 0;
    			player.y -= 1;
    			game.map1[player.y][player.x] = 3;
    		}
    	}
    	if(this.direction.left) {
    		if (game.map1[player.y][player.x - 1] === 4) {
    			player.won = true;
    		}else if (game.map1[player.y][player.x - 1] === 5){
    			player.alive = false;
    		}else if (game.map1[player.y][player.x - 1] === 2){
    			player.alive = false;
    		}else if (game.map1[player.y][player.x - 1] !== 1) {
    			game.map1[player.y][player.x] = 0;
    			this.x -= 1;
    			game.map1[player.y][player.x] = 3
    		}
    	}
    	if(this.direction.right) {
    		if (game.map1[player.y][player.x + 1] === 4) {
    			player.won = true;
    		}else if (game.map1[player.y][player.x + 1] === 5){
    			player.alive = false;
    		}else if (game.map1[player.y][player.x + 1] === 2){
    			player.alive = false;
    		}else if (game.map1[player.y][player.x + 1] !== 1) {
    			game.map1[player.y][player.x] = 0;
    			this.x += 1;
    			game.map1[player.y][player.x] = 3
    		}
    	}
    	if(this.direction.down) {
    		if (game.map1[player.y + 1][player.x] === 4) {
    			player.won = true;
    		}else if (game.map1[player.y + 1][player.x] === 5){
    			player.alive = false;
    		}else if (game.map1[player.y + 1][player.x] === 2){
    			player.alive = false;
    		}else if (game.map1[player.y + 1][player.x] !== 1) {
    			game.map1[player.y][player.x] = 0;
    			this.y += 1;
    			game.map1[player.y][player.x] = 3
    		}
    	}
  	},
  	setDirection(key) {
    	if(key == 'w') this.direction.up = true;
    	if(key == 'a') this.direction.left = true;
    	if(key == 's') this.direction.down = true;
    	if(key == 'd') this.direction.right = true;
		//console.log(this.direction)
  	},
  	unsetDirection(key) {
    	if(key == 'w') this.direction.up = false;
    	if(key == 'a') this.direction.left = false;
    	if(key == 's') this.direction.down = false;
    	if(key == 'd') this.direction.right = false;
		//console.log(this.direction)
  	},
	lose(){
		$('#lvl').empty()
		$('#lvl').append('<div id="lose">You Died!</div>')
	},
	win(){
		$('#lvl').empty()
		$('#lvl').append('<div id="win">You Won!</div>')
	}
};

class Enemy1{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.direction = {
			up: false,
			down: true
		}
	}
	// show(){
	// 	game.map1[this.y][this.x] = 5;
	// }
	moveDown(){
		if (this.direction.down == true) {
			if (game.map1[this.y + 1][this.x] === 3) {
				player.alive = false;
			}else if (game.map1[this.y + 1][this.x] === 0) {
				game.map1[this.y][this.x] = 0;
    			this.y += 1;
    			game.map1[this.y][this.x] = 5;
    		} else {
    			this.direction.down = false;
    			this.direction.up = true;
    		}
    	}
	}
	moveUp(){
		if (this.direction.up == true) {
			if (game.map1[this.y - 1][this.x] === 3) {
				player.alive = false;
			}else if (game.map1[this.y - 1][this.x] == 0) {
				game.map1[this.y][this.x] = 0;
    			this.y -= 1;
    			game.map1[this.y][this.x] = 5;
    		} else {
    			this.direction.up = false;
    			this.direction.down = true;
    		}
    	}
	}
}

// const enemy1 = {
// 	x: [],
// 	y: [],
// 	direction: {
//     	up: false,
//     	down: true,
//     },
// 	locateEnemy1(){
// 		enemy1.x = [];
// 		enemy1.y = [];
// 		for (let i = 0; i < game.map1.length; i++) {
// 			for (let j = 0; j < game.map1[i].length; j++) {
// 				if (game.map1[i][j] === 5) {
// 					enemy1.x.push(j);
// 					enemy1.y.push(i);
// 				}
// 			}
// 		}
// 	},
// 	// locateEnemy1(){

// 	// }
// 	moveDown(){
// 		this.locateEnemy1()
// 		for (let i = 0; i < this.y.length; i++) {
// 			if (enemy1.direction.down == true) {
// 				// i
// 				if (game.map1[enemy1.y[i] + 1][enemy1.x[i]] == 0) {
// 					//
// 					game.map1[enemy1.y[i]][enemy1.x[i]] = 0;
//     				enemy1.y[i] = enemy1.y[i] + 1;
//     				game.map1[player.y[i]][player.x[i]] = 5;
//     			} else {
//     				enemy1.direction.down = false;
//     				enemy1.direction.up = true;
//     			}
//     		}
//     	}
//     },
//     moveUp(){
//     	this.locateEnemy1()
//     	for (let i = 0; i < this.y.length; i++) {
//     		if (enemy1.direction.up == true) {
// 				if (game.map1[enemy1.y[i] - 1][enemy1.x[i]] == 0) {
// 					game.map1[enemy1.y[i]][enemy1.x[i]] = 0;
//     				enemy1.y[i] = enemy1.y[i] - 1;
//     				game.map1[player.y[i]][player.x[i]] = 5
//     			} else {
//     				enemy1.direction.down = true;
//     				enemy1.direction.up = false;
//     			}
//     		}
//     	}
// 	}
// };


const game = {
	currentEnemies: [],
	map1: [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,2,1,1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,5,5,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,5,5,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,2,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1],
		[1,1,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	],
	makeMap(map){
		$('#lvl').empty()
		for (let y = 0; y < map.length; y++) {
		// const row = $('<div class="row"></div>');
		// $('#lvl').append(row)
			for (let x = 0; x < map[y].length; x++) {
				if (map[y][x] === 0) {
					$('#lvl').append('<div class="floor"></div>')
				} else if (map[y][x] === 1) {
					$('#lvl').append('<div class="wall"></div>')
				} else if (map[y][x] === 2) {
					$('#lvl').append('<div class="pit"></div>')
				} else if (map[y][x] === 3) {
					$('#lvl').append('<div class="character"></div>')
				} else if (map[y][x] === 4) {
					$('#lvl').append('<div class="door"></div>')
				} else if (map[y][x] === 5) {
					$('#lvl').append('<div class="enemy"></div>')
				}
			}
		}
	},
	makeEnemies(){
		for (let i = 0; i < game.map1.length; i++) {
			for (let j = 0; j < game.map1[i].length; j++) {
				if (game.map1[i][j] === 5) {
					const e1 = new Enemy1(j, i)
					//console.log(e1);
					this.currentEnemies.push(e1)
					//console.log(this.currentEnemies);
				}
			}
		}
	},
	moveEnemies(){
		for (let i = 0; i < this.currentEnemies.length; i++) {
			this.currentEnemies[i].moveDown()
			this.currentEnemies[i].moveUp()
		}
	},
	start(){
		this.makeEnemies();
		let run = setInterval(function(){
			if(player.alive == false){
				// console.log(player.alive);
				clearInterval(run)
				player.lose()
			} else if (player.won == true) {
				clearInterval(run)
				player.win()
			} else {
				// $('#lvl').empty()
				game.makeMap(game.map1);
				player.move();
				game.moveEnemies();
				// enemy1.moveDown();
				// enemy1.moveUp();
			}
		}, 150);
	}

}

// const enemy = {
// 	squares: [
// 		[45, 14],
// 		[45, 15]
// 	],
// 	show() {
// 		for(let i = 0; i < this.squares.length; i++) {
// 			// make each coord in this.squares[i] be a 5	
// 			game.map1[this.squares[i][0]][this.squares[i][1]] = 5
// 			game.makeMap(game.map1);
// 		}
// 	},
// 	moveUp() {
// 		// if the relevant squres are empty in the array
// 		// decrement 0 of both squares

// 		// else 
// 		// return false
// 	}
// }


$('button').on('click', () => {
	game.start()
});

$(document).keydown((e) => {
	// console.log(e.key);
	if(['w', 'a', 's', 'd'].includes(e.key)) {
		player.setDirection(e.key)
		// console.log('keypressed');
	}
})
$(document).keyup((e) => {
	if(['w', 'a', 's', 'd'].includes(e.key)) {
		player.unsetDirection(e.key)
		// console.log('keypressed');
	}
})



























