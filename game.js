const containerGame = document.querySelector('.containerGame')

const aboutGame = document.createElement('div')
aboutGame.innerHTML = guidance
aboutGame.setAttribute("id", "about_game")
document.body.appendChild(aboutGame)

const about = document.createElement('div')
about.setAttribute("class", "titleAbout")
about.innerHTML = ''

const desc_cont = document.createElement('div')
desc_cont.setAttribute("id", "desript-container")
const descr = document.createElement('div')
descr.setAttribute("id", "descr")
const reveal = document.createElement('div')
reveal.setAttribute("id", "reveal")
desc_cont.append(descr, reveal)

const rWr = document.createElement('div')
rWr.setAttribute("class", "rightWrong")

const notGsd = document.createElement('div')
notGsd.setAttribute("id", "notGuessed")
notGsd.innerHTML = "Wrong"
const spanW = document.createElement('span')
spanW.setAttribute("id", "scoreWrong")
spanW.innerHTML = 0
notGsd.appendChild(spanW)
rWr.appendChild(notGsd)

const prg_out = document.createElement('div')
prg_out.setAttribute("id", "progress-outer")
const bar = document.createElement('div')
bar.setAttribute("id", "bar")
const prgrss = document.createElement('div')
prgrss.setAttribute("id", "progress")
const perc = document.createElement('div')
perc.setAttribute("id", "perc")
prgrss.appendChild(bar)
prg_out.append(perc, prgrss)
rWr.appendChild(prg_out)

const gsd = document.createElement('div')
gsd.setAttribute("id", "guessed")
gsd.innerHTML = "Right"
const spanR = document.createElement('span')
spanR.setAttribute("id", "scoreRight")
spanR.innerHTML = 0
gsd.appendChild(spanR)
rWr.appendChild(gsd)

const rightWrong2 = document.createElement('div')
rightWrong2.setAttribute("id", "rightWrong2")
const wrng = document.createElement('div')
wrng.setAttribute("id", "wrong")
const rgt = document.createElement('div')
rgt.setAttribute("id", "right")
rightWrong2.appendChild(wrng)
rightWrong2.appendChild(rgt)

const downLoad = document.getElementById('downLoad')

const wsl = document.createElement('div')
wsl.setAttribute("id", "wordSpotLight")
const kbd = document.createElement('div')
kbd.setAttribute("id", "keyboard")
containerGame.append(about, desc_cont, rWr, rightWrong2, wsl, kbd)
containerGame.style.display='none'

const mailForm = document.createElement('div')
mailForm.setAttribute("id", "mail_form")
// mailForm.innerHTML = "Mail Form"
const h1 = document.createElement('h1')
h1.innerText= "Send a feedback"

const contact_wrap = document.createElement('div')
contact_wrap.setAttribute("id", "contact_wrap")

const notify = document.createElement('div')
notify.setAttribute("id", "notify")


const contactForm = document.createElement('form')
contactForm.setAttribute("id", "contact-form")

const inputHidden = document.createElement('input')
inputHidden.setAttribute("type", "hidden")
inputHidden.setAttribute("name", "contact_number")

const lableName = document.createElement('label')
lableName.innerText = "Name"
lableName.style.textAlign="center"

const inputName = document.createElement('input')
inputName.setAttribute("id","name_inp")
inputName.setAttribute("name", "nme")
inputName.setAttribute("placeholder", "Ваше имя (не обязательно)")

const lableEmail = document.createElement('label')
lableEmail.innerText = "E-mail"
lableEmail.style.textAlign="center"

const inputMail = document.createElement('input')
inputMail.setAttribute("id","em_inp")
inputMail.setAttribute("placeholder", "Е-mail для обратной связи")
inputMail.setAttribute("type", "email")
inputMail.setAttribute("name", "eml")
inputMail.setAttribute("required", "true")

const lableMessage = document.createElement('label')
lableMessage.innerText = "Message"
lableMessage.style.textAlign="center"

const textArea = document.createElement('textarea')
textArea.setAttribute("placeholder", "Текст сообщения")
textArea.setAttribute("id", "text_inp")
textArea.setAttribute("name", "mssge")
textArea.setAttribute("required", "true")
textArea.setAttribute("cols", "24")
textArea.setAttribute("rows", "10")

const submitButton =document.createElement('input')
submitButton.setAttribute("id", "formSendBtn")
submitButton.setAttribute("type", "submit")
submitButton.setAttribute("value", "Send")

contactForm.append(inputHidden,lableName,inputName, lableEmail,inputMail,lableMessage,textArea, submitButton)

contact_wrap.append(notify, contactForm)

mailForm.append(h1,contact_wrap)
mailForm.style.display="none"

document.body.appendChild(mailForm)

let answer = ''
const maxWrong = 4
let mistakes = 0
let clicked = []
let wordStatus = null

let right = []
let wrong = []
let current = 0
let sw = 0
let sr = 0

const menu = document.getElementById('menu');

const openEmail =()=>{
  aboutGame.style.display = 'none'
  containerGame.style.display= 'none'
  mailForm.style.display="flex"
}

let defaultInstallEvent = null
window.addEventListener('beforeinstallprompt', (event)=>{
  event.preventDefault()
  defaultInstallEvent=event
})
downLoad.addEventListener('click', (event)=>{
  defaultInstallEvent.prompt()
})

