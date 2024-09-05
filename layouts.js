let content = document.querySelector('.content')

//create Main menu
const mainMenu = document.createElement('div')
mainMenu.setAttribute('class', 'mainMenu')

const learnBtn = document.createElement('div')
learnBtn.setAttribute('class', 'learn')
learnBtn.innerText ="Содержание"

var myHtml = '<div class="cont">' +
  '                <div class="boxx">' +
  '                    <span style="--i:2;" >成语师傅</span>' +
  '                    <span style="--i:4;" >成语师傅</span>' +
  '                    <span style="--i:6;" >成语师傅</span>' +
  '                    <span style="--i:8;" >成语师傅</span>' +
  '                    <span style="--i:10;">成语师傅</span>' +
  '                    <span style="--i:12;">成语师傅</span>' +
  '                    <span style="--i:14;">成语师傅</span>' +
  '                    <span style="--i:16;">成语师傅</span>' +
  '                </div>' +
  '            </div>';
const selectMode = "Chengyu Shifu"
const catList = document.createElement('div')
catList.setAttribute("id", "catList")
catList.innerHTML=`${selectMode}${myHtml}`

const timerLess = document.createElement('div')
timerLess.setAttribute('class', 'learn')
timerLess.innerText ="Викторина"

const btns = [learnBtn, timerLess]

mainMenu.append(learnBtn, timerLess, catList)

//create header
const containerGame = document.createElement('div')
containerGame.setAttribute("class", "containerGame")

const menuBtn = document.createElement('div')
menuBtn.setAttribute("class", "menuBtn")
menuBtn.innerText = "МЕНЮ"

menuBtn.addEventListener('click', function () {
  reset(null, null, catList)
})

const catWrp = document.createElement('div')
catWrp.setAttribute("class", "menuBtn")

const about = document.createElement('div')
about.setAttribute("class", "titleAbout")

const dropDown = document.createElement('div')
dropDown.setAttribute("class", "dropDown")

//about.append(dropDown)
catWrp.append(about, dropDown)

const header = document.createElement('div')
header.setAttribute("class", "header")
header.append(menuBtn, catWrp)

const desc_cont = document.createElement('div')
desc_cont.setAttribute("class", "desript-container")

const rWr = document.createElement('div')
rWr.setAttribute("class", "rightWrong")

const notGsd = document.createElement('div')
notGsd.setAttribute("id", "notGuessed")
notGsd.innerHTML = "Wrong"
const spanW = document.createElement('button')
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
const spanR = document.createElement('button')
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

const wsl = document.createElement('div')
wsl.setAttribute("id", "wordSpotLight")
const charLine = document.createElement('div')
charLine.setAttribute("id", "charLine")
const pinyinLine = document.createElement('div')
pinyinLine.setAttribute("id", "pinyinLine")
wsl.append(charLine, pinyinLine)

const kbd = document.createElement('div')
kbd.setAttribute("id", "keyboard")
containerGame.append(header, desc_cont, rWr, rightWrong2, wsl, kbd)
containerGame.remove()

//learn page
const wrap = document.createElement('div')
wrap.setAttribute("class", "wrapper")

const head = document.createElement('div')
head.setAttribute("class", "header")

const mB = document.createElement('div')
mB.setAttribute("class", "menuBtn")
mB.innerText="МЕНЮ"

const cat = document.createElement('div')
cat.setAttribute("class", "titleAbout")
const dropDownLearn = document.createElement('div')
dropDownLearn.setAttribute("class", "dropDown")

const catWrap = document.createElement('div')
catWrap.setAttribute("class", "menuBtn")

catWrap.append(cat, dropDownLearn)
head.append(mB, catWrap)

const stDsc = document.createElement('div')
stDsc.setAttribute("class", "desript-container")

const dir = document.createElement('div')
dir.setAttribute("class", "direction")

const prev = document.createElement('div')
prev.setAttribute("class", "menuOpts")
prev.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-9 0 45 25"><title>Artboard-35</title><g id="Left-2" data-name="Left"><polygon points="24 12.001 2.914 12.001 8.208 6.706 7.501 5.999 1 12.501 7.5 19.001 8.207 18.294 2.914 13.001 24 13.001 24 12.001" style="fill:#232326"/></g></svg>`
const nxt = document.createElement('div')
nxt.setAttribute("class", "menuOpts")
nxt.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11 0 45 25"><title>Artboard-34</title><g id="Right-2" data-name="Right"><polygon points="17.5 5.999 16.793 6.706 22.086 11.999 1 11.999 1 12.999 22.086 12.999 16.792 18.294 17.499 19.001 24 12.499 17.5 5.999" style="fill:#232326"/></g></svg>`

dir.append(prev, nxt)

wrap.append(head, stDsc, dir)

mB.onclick = ()=>{
  reset(null, null, catList)
}

content.appendChild(mainMenu)
document.body.append(content)