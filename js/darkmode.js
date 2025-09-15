let darkmode = localStorage.getItem('dark')
const switch_button = document.getElementById("theme_switch")

const enableDarkmode = () => {
    document.body.classList.add('dark')
    localStorage.setItem('darkmode' , 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('dark')
    localStorage.setItem('darkmode', null)
}

if(darkmode === 'avtive') enableDarkmode()

switch_button.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
}) 