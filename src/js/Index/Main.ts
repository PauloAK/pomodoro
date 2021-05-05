class Main {
    originalTitle : string = document.getElementsByTagName('title')[0].innerText.trim();
    onTick : Function = () => {
        this.updateUI();
    };
    onFinish : Function = () => {
        this.playAlarm();
        this.notifyEndSection();
        window.setTimeout( () => {
            this.pomodoro.start();
        }, 1000);
    };
    focusSection : ISection = <ISection>{
        identifier: 'focus',
        seconds: .25 * 60,
        label: 'Focus',
        title: 'Focus Time!'
    };
    shortBreakSection : ISection = <ISection>{
        identifier: 'short-break',
        seconds: .5 * 60,
        label: 'Short Break',
        title: 'Take a Short Break!'
    };
    longBreakSection : ISection = <ISection>{
        identifier: 'long-break',
        seconds: .15 * 60,
        label: 'Long Break',
        title: 'Take a Long Break!'
    };
    pomodoro = new Pomodoro(this.focusSection, this.shortBreakSection, this.longBreakSection, this.onTick, this.onFinish);

    updateUI(): void
    {
        this.updateTitle();
        this.updateTimerText();
        this.updateProgressBars();
    }

    updateTitle() : void
    {
        let remainingTime = this.pomodoro.remainingTime();
        let setTitle : Function = (text : string) => {
            (<HTMLElement>document.getElementsByTagName('title')[0]).innerText = text;
        }
        let section : ISection = this.pomodoro.getSection();
        if (this.pomodoro.isRunning()) {
            setTitle(`🕑 ${remainingTime} - ${section.title} | ${this.originalTitle}`);
        } else {
            if (this.pomodoro.isPaused()) {
                setTitle(`⏸️ ${remainingTime} [Paused] - ${section.title} | ${this.originalTitle}`);
            } else {
                setTitle(this.originalTitle);
            }
        }
    }

    updateProgressBars() : void
    {
        let setRotationProgress : Function = (deg : string) => {
            (<HTMLElement>document.getElementsByClassName('timer')[0]).style.setProperty('--rotation', deg);
        }
        let setBreadcrumbProgress : Function = () : void => {
            let currentLoopProgress = this.pomodoro.timer().elapsedPercentual();
            let currentSection = this.pomodoro.getSection();
            let currentSectionID = this.pomodoro.currentSectionID();
            (<HTMLElement>document.getElementsByClassName('timer')[0]).classList.value = `timer ${currentSection.identifier}`;
            switch (currentSection) {
                case this.focusSection:
                    if ((currentSectionID + 1) % 10 == 0) {
                        (<HTMLElement>document.getElementById('labelFocus2')).style.setProperty('--fill', `${currentLoopProgress}%`);
                        (<HTMLElement>document.getElementById('labelFocus2')).classList.value = 'label active';

                        (<HTMLElement>document.getElementById('labelFocus')).style.setProperty('--fill', `100%`);
                        (<HTMLElement>document.getElementById('labelFocus')).classList.value = 'label completed';

                        (<HTMLElement>document.getElementById('labelShort')).style.setProperty('--fill', `100%`);
                        (<HTMLElement>document.getElementById('labelShort')).classList.value = 'label completed';
                    } else {
                        (<HTMLElement>document.getElementById('labelFocus')).style.setProperty('--fill', `${currentLoopProgress}%`);
                        (<HTMLElement>document.getElementById('labelFocus')).classList.value = 'label active';

                        (<HTMLElement>document.getElementById('labelShort')).style.setProperty('--fill', `0%`);
                        (<HTMLElement>document.getElementById('labelShort')).classList.value = 'label';

                        (<HTMLElement>document.getElementById('labelFocus2')).style.setProperty('--fill', `0%`);
                        (<HTMLElement>document.getElementById('labelFocus2')).classList.value = 'label';
                    }

                    (<HTMLElement>document.getElementById('labelLong')).style.setProperty('--fill', `0%`);
                    (<HTMLElement>document.getElementById('labelLong')).classList.value = 'label';
                    break;
                case this.shortBreakSection:
                    (<HTMLElement>document.getElementById('labelFocus')).style.setProperty('--fill', `100%`);
                    (<HTMLElement>document.getElementById('labelFocus')).classList.value = 'label completed';
                    (<HTMLElement>document.getElementById('labelShort')).style.setProperty('--fill', `${currentLoopProgress}%`);
                    (<HTMLElement>document.getElementById('labelShort')).classList.value = 'label active';
                    (<HTMLElement>document.getElementById('labelLong')).style.setProperty('--fill', `0%`);
                    (<HTMLElement>document.getElementById('labelLong')).classList.value = 'label';
                    break;
                case this.longBreakSection:
                    (<HTMLElement>document.getElementById('labelFocus')).style.setProperty('--fill', `100%`);
                    (<HTMLElement>document.getElementById('labelFocus')).classList.value = 'label completed';
                    (<HTMLElement>document.getElementById('labelShort')).style.setProperty('--fill', `100%`);
                    (<HTMLElement>document.getElementById('labelShort')).classList.value = 'label completed';
                    (<HTMLElement>document.getElementById('labelFocus2')).style.setProperty('--fill', `100%`);
                    (<HTMLElement>document.getElementById('labelFocus2')).classList.value = 'label completed';
                    (<HTMLElement>document.getElementById('labelLong')).style.setProperty('--fill', `${currentLoopProgress}%`);
                    (<HTMLElement>document.getElementById('labelLong')).classList.value = 'label active';
                    break;
            }
        }
        setRotationProgress(this.pomodoro.timer().elapsedDeg());
        setBreadcrumbProgress(this.pomodoro.timer().elapsedPercentual());
    }

    updateTimerText() : void
    {
        (<HTMLElement>document.getElementsByClassName('clock')[0]).innerText = this.pomodoro.remainingTime();
    }

    playAlarm()
    {
        var audio = new Audio('/audio/alarm.mp3');
        audio.play();
    }

    notifyEndSection()
    {
        let endedSection = this.pomodoro.getSection( this.pomodoro.currentSectionID() - 1 );
        let currentSection = this.pomodoro.getSection();

        new Notification(`${endedSection.label} [Completed]`, {
            body: `${currentSection.title} ${currentSection.seconds/60} minutes`
        });
    }
}