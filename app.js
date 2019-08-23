const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    const sounds = document.querySelectorAll(".sound-picker button ");
    const timedisplay = document.querySelector(".time-display ");
    const timeselect = document.querySelectorAll(".time-select button ");
    const outlinelength = outline.getTotalLength();
    console.log(outlinelength);

    //duration
    let fakeduration = 600;
    outline.style.strokeDasharray = outlinelength;
    outline.style.strokeDashoffset = outlinelength;

    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkplaying();

        });
    });

    play.addEventListener('click', () => {
        checkplaying(song);
    });

    //time select for each option
    timeselect.forEach(option => {
        option.addEventListener("click", function() {
            fakeduration = this.getAttribute("data-time");
            timedisplay.textContent `${Math.floor(fakeduration/60)}:${Math.floor(fakeduration%60)}`;

        });
    });



    const checkplaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
        song.ontimeupdate = () => {
            let currentTime = song.currentTime;
            let elapsed = currentTime;
            let seconds = Math.floor(elapsed % 60);
            let minutes = Math.floor(elapsed / 60);



            // let dummy = 
            // let progress = outlinelength - (currentTime - fakeduration) * outlinelength;
            // outline.style.strokeDashoffset = progress;
            outline.style.strokeDashoffset = elapsed;


            //timedisplay 
            timedisplay.textContent = `${minutes}:${seconds}`;

            if (currentTime >= fakeduration) {
                song.pause();
                song.currentTime = 0;
                play.src = "./svg/play.svg";
                video.pause();

            }

        }

    }

}

app();