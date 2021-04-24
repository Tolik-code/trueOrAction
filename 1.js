let addUser = document.createElement('div');
addUser.innerHTML = 'Добавить игрока';
addUser.className = 'addUser';
document.body.append(addUser);

let userList = document.createElement('div');
userList.className = 'userList';
userList.innerHTML = '<h3>Игроки</h3>';
document.body.append(userList);

let gameStart = document.createElement('div');
gameStart.className = 'gameStart';
gameStart.innerHTML = '<h2>Начать</h2>';
document.body.append(gameStart);

let gameReload = document.createElement('div');
gameReload.className = 'gameReload';
gameReload.innerHTML = '<h2>Начать сначала</h2>';
document.body.prepend(gameReload);
gameReload.onclick = ()=>{location.reload();};

let users = [];

//варианти завдань
function* generatorTrue(){
  yield "С кем был ваш первый поцелуй? Поделитесь всей историей с группой.";
  yield "Вы когда-нибудь занимались сексом, больше двоих?";
  yield "За миллион долларов вы бы женились на том, кого не любите?";
  yield "Вы когда-нибудь писали в штаны?";
  yield "Какую последнюю ложь вы сказалы?";
  yield "Как вы думаете, кто лучше всех выглядит в комнате?";
  yield "Что действительно делает вас счастливым?";
  yield "Вы мастурбируете?";
  yield "С кем бы вы хотели поменяться жизнями на неделю? Зачем?";
  return "Изменяли ли вы когда-нибудь в отношения?";
}
function* generatorFalse(){
  yield "Поделитесь футболкой с человеком справа на следующие 3 раунда.";
  yield "Станцуйте Макарену.";
  yield "Попробуйте продать лед на улице.";
  yield "Занюхайте полоску сахара.";
  yield "Возьмите немного пудры в руки и похлопайте человека слева от вас по щеке.";
  yield "Прочтите вслух последнее полученное сообщение.";
  yield "Оберните голову футболкой и посидите так один раунд.";
  yield "Позвоните случайному человеку и спойте ему с днем рождения.";
  yield "Сделайте головной убор из туалетной бумаги и позируйте для фото.";
  yield "Похлопайте человека слева от вас по попе.";
  return "Поцелуйте соседа справа в щеку.";
}

let buttTrue = generatorTrue();
let buttFalse = generatorFalse();

function elemT(){
  return buttTrue.next();
}
function elemF(){
  return buttFalse.next();
}

addUser.onclick = function(){
  let userParametr = document.createElement('div');
  userParametr.className = 'userParametr';
  userParametr.innerHTML = '<input id = "userName" value = "введите имя" style="height: 30px; font-size:25px; width: 190px"/> <div id = "sexM"  class = "sex">M</div> <div id = "sexW" class = "sex">Ж</div> <div id="doneUserParametr">Готово</div>';
  document.body.prepend(userParametr);


  let sexM = document.getElementById('sexM');
  let sexW = document.getElementById('sexW');

  function toogleSex(){
    if(sexM.classList.contains('sexActive')){sexM.className = 'sex'; sexW.className = 'sexActive';} 
    else{
      sexW.className = 'sex'; sexM.className = 'sexActive';}
    }

sexM.className = 'sexActive';
sexM.onclick = ()=>{toogleSex();};
sexW.onclick = ()=>{toogleSex();};

  let doneUserParametr = document.getElementById('doneUserParametr');

doneUserParametr.onclick = function(){
users.push(document.getElementById('userName').value);
users.push(sexM.classList.contains('sexActive')?'sexM':'sexW');

let userInList = document.createElement('div');
userInList.className = 'userInList';
userInList.style = 'opacity:0;';
setTimeout(()=>userInList.style = 'opacity:1;',30);
let sexUserInList = sexM.classList.contains('sexActive')?'   <p style = "color:blue"> M</p>':'    <p style = "color:pink"> Ж</p>';
userInList.innerHTML = document.getElementById('userName').value + sexUserInList;

userList.append(userInList);


console.log(users);
userParametr.remove();
};

};

let i = 0;


gameStart.onclick = function gStart(){

  if(users.length > 1){addUser.remove(); gameStart.remove();

    let userL = document.querySelectorAll('.userInList');
    userL[i].style = 'background-color: rgba(210, 212, 77, 0.589); width: 135px; font-size:20px;';

  let trueOrAction = document.createElement('div');
  trueOrAction.className = 'trueOrAction';
  document.body.prepend(trueOrAction);

  let buttonTrue =  document.createElement('button');
  buttonTrue.className = 'buttonTorA';
  buttonTrue.innerHTML = 'правда';
  trueOrAction.append(buttonTrue);

  let buttonFalse =  document.createElement('button');
  buttonFalse.className = 'buttonTorA';
  buttonFalse.innerHTML = 'Действие';
  trueOrAction.append(buttonFalse);

  let buttonRandom =  document.createElement('button');
  buttonRandom.className = 'buttonTorA';
  buttonRandom.innerHTML = 'Случайно :)';
  buttonRandom.style = 'margin-left: 140px';
  trueOrAction.append(buttonRandom);

  function remTrueOrAction(){
    buttonTrue.remove();
    buttonFalse.remove();
    buttonRandom.remove();
  }

function performance(el){
  let ele = el==buttTrue?elemT():elemF();
  trueOrAction.innerHTML = `<p class = "textPerformance">${ele.value}</p>`;

  function buttSkipOrDone(trueOrA){
    let buttSkip = document.createElement('button');
    buttSkip.className = 'buttSkipOrDone';
    buttSkip.innerHTML = 'Пропустить';
    trueOrAction.append(buttSkip);
    
  
    let buttDone = document.createElement('button');
    buttDone.className = 'buttSkipOrDone';
    buttDone.innerHTML = 'Исполнено';
    trueOrAction.append(buttDone);
  
    buttSkip.onclick = ()=>{
      buttSkip.remove();
      buttDone.remove();
      performance(trueOrA);
    };
    buttDone.onclick = ()=>{
      buttSkip.remove();
      buttDone.remove();
      
      userL[i].style = 'background-color:rgb(240, 130, 90);width: 110px; font-size:17px';
      i++;
      if(i>((users.length/2) -1)){i=0;}
      userL[i].style = 'background-color: rgba(210, 212, 77, 0.589);width: 135px; font-size:20px;';
      trueOrAction.remove();
      gStart();
    };
  }

  buttSkipOrDone(el);
}
  


buttonTrue.onclick = ()=>{
  remTrueOrAction();
  performance(buttTrue);
};

buttonFalse.onclick = ()=>{
  remTrueOrAction();
  performance(buttFalse);
  
};

buttonRandom.onclick = ()=>{
  remTrueOrAction();
  if(2>=Math.floor(Math.random()*6)){performance(buttFalse);}else{performance(buttTrue);}
};


  }else {alert('Создайте минимум одного игрока');}
   
};


















/*let a = document.getElementById('qq');
setInterval(()=> a.style.background="purple",400);
setInterval(()=> a.style.background="red",800);
let i =0;
let z =40;
function as() {
  qq.style.left = i + "px";
  //qq.style.top = z +"px";
  if (i >500){return true}
  return i+=4, z+=1;
}
setInterval(as,50)
function count() {
  qq.style.top ="10px";
}
function count2() {
return  qq.style.bottom ="10px";
}

console.log(a.attributes)*/


/*function ms(m) {
  return new Promise (function(resolve, reject) {
    setTimeout(()=> resolve (),m);
  }
)};

ms(2000).then(()=>alert())



class AS {
  constructor(name) {
    this.name = name;
  };
  s (){
    alert(1);
  }
};

let i = new AS ("vasa");
i.s()/*


/*function calcul(a,m,n) {
  let b=0;
  let z = a.split(" ");

  for(let i = 0;i<z.length;i++){
    if (z[i] ==m) {z.splice(i,1)}
  };

  if(a.indexOf(m) != -1){
     return z.reduce( n)
  } else {return console.log("Nananan")};
   };


let x= "10 - 1 - 3";
console.log(calcul(x,"-",(sum,item) => (sum*1 - item*1)) )*/
