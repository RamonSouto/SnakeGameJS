let canvas = document.getElementById('snack');
let context = canvas.getContext("2d"); //renderiza o e vai ser apresentado dentro do canvas
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 +1) * box, //pegando aleatorio food para x
    y: Math.floor(Math.random() * 15 +1) * box //pegando aleatorio food para y
}

function criarBG(){
    context.fillStyle = "lightgreen"; //cor do background
    context.fillRect(0, 0, 16 * box, 16 * box); //tamanho background
}

function criarCobrinha(){
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green"; //cor do background
        context.fillRect(snake[i].x, snake[i].y, box, box); //tamanho background   
    }
}

function drawFood() {
    context.fillStyle = "red"; //cor do background da comida
    context.fillRect(food.x, food.y, box, box); //tamanho background
    
}
//Ficar escultado evento de apertar o teclado
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left" //37 - Left
    if(event.keyCode == 38 && direction != "down") direction = "up"    //38 - Up
    if(event.keyCode == 39 && direction != "left") direction = "right" //39 - right
    if(event.keyCode == 40 && direction != "up") direction = "down"    //40 - down
}

function iniciarJogo() {
    setInterval(imprimirPosicao, 1000)

    /* Configurando a posição ao passar das margens */
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i< snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(");
        }
    }


    criarBG(); //Chamando função que desenha fundo
    criarCobrinha(); //Chamando função que cria cobrinha
    drawFood(); //Chamando função que desenha comida

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction =="right") snakeX += box;
    if(direction =="left") snakeX -= box;
    if(direction =="up") snakeY -= box;
    if(direction =="down") snakeY += box;


    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //retirar ultimo elemento do array
    } else {
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //Adicionar antes do primeiro elemento do array
}

let jogo = setInterval(iniciarJogo, 250);

function imprimirPosicao() {
    console.clear();
    console.log(`valor de X: ${snake[0].x}`);
    console.log(`valor de Y: ${snake[0].y}`);
    console.log(`Tamanho: ${snake.length}`)
}

