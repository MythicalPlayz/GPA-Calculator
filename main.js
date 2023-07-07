function finalGradeToCredit(num){
    if (num >= 90)
    return 4
    if (num >= 85)
    return 3.7
    if (num >= 80)
    return 3.3
    if (num >= 75)
    return 3
    if (num >= 70)
    return 2.7
    if (num >= 65)
    return 2.4
    if (num >= 60)
    return 2.2
    if (num >= 50)
    return 2
   return 0
}

var cscheck = document.getElementById("cscheck")

function calculateGPA(){
    var terms = document.getElementsByClassName("terms")
    var gpas = []
    for (i = 0; i < terms.length;i++){
    var main = terms[i].querySelectorAll(".subjects")
    var tcredit = 0
    var thour = 0
    for (j = 0; j < main.length;j++){
    var grade, credit
    grade = main[j].getElementsByClassName("grade")[0].value
    var hour = main[j].getElementsByClassName("hour")[0].value
    if (grade === "" || hour === ""){
        alert("Missing Info was found!")
        return -1
    }
    grade = Math.abs(grade)
    if (!cscheck.checked)
    credit = finalGradeToCredit(grade)
    else
    credit = grade
    hour = Math.abs(hour)
    tcredit += credit * hour
    thour += hour
    }
    gpas.push(parseFloat((tcredit / thour).toFixed(2)))
}

var fgpa = 0
for (x = 0; x < gpas.length;x++){
    fgpa += gpas[x]
}
    console.log(fgpa)
 fgpa = parseFloat((fgpa / gpas.length).toFixed(2))
 gpas.push(fgpa)
 return gpas
}
const Button = document.getElementsByClassName("button")[0]
Button.onclick = function(){
var r = calculateGPA()
if (r === -1) return
var divs = document.getElementsByClassName("terms")
for (x = 0; x < divs.length;x++){
    divs[x].getElementsByClassName("igpa")[0].textContent = `Semester GPA: ${r[x]}`
}
    document.getElementsByClassName("fgpa")[0].textContent = `Final GPA: ${r[divs.length]}`
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
    var v = clone.getElementsByClassName("subjects")
    for (x = 1; x < v.length;x++){
        v[x].remove()
    }
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
    }
    else
    {
        document.body.classList.remove("body-dark")
        var c = document.getElementsByClassName("terms")
        for (i = 0; i < c.length;i++)
        c[i].classList.remove("terms-dark")
    }
    isLight = !isLight
}

function cscheckevent() {
    if (cscheck.checked) {
        var t = document.getElementsByClassName("sub-content")
        for (x = 0; x < t.length;x++){
            t[x].innerHTML = t[x].innerHTML.replace("Final Grade","Grade Credit")
        }
    }
    else {
        var t = document.getElementsByClassName("sub-content")
        for (x = 0; x < t.length;x++){
            t[x].innerHTML = t[x].innerHTML.replace("Grade Credit","Final Grade")
        }
    }
}