const csCheck = document.getElementById("cscheck")
const gpaButton = document.getElementsByClassName("button")[0]

const minSem = 1
const maxSem = 12

const decreaseSemestersButton = document.getElementsByClassName("lowerbutton")[0]
const increaseSemestersButton = document.getElementsByClassName("upperbutton")[0]

const semdiv = getTerms()[0]
var semcount = 1

const curdiv = semdiv.getElementsByClassName("subjects")[0]

var isLight = true

function gpaToResult(gpa){
    if (gpa >= 3.5)
    return "Excellent"
    if (gpa >= 3.0)
    return "Very Good"
    if (gpa >= 2.5)
    return "Good"
    if (gpa >= 2)
    return "Passable"
    if (gpa >= 1.5)
    return "Weak"
    return "Very Week"
}


function finalGradeToCredit(grade){
    if (grade >= 90)
    return 4
    if (grade >= 85)
    return 3.7
    if (grade >= 80)
    return 3.3
    if (grade >= 75)
    return 3
    if (grade >= 70)
    return 2.7
    if (grade >= 65)
    return 2.4
    if (grade >= 60)
    return 2.2
    if (grade >= 50)
    return 2
   return 0
}


function getTerms(){
    return document.getElementsByClassName("terms")
}


function calculateGPA(){
    let terms = getTerms()
    let gpas = []

    for (i = 0; i < terms.length;i++){
        let subjects = terms[i].querySelectorAll(".subjects")
        let tcredit = 0
        let thour = 0

            for (j = 0; j < subjects.length;j++){
                let grade, credit
                grade = subjects[j].getElementsByClassName("grade")[0].value
                let hour = subjects[j].getElementsByClassName("hour")[0].value

                if (grade === "" || hour === ""){
                    console.debug("Getting GPA: Failed")
                    alert("Missing Info was found!")
                    return -1
                }

        grade = Math.abs(grade)

        if (!csCheck.checked)
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

    fgpa = parseFloat((fgpa / gpas.length).toFixed(2))
    gpas.push(fgpa)
    console.debug("Getting GPA: Success")
    return gpas

}



gpaButton.onclick = function(){
    let result = calculateGPA()
    if (result === -1) return
    let terms = getTerms()

    for (x = 0; x < terms.length;x++){
        terms[x].getElementsByClassName("igpa")[0].textContent = `Semester GPA: ${result[x]}`
    }

    document.getElementsByClassName("fgpa")[0].textContent = `Final GPA: ${result[terms.length]}    Result: ${gpaToResult(result[terms.length])}`
}


function increaseCourses(parent,decreaseButton){
    const cloneCourse = curdiv.cloneNode(true)
    parent.appendChild(cloneCourse)
    var textbox = cloneCourse.getElementsByClassName("textbox")
    console.debug("Adding Course")

    for (x = 0; x < textbox.length;x++)
        textbox[x].value = ""

    decreaseButton.classList.remove("disabled");
}


function lowerCourses(parent,decreaseButton){
    let subjects = parent.getElementsByClassName("subjects")

    if (subjects.length === 1) {
        decreaseButton.classList.add("disabled");
        return 
    }

    if (subjects.length === 2)
        decreaseButton.classList.add("disabled");

    subjects[subjects.length - 1].remove()
    console.debug("Removing Course")
}


decreaseSemestersButton.onclick = function() {
    increaseSemestersButton.classList.remove("disabled")

    if (semcount == minSem) {
        decreaseSemestersButton.classList.add("disabled")
        return
    }

    semcount -= 1
    
    if (semcount === minSem)
        decreaseSemestersButton.classList.add("disabled")

    let terms = getTerms()
    terms[terms.length - 1].remove()
    console.debug("Removing Semester")
}


increaseSemestersButton.onclick = function() {
    decreaseSemestersButton.classList.remove("disabled")

    if (semcount == maxSem) {
        increaseSemestersButton.classList.add("disabled")
        return
    }

    semcount += 1

    if (semcount == maxSem)
        increaseSemestersButton.classList.add("disabled")

    const cloneSemester = semdiv.cloneNode(true)
    document.getElementsByClassName("main-container")[0].appendChild(cloneSemester)
    cloneSemester.innerHTML = cloneSemester.innerHTML.replace("Semester 1",`Semester ${semcount}`)
    let subjects = cloneSemester.getElementsByClassName("subjects")

    for (x = 1; x < subjects.length;x++){
        subjects[x].remove()
    }

    let terms = getTerms()
    terms[terms.length - 1].getElementsByClassName("upperbuttonc")[0].onclick = function() {increaseCourses(cloneSemester, terms[terms.length - 1].getElementsByClassName("lowerbuttonc")[0])}
    terms[terms.length - 1].getElementsByClassName("lowerbuttonc")[0].onclick = function() {lowerCourses(cloneSemester,terms[terms.length - 1].getElementsByClassName("lowerbuttonc")[0])}
    lowerCourses(cloneSemester,terms[terms.length - 1].getElementsByClassName("lowerbuttonc")[0])
    let igpa = cloneSemester.getElementsByClassName("igpa")[0]
    igpa.textContent = "Semester GPA: N/A"
    console.debug("Adding Semester")
}


document.getElementsByClassName("switch-theme")[0].onclick = function(){

    if (isLight) {
        document.body.classList.add("body-dark")
        let terms = getTerms()

        for (i = 0; i < terms.length;i++)
            terms[i].classList.add("terms-dark")

        console.debug("Switched Theme: Dark")
    }

    else
    {
        document.body.classList.remove("body-dark")
        let terms = getTerms()

        for (i = 0; i < terms.length;i++)
            terms[i].classList.remove("terms-dark")

        console.debug("Switched Theme: Light")
    }
    isLight = !isLight
}


function cscheckevent() {

    if (csCheck.checked) {
        let subContents = document.getElementsByClassName("sub-content")

        for (x = 0; x < subContents.length;x++)
            subContents[x].innerHTML = subContents[x].innerHTML.replace("Final Mark","Grade Credit")

        console.debug("Switched Settings: Use Grade Credit")

    }

    else {
        let subContents = document.getElementsByClassName("sub-content")

        for (x = 0; x < subContents.length;x++)
            subContents[x].innerHTML = subContents[x].innerHTML.replace("Grade Credit","Final Mark")
        
        console.debug("Switched Settings: Use Final Marks")
    }
   
}


semdiv.getElementsByClassName("upperbuttonc")[0].onclick = function() {increaseCourses(semdiv,semdiv.getElementsByClassName("lowerbuttonc")[0])}
semdiv.getElementsByClassName("lowerbuttonc")[0].onclick = function() {lowerCourses(semdiv,semdiv.getElementsByClassName("lowerbuttonc")[0])}
lowerCourses(semdiv,semdiv.getElementsByClassName("lowerbuttonc")[0])
decreaseSemestersButton.classList.add("disabled")