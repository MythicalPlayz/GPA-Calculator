function calculateGPA(){
    var terms = document.getElementsByClassName("terms")
    var gpas = []
    for (i = 0; i < terms.length;i++){
    var main = terms[i].querySelectorAll(".subjects")
    var tcredit = 0
    var thour = 0
    for (j = 0; j < main.length;j++){
    var credit = main[j].getElementsByClassName("credit")[0].value
    var hour = main[j].getElementsByClassName("hour")[0].value
    if (credit === "" || hour === ""){
        return -1
    }
    credit = Math.abs(credit)
    hour = Math.abs(hour)
    tcredit += credit * hour
    thour += hour
    }
    gpas.push((tcredit / thour).toFixed(2))
}
const l = gpas.length
var fgpa = 0
while (gpas.length > 0){
    fgpa += parseFloat(gpas[gpas.length - 1])
    gpas.pop()
}
 fgpa = (fgpa / l).toFixed(2)
return fgpa
}
const Button = document.getElementsByClassName("button")[0]
Button.onclick = function(){
var r = calculateGPA()
Button.textContent = r
}

const minSem = 1
const maxSem = 12

const LowBut = document.getElementsByClassName("lowerbutton")[0]
const HigBut = document.getElementsByClassName("upperbutton")[0]

var semdiv = document.getElementsByClassName("terms")[0]
var semcount = 1

function increaseCourses(parent,but){
    const clone = curdiv.cloneNode(true)
    parent.appendChild(clone)
    but.classList.remove("disabled");
}

function lowerCourses(parent,but){
    var c = parent.getElementsByClassName("subjects")
    if (c.length === 1) {
        but.classList.add("disabled");
        return }
    if (c.length === 2)
    but.classList.add("disabled");
    c[c.length - 1].remove()
}

LowBut.onclick = function() {
    HigBut.classList.remove("disabled")
    if (semcount == minSem) {
        LowBut.classList.add("disabled")
    return}
    semcount -= 1
    if (semcount === minSem)
    LowBut.classList.add("disabled")
    var c = document.getElementsByClassName("terms")
    c[c.length - 1].remove()
}

HigBut.onclick = function() {
    LowBut.classList.remove("disabled")
    if (semcount == maxSem) {
        HigBut.classList.add("disabled")
        return}
    semcount += 1
    if (semcount == maxSem)
        HigBut.classList.add("disabled")
    const clone = semdiv.cloneNode(true)
    document.getElementsByClassName("main-container")[0].appendChild(clone)
    clone.innerHTML = clone.innerHTML.replace("Semester 1",`Semester ${semcount}`)
    var c = document.getElementsByClassName("terms")
    c[c.length - 1].getElementsByClassName("upperbuttonc")[0].onclick = function() {increaseCourses(clone, c[c.length - 1].getElementsByClassName("lowerbuttonc")[0])}
    c[c.length - 1].getElementsByClassName("lowerbuttonc")[0].onclick = function() {lowerCourses(clone,c[c.length - 1].getElementsByClassName("lowerbuttonc")[0])}
    lowerCourses(clone,c[c.length - 1].getElementsByClassName("lowerbuttonc")[0])
}

var curdiv = semdiv.getElementsByClassName("subjects")[0]

semdiv.getElementsByClassName("upperbuttonc")[0].onclick = function() {increaseCourses(semdiv,semdiv.getElementsByClassName("lowerbuttonc")[0])}
semdiv.getElementsByClassName("lowerbuttonc")[0].onclick = function() {lowerCourses(semdiv,semdiv.getElementsByClassName("lowerbuttonc")[0])}
lowerCourses(semdiv,semdiv.getElementsByClassName("lowerbuttonc")[0])
LowBut.classList.add("disabled")


var isLight = true
var toggle = document.getElementsByClassName("switch-theme")[0].onclick = function(){
    if (isLight) {
        document.body.classList.add("body-dark")
        var c = document.getElementsByClassName("terms")
        for (i = 0; i < c.length;i++)
        c[i].classList.add("terms-dark")
        document.getElementById("Capa_1").style.fill = "#ffffff"
    }
    else
    {
        document.body.classList.remove("body-dark")
        var c = document.getElementsByClassName("terms")
        for (i = 0; i < c.length;i++)
        c[i].classList.remove("terms-dark")
        document.getElementById("Capa_1").style.fill = "#000000"
    }
    isLight = !isLight
}