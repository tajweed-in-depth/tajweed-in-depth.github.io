const imgs = document.getElementById('imgs')

const img = document.querySelectorAll('#imgs img')

let idx = 0

let interval = setInterval(run, 5000)

function run() {
    idx++
    changeImage()
}

function changeImage() {
    if(idx > img.length - 1) {
        idx = 0
    } else if(idx < 0) {
        idx = img.length - 1
    }

    imgs.style.transform = `translateX(${-idx * 316}px)`
}

function resetInterval() {
    clearInterval(interval)
    interval = setInterval(run, 5000)
}
