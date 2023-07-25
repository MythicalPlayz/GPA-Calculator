const calcdrop = document.getElementById("calcdrop")

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


function letterGradeToCredit(value){

    if (value == "A+")
        return 4

    if (value == "A")
        return 3.7

    if (value == "B+")
        return 3.3

    if (value == "B")
        return 3

    if (value == "C+")
        return 2.7

    if (value == "C")
        return 2.4

    if (value == "D+")
        return 2.2

    if (value == "D")
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
                let grade, credit, hour
                if (calcdrop.value !== "Grade"){
                    grade = subjects[j].getElementsByClassName("grade")[0].value
                    hour = subjects[j].getElementsByClassName("hour")[0].value

                    if (grade === "" || hour === ""){
                        console.debug("Getting GPA: Failed")
                        alert(`Missing Info was found! at Term ${i + 1}, Course ${j + 1}`)
                        return -1
                    }

                grade = Math.abs(grade)

                if (calcdrop.value === "Mark")
                    credit = finalGradeToCredit(grade)
                else
                    credit = grade

                }

                else {
                    let grade = subjects[j].getElementsByClassName("dropdownG")[0].value
                    credit = letterGradeToCredit(grade)

                    hour = subjects[j].getElementsByClassName("hour")[0].value

                    if (hour === ""){
                        console.debug("Getting GPA: Failed")
                        alert(`Missing Info was found! at Term ${i + 1}, Course ${j + 1}`)
                        return -1
                    }

                }

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


function getGPA(){
    let result = calculateGPA()
    if (result === -1) return
    let terms = getTerms()

    for (x = 0; x < terms.length;x++){
        terms[x].getElementsByClassName("igpa")[0].textContent = `Semester GPA: ${result[x]}`
    }

    document.getElementsByClassName("fgpa")[0].textContent = `Final GPA: ${result[terms.length]}    Result: ${gpaToResult(result[terms.length])}`
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

    while (subjects.length > 1)
        subjects[subjects.length - 1].remove()

    let igpa = cloneSemester.getElementsByClassName("igpa")[0]
    igpa.textContent = "Semester GPA: N/A"
    console.debug("Adding Semester")
}

function toggleTheme(){

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

calcdrop.onchange = function(){
    let option = calcdrop.value
    let gradesTextLabel = document.getElementsByClassName("grade")
    let dropdownOption = document.getElementsByClassName("dropdownG")

    if (option === "Grade"){
        let textlabel = document.getElementsByClassName("changeable-calc")
        

        for (x = 0; x < Math.min(gradesTextLabel.length,dropdownOption.length);x++){
            dropdownOption[x].classList.remove("off")
            gradesTextLabel[x].classList.add("off")
        }

        for (x = 0; x < textlabel.length;x++)
            textlabel[x].innerHTML = "Grade"

        console.debug("Switched Settings: Use Grade")
    }

    else {
        
        for (x = 0; x < Math.min(gradesTextLabel.length,dropdownOption.length);x++){
            dropdownOption[x].classList.add("off")
            gradesTextLabel[x].classList.remove("off")
        }

        if (option === "Credit") {
            let textlabel = document.getElementsByClassName("changeable-calc")

            for (x = 0; x < textlabel.length;x++)
                textlabel[x].innerHTML = "Grade Credit"

            console.debug("Switched Settings: Use Grade Credit")
        }

        else {
            let textlabel = document.getElementsByClassName("changeable-calc")
            
            for (x = 0; x < textlabel.length;x++)
                textlabel[x].innerHTML = "Final Mark"

            console.debug("Switched Settings: Use Final Mark")
        }

    }

}


decreaseSemestersButton.classList.add("disabled")


function incCourse(parentdiv){
    const cloneCourse = curdiv.cloneNode(true)
    parentdiv.appendChild(cloneCourse)
    var textbox = cloneCourse.getElementsByClassName("textbox")

    for (x = 0; x < textbox.length;x++)
        textbox[x].value = ""
    
    parentdiv.getElementsByClassName("lowerbuttonc")[0].classList.remove("disabled");
    console.debug("Adding Course")
}


function decCourse(parentdiv,but){
    let subjects = parentdiv.getElementsByClassName("subjects")

    if (subjects.length === 1) {
        but.classList.add("disabled");
        return 
    }

    if (subjects.length === 2)
        but.classList.add("disabled");

    subjects[subjects.length - 1].remove()
    console.debug("Removing Course")
}

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', function(e) {
    deferredPrompt = e;
    document.getElementById("installApp").classList.remove("off");
    e.userChoice.then(function(choiceResult){
        console.log(choiceResult.outcome);
        if(choiceResult.outcome == 'dismissed'){
            console.log('User cancelled home screen install');
        }else{
            console.log('User added to home screen');
        }
    });
});



window.addEventListener('load', () => {
    //select the button with ID pwaAppInstallBtn
    const pwaAppInstallBtn = document.getElementById("installApp");
    pwaAppInstallBtn.addEventListener('click', async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        } else {
            console.log("deferred prompt is null [Website cannot be installed]")
        }
    });
})

if ('DeviceOrientationEvent' in window) {
    const availableScreenWidth = screen.availWidth;
    const availableScreenHeight = screen.availHeight;

    if (availableScreenWidth > availableScreenHeight){
        if (screen.orientation && screen.orientation.lock){
            try {
            screen.orientation.lock('landscape')
            }
            catch (e) {}
        }
    }
}
