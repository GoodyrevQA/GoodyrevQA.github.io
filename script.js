var game = document.getElementById("gameID");
var context = game.getContext("2d");
var boxSize = 32;
var score = 0;
// Перемещение змеи до 1000/100 = 10 раз в секунду
var gameSpeed = 100;

var snakeX = [];
var snakeY = [];
generateSnake();
var snakeDirection = "";

var food = [];
generateFood();

//Подгружаем картинку фона
var backgroundImage = new Image();
backgroundImage.src = "background.png";

//Подгружаем картинку еды
var foodImage = new Image();
foodImage.src = "bug.png";

//Отрисовка всех объектов
function draw(){
	context.drawImage(backgroundImage, 0, 0);
	context.drawImage(foodImage, food[0], food[1]);
	drawSnake();

	context.fillStyle = "White";
	context.font = "bold 40px Montserrat";
	context.fillText("Bugs caught: " + score, 1 * boxSize, 1.6 * boxSize);
}

    

//Перемещение змеи - этап 1 Обработка нажатия стрелок
document.addEventListener("keydown", moveSnake);
function moveSnake(event){
	if(event.keyCode == 37 && snakeDirection != "право"){
		snakeDirection = "лево";
	} else if(event.keyCode == 38 && snakeDirection != "вниз"){
		snakeDirection = "верх";
	} else if(event.keyCode == 39 && snakeDirection != "лево"){
		snakeDirection = "право";
	} else if(event.keyCode == 40 && snakeDirection != "верх"){
		snakeDirection = "вниз";
	}
}
//Перемещение змеи - этап 2 Меняем координаты змеи
function moveSnakeStep2(){
	//Достаём координаты головы змеи
	snakeXTemp = snakeX[0];
	snakeYTemp = snakeY[0];

	//Проверяем столкновение с едой
	if(snakeXTemp == food[0] && snakeYTemp == food[1]){
		score++;
		generateFood();
	} else{
		//Удаляем последний символ хвоста
		snakeX.pop();
		snakeY.pop();
	}

	//Находим новую ячейку для отрисовки головы
	if(snakeDirection == "лево"){
		snakeXTemp -= boxSize;
	} else if(snakeDirection == "право"){
		snakeXTemp += boxSize;
	} else if(snakeDirection == "верх"){
		snakeYTemp -= boxSize;
	} else if(snakeDirection == "вниз"){
		snakeYTemp += boxSize;
	}

	//Проверяем столкновение с краями игрового поля
	if(snakeXTemp < boxSize || snakeXTemp > 17 * boxSize || snakeYTemp < 3 * boxSize || snakeYTemp > 17 * boxSize){
		finishGame();
		return;
	}

	//Проверяем столкновение змеи с собой
	for(pos = 0; pos < snakeX.length; pos++){
		if(snakeXTemp == snakeX[pos] && snakeYTemp == snakeY[pos]){
			finishGame();
			return;
		}
	}

	//Добавляем новую голову
	snakeX.unshift(snakeXTemp);
	snakeY.unshift(snakeYTemp);
}

//Запускаем новую игру
function newGame(){
	score = 0;

	snakeX = [];
	snakeY = [];
	generateSnake();
	snakeDirection = "";

	food = [];
	generateFood();
}

//Отображаем результаты игры
function finishGame(){
	if (score < 10) {
		swal("Общее количество найденных багов: " + score, 
		"И это печально.\n Вы проигноривали задачи из таск-трекера.\n В результате, в прод выкатили сырой продукт(((. Пока Вы точно джун, и Вам есть, куда расти. Посмотрите Русова, почитайте Савина... или это было просто недоразумение? Попробуем еще раз?")
	}
	else if (score >= 10 && score < 30) {
		swal("NOT BAD! Количество найденных багов: " + score,
		'Определенно Вы что-то понимаете в тестировании.\n Вероятно, Вы - мидл.\n Но не стоит останавливаться на достигнутом, ведь, как известно, исчерпывающее тестирование невозможно.\n Да и плох тот мидл, который не мечтает стать сеньором.\n Продолжим бороться за качество продукта?')
	}
	else if (score >= 30) {
		swal("WOW! Количество найденных багов: " + score,
		'Вы можете с гордостью носить звание \nSenior-QA Engineer. \nВсе баги трепещут при одном Вашем появлении.\n Но, это не значит, что можно почивать на лаврах.\n Ведь вся жизнь - баги, а мы в ней тестировщики.\n Обдумаем эту глубокую мысль и продолжим?')
	}
	newGame()
}	
	
	

//Тут вся игровая логика
function main() {
	moveSnakeStep2();
	draw();
}
var gameMainInterval = setInterval(main, gameSpeed);

//Генерация змеи
function generateSnake(){
	snakeX[0] = 9 * boxSize;
	snakeY[0] = 10 * boxSize;
}
//Отрисовка змеи
function drawSnake(){
	for(let pos = 0; pos < snakeX.length; pos++){
		context.fillStyle = pos == 0 ? "rgb(113, 0, 123)" : "rgb(154, 0, 168)";
		context.fillRect(snakeX[pos], snakeY[pos], boxSize, boxSize);
	}
}


//Генерация еды
function generateFood(){
	food[0] = Math.floor((Math.random() * 17 + 1)) * boxSize;
	food[1] = Math.floor((Math.random() * 15 + 3)) * boxSize;

	//Проверка ячейки на наличие змеи
	var isSnakeCollision = false;
	for(pos = 0; pos < snakeX.length; pos++){
		if(snakeX[pos] == food[0] && snakeY[pos] == food[1]){
			isSnakeCollision = true;
		}
	}

	//Если сгенерировали еду в змеи, то генерируем заново
	if(isSnakeCollision){
		generateFood();
	}
}