function aboutReveal(){
  aboutGame.style.display = 'flex'
  containerGame.style.display= 'none'
  mailForm.style.display="none"
}

function shuffle(obj1, obj2) {
  var index = obj1.length
  var rnd, tmp1, tmp2

  while (index) {
    rnd = Math.floor(Math.random() * index)
    index -= 1
    tmp1 = obj1[index]
    tmp2 = obj2[index]
    obj1[index] = obj1[rnd]
    obj2[index] = obj2[rnd]
    obj1[rnd] = tmp1
    obj2[rnd] = tmp2
  }
  return obj1, obj2
}

const extract = (origArr) => {
  let newArr = []
  origArr.map(el => {
    newArr.push(el.slice(0, 4))
  })
  return newArr
}

roundsJs.forEach(function (el, inx, arr) {
  shuffle(roundsJs[inx]['reveal'], roundsJs[inx]['descriptio'])
  let l = document.createElement('li')
  l.innerHTML = el['name']
  l.addEventListener('click', function () {
    period(el, el['name'])

    aboutGame.style.display = 'none'
    containerGame.style.display= 'flex'
    mailForm.style.display="none"
    current = 0
    spanR.innerHTML = "0"
    spanW.innerHTML = "0"
    sw = 0
    sr = 0
    wrong = []
    wrng.innerHTML = ""
    right = []
    rgt.innerHTML = ""
    percents = 0
    bar.style.height = 0
    perc.innerHTML = "0%"

  })
  menu.appendChild(l)
})

function period(e, elName) {
  // var btnReload1 = `<button id="reload1" onClick="location.reload()">Swipe left to start the game or Click to select another category</button>`;
  // document.getElementById('menu').innerHTML = btnReload1;
  about.innerHTML = elName

  var totalIdioms = extract(e['reveal']).length
  var fraction = 1 / totalIdioms * 100;
  var percents = Math.round(current * fraction) + "%"

  descr.innerHTML = e['descriptio'][current]
  reveal.innerHTML = e['reveal'][current]
  function generateAnswer() {
    answer = extract(e['reveal'])[current]
  }
  function reloadButt() {
    var btnReload = `<button id="reload" onClick="location.reload()">Reload the game</button>`;
    descr.innerHTML = btnReload;
  }
  function reloadButt1() {
    var btnReload1 = `<button id="reload1" onClick="location.reload()">Click to select another game category</button>`;
    document.getElementById('menu').innerHTML = btnReload1;
  }

  var chnCount = 0

  function generateButtons() {
    var newAr = extract(e['reveal']);
    const chunk = (arr, size) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      );
    var chnk = chunk(newAr, 4)

    function incChunk() {
      if (current >= 4 && current % 4 === 0) {
        return chnCount++
      }
    }

    incChunk()

    var a = chnk[chnCount].join('')
    var buttonHTML = a.split('').sort(() => Math.random() - 0.5).map(L =>
      `<div class="btnp" id='` + L + `'onClick="handleGuess('` + L + `')">` + L + `</div>`).join('')
    kbd.innerHTML = buttonHTML;
  }

  handleGuess = (L) => {
    clicked.indexOf(L) === -1 ? clicked.push(L) : null;
    if (answer.indexOf(L) >= 0) {
      document.getElementById(L).style.background = 'green'
      document.getElementById(L).style.color = 'white'
      guessedWord();
      checkIfGameWon();
    } else if (answer.indexOf(L) === -1) {
      mistakes++;
      document.getElementById(L).onclick = false
      document.getElementById(L).style.color = 'white'
      document.getElementById(L).style.background = 'red'
      checkIfGameLost();
    }
  }
  function checkIfGameWon() {
    if (wordStatus === answer) {
      spanR.innerHTML = ++sr;
      right.push(answer);
      rgt.innerHTML = `${right.join('<br>')}`
      ++current;
      percents = Math.round(current * fraction) + "%"
      bar.style.height = percents
      perc.innerHTML = percents
      setTimeout(function () {
        next();
      }, 1000);
    }
  }

  function checkIfGameLost() {
    if (mistakes === maxWrong) {
      spanW.innerHTML = ++sw;
      wrong.push(answer);
      wrng.innerHTML = `${wrong.join('<br>')} `
      ++current;
      percents = Math.round(current * fraction) + "%"
      bar.style.height = percents
      perc.innerHTML = percents
      setTimeout(function () {
        next();
      }, 1000);
    }
  }
  function clearAll() {
    kbd.innerHTML = "";
    descr.innerHTML = "";
    wsl.style.display = 'none';
    prgrss.style.display = 'none';
    rightWrong2.style.display = 'initial';
    rightWrong2.style.display = 'flex';
    rightWrong2.style.justifyContent = 'space-between';
    rightWrong2.style.height = '5vh';
    rightWrong2.style.width = '95%';
  }
  function guessedWord() {
    wordStatus = answer.split('').map(L => (clicked.indexOf(L) >= 0 ? L : " * ")).join('');
    wsl.innerHTML = wordStatus;
  }

  function next() {
    if (current <= totalIdioms - 1) {
      mistakes = 0;
      clicked = [];
      wsl.innerHTML = ""
      descr.innerHTML = e['descriptio'][current];
      reveal.innerHTML = e['reveal'][current];
      generateAnswer();
      generateButtons();
    } else {
      clearAll();
      reloadButt();
      reloadButt1();
    }
  }

  guessedWord()
  generateButtons()
  generateAnswer()
}