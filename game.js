let Answer = ''
let pinyin = []
const maxWrong = 3
let mistakes = 0
let clicked = []
let wordStatus
let pinyinStatus

let right = []
let wrong = []
let current = 0
let sw = 0
let sr = 0
let itr
let lvl

function shuffle(obj1, obj2, obj3) {
  var index = obj1.length
  var rnd, tmp1, tmp2, tmp3

  while (index) {
    rnd = Math.floor(Math.random() * index)
    index -= 1
    tmp1 = obj1[index]
    tmp2 = obj2[index]
    tmp3 = obj3[index]
    obj1[index] = obj1[rnd]
    obj2[index] = obj2[rnd]
    obj3[index] = obj3[rnd]
    obj1[rnd] = tmp1
    obj2[rnd] = tmp2
    obj3[rnd] = tmp3
  }
  return obj1, obj2, obj3
}

const extract = (origArr) => {
  let newArr = []
  origArr.map(el => {
    newArr.push(el.slice(0, 4))
  })
  return newArr
}
const extractPinyin = (origArr) => {
  let newArrPin = []
  newArrPin = origArr[current].split(' ').slice(2, 6)
  return newArrPin
}

function period(e, elName, l) {
  if (!l) {
    mainMenu.remove()
    content.appendChild(containerGame)
    spanR.disabled = false
    spanW.disabled = false
    dropDown.appendChild(catList)
  }

  if (l) {
    mainMenu.remove()
    containerGame.remove()
    content.appendChild(wrap)
    stDsc.setAttribute("class", "learnDescript")
    stDsc.attr
    stDsc.innerHTML = `<div style="overflow: scroll">` +
      `<span style="color:green;font-size: calc(20px + 25 * (100vw/1600));">${e['description'][current]}</span> <br> <span style="color: blue;font-size: calc(15px + 18 * (100vw/1600));">${e['answer'][current]}</span> <br> ${e['examples'][current].replaceAll(`class='hnt'`, `class='norm'`)}` +
      `</div>`
    cat.innerText = elName
    dropDownLearn.appendChild(catList)

    nxt.onclick = () => {
      if (current >= e['answer'].length - 1) {
        current = 0
        stDsc.innerHTML = `<div style="overflow: scroll">` +
          `<span style="color:green;font-size: calc(20px + 25 * (100vw/1600));">${e['description'][current]}</span> <br> <span style="color: blue;font-size: calc(15px + 18 * (100vw/1600));">${e['answer'][current]}</span> <br> ${e['examples'][current].replaceAll(`class='hnt'`, `class='norm'`)}` +
          `</div>`
      } else
        current++
      stDsc.innerHTML = `<div style="overflow: scroll">` +
        `<span style="color:green;font-size: calc(20px + 25 * (100vw/1600));">${e['description'][current]}</span> <br> <span style="color: blue;font-size: calc(15px + 18 * (100vw/1600));">${e['answer'][current]}</span> <br> ${e['examples'][current].replaceAll(`class='hnt'`, `class='norm'`)}` +
        `</div>`
    }
    prev.onclick = () => {
      if (current <= 0) {
        current = e['answer'].length - 1
        stDsc.innerHTML = `<div style="overflow: scroll">` +
          `<span style="color:green;font-size: calc(20px + 25 * (100vw/1600));">${e['description'][current]}</span> <br> <span style="color: blue;font-size: calc(15px + 18 * (100vw/1600));">${e['answer'][current]}</span> <br> ${e['examples'][current].replaceAll(`class='hnt'`, `class='norm'`)}` +
          `</div>`
      } else
        current--
      stDsc.innerHTML = `<div style="overflow: scroll">` +
        `<span style="color:green;font-size: calc(20px + 25 * (100vw/1600));">${e['description'][current]}</span> <br> <span style="color: blue;font-size: calc(15px + 18 * (100vw/1600));">${e['answer'][current]}</span> <br> ${e['examples'][current].replaceAll(`class='hnt'`, `class='norm'`)}` +
        `</div>`
    }
  }

  else
  about.innerHTML = elName
  var totalIdioms = extract(e['answer']).length
  var fraction = 1 / totalIdioms * 100;
  var percents = Math.round(current * fraction) + "%"

  desc_cont.innerHTML = `<div style="overflow: scroll;height: 100%;">` +
    `<div style="color:blue;font-size: calc(20px + 25 * (100vw/1600));">${e['description'][current]}</div>` +
    `<br>` +
    `<div>${e['examples'][current]}</div>` +
    `</div>`

  function generateAnswer() {
    Answer = extract(e['answer'])[current]
  }
  function generatePinyin() {
    pinyin = extractPinyin(e['answer'])
  }

  var chnCount = 0

  function generateButtons() {
    var newAr = extract(e['answer']);
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
    function equalizer(arr) {
      let lst = new Set()
      for (i = 0; i < arr.length; i++) {
        lst.add(arr[i])
      }
      return Array.from(lst)
    }

    var a = chnk[chnCount].join('')
    var buttonHTML = equalizer(a.split('')).sort(() => Math.random() - 0.5).map(L =>
      `<div class="btnp" id='` + L + `'onClick="handleGuess('` + L + `')">` + L + `</div>`).join('')
    kbd.innerHTML = buttonHTML;
  }

  handleGuess = (L) => {
    clicked.indexOf(L) === -1 ? clicked.push(L) : null;
    if (Answer.indexOf(L) >= 0) {
      document.getElementById(L).style.background = 'green'
      document.getElementById(L).style.color = 'white'
      guessedWord();
      checkIfGameWon();
    } else if (Answer.indexOf(L) === -1) {
      mistakes++;
      document.getElementById(L).onclick = false
      document.getElementById(L).style.color = 'white'
      document.getElementById(L).style.background = 'red'
      checkIfGameLost();
    }
  }
  function checkIfGameWon() {
    if (wordStatus === Answer) {
      spanR.innerHTML = ++sr;
      right.unshift(Answer);
      rgt.innerHTML = `${right.join('<br>')}`
      ++current;
      percents = Math.round(current * fraction) + "%"
      bar.style.height = percents
      perc.innerHTML = percents
      if (current === totalIdioms) {
        clearAll();
      }
      setTimeout(function () {
        next();
      }, 1000);
    }
  }

  function lost() {
    spanW.innerHTML = ++sw;
    wrong.unshift(Answer);
    wrng.innerHTML = `${wrong.join('<br>')} `
    ++current;
    percents = Math.round(current * fraction) + "%"
    bar.style.height = percents
    perc.innerHTML = percents
  }

  function checkIfGameLost() {
    if (mistakes === maxWrong) {
      lost()
      setTimeout(function () {
        next();
      }, 1000);
    }
  }

  function clearAll() {
    mistakes = 0
    clicked = []
    charLine.innerHTML = ""
    pinyinLine.innerHTML = ""
    kbd.innerHTML = ""
    wsl.style.display = "none"
    desc_cont.innerHTML = "Ваш результат"
    rgt.style.display = 'flex'
    wrng.style.display = 'flex'
    rightWrong2.style.display = 'flex'
    rightWrong2.style.justifyContent = 'space-between'
    rightWrong2.style.height = '5vh'
    rightWrong2.style.width = '95%'
    spanR.disabled = true
    spanW.disabled = true
  }

  function guessedWord() {
    wordStatus = Answer.split('').map(L => (clicked.indexOf(L) >= 0 ? L : " * ")).join('');
    pinyinStatus = Answer.split('').map(L => (clicked.indexOf(L) >= 0 ? pinyin[Answer.indexOf(L)] : " * ")).join(' ');
    charLine.innerHTML = wordStatus;
    pinyinLine.innerHTML = pinyinStatus;
  }

  spanW.addEventListener('click', function () {
    if (desc_cont.innerHTML == undefined) {
      desc_cont.innerHTML = '))'
      return
    }

    if (`${wrong.join('<br>')}` == []) {
      return
    } else if (desc_cont.innerHTML == `${wrong.join('<br>')}`) {
      setTimeout(function () {
        desc_cont.style.color = 'black'
        desc_cont.innerHTML = []
        desc_cont.innerHTML = `<div style="overflow: scroll; padding: 0 autuo;">` +
        `<div style="color:blue;font-size: calc(20px + 25 * (100vw/1600));">${e['description'][current]}</div>` +
        `<br>` +
        `<div>${e['examples'][current]}</div>` +
        `</div>`
      }, 50)
    }
    else {
      setTimeout(function () {
        desc_cont.style.color = 'red'
        desc_cont.innerHTML = []
        desc_cont.innerHTML = `${wrong.join('<br>')}`
      }, 20)
    }
  })
  spanR.addEventListener('click', function () {
    if (desc_cont.innerHTML == undefined) {
      desc_cont.innerHTML = '))'
      return
    }
    if (`${right.join('<br>')}` == []) {
      return
    } else if (desc_cont.innerHTML == `${right.join('<br>')}`) {
      setTimeout(function () {
        desc_cont.style.color = 'black'
        desc_cont.innerHTML = []
        desc_cont.innerHTML = `<div style="overflow: scroll;">` +
          `<div style="color:blue;font-size: calc(20px + 25 * (100vw/1600));">${e['description'][current]}</div>` +
          `<br>` +
          `<div>${e['examples'][current]}</div>` +
          `</div>`
      }, 50)
    }
    else {
      setTimeout(function () {
        desc_cont.style.color = 'green'
        desc_cont.innerHTML = []
        desc_cont.innerHTML = `${right.join('<br>')}`
      }, 20)
    }
  })

  function next() {
    if (current <= totalIdioms - 1) {
      mistakes = 0
      clicked = []
      charLine.innerHTML = "* * * *"
      pinyinLine.innerHTML = "* * * *"
      desc_cont.innerHTML = `<div style="overflow: scroll;">` +
          `<div style="color:blue;font-size: calc(20px + 25 * (100vw/1600));">${e['description'][current]}</div>` +
          `<br>` +
          `<div>${e['examples'][current]}</div>` +
          `</div>`
      desc_cont.style.color = 'black'
      generateAnswer()
      generatePinyin()
      generateButtons()
    } else {
      clearAll()
    }
  }
  guessedWord()
  generateButtons()
  generateAnswer()
  generatePinyin()
}

const backMenu = function () {
  mistakes = 0
  clicked = []
  current = 0
  sw = 0
  sr = 0
  wrong = []
  wrng.innerHTML = ""
  right = []
  rgt.innerHTML = ""
  percents = 0
  spanR.innerHTML = "0"
  spanW.innerHTML = "0"
  bar.style.height = 0
  perc.innerHTML = "0%"
  wsl.style.display = "flex"
  rgt.style.display = 'none'
  wrng.style.display = 'none'
  desc_cont.style.color = 'black'
  rightWrong2.style.display = 'none'
}

function reset(l, q, catL) {
  if (l || q) {
    mainMenu.remove()
    backMenu()
    return
  } else
  containerGame.remove()
  wrap.remove()
  backMenu(catList)
  mainMenu.append(catL)
  content.append(mainMenu)
}

let idioma = "а"
let idioms = "ы"
function returnIdiom(arr) {
  if (arr === 1) { return idioma } else if (arr === 0 || arr >= 5) { return "" } else if (arr === 2 || 3 || 4) { return idioms }
}

function onOffLine(itr) {
  let levels = function (bt) {
    btns.forEach(btn => {
      btn.style.background = "rgb(190, 240, 241)" ? btn.style.background = "#eef2f3" : btn.style.background = "rgb(190, 240, 241)"
    })
    catList.innerHTML = ""
    bt.style.background = "rgb(190, 240, 241)"

    if (bt === learnBtn) {
      let learn = true

      itr.forEach(function (el, inx, arr) {
        shuffle(itr[inx]['answer'], itr[inx]['description'], itr[inx]['examples'])
        let l = document.createElement('li')

        l.innerHTML = `${el['name']} <div style="color: black; font-size: calc(10px + 15 * (100vw/1600));">${el["description"].length} Идиом${returnIdiom(el["description"].length)}</div>`
        l.style.listStyleType = "none"
        catList.appendChild(l)
        l.addEventListener('click', function () {
          reset(learn, null, null)
          period(el, el['name'], learn)

        })
      })
    } else {
      itr.forEach(function (el, inx, arr) {
        let quiz = true
        shuffle(itr[inx]['answer'], itr[inx]['description'], itr[inx]['examples'])
        let l = document.createElement('li')
        l.innerHTML = `${el['name']} <div style="color: black; font-size: calc(10px + 15 * (100vw/1600));">${el["description"].length} Идиом${returnIdiom(el["description"].length)}</div>`
        l.style.listStyleType = "none"
        catList.append(l)
        l.addEventListener('click', function () {
          reset(null, quiz, null)
          period(el, el['name'], null)

        })
      })
    }
  }
  learnBtn.onclick = () => {
    levels(learnBtn)
  }

  timerLess.onclick = () => {
    levels(timerLess)
  }
}

document.addEventListener('click', (e) => {
  
   if (e.target.closest('.titleAbout')) dropDown.classList.add('show')
   if (e.target.closest('.titleAbout')) dropDownLearn.classList.add('show')
 
   if (!about.contains(e.target)) dropDown.classList.remove('show')
   if (!cat.contains(e.target)) dropDownLearn.classList.remove('show')
 })

const url = "serveridioms.json"
fetch(url).then(
  (res) => res.json()).then(function (data) {
    localStorage.setItem("idioms", JSON.stringify(data))
    onOffLine(data)

  }).catch((e) => {
    onOffLine(JSON.parse(localStorage.getItem("idioms")))
  })