class Pomodoro {

    _focus: ISection;
    _shortBreak: ISection;
    _longBreak: ISection;
    _currentSectionID : number = 1;
    _timer : Timer = null;
    _onTick : Function = null;

    constructor (focus: ISection, shortBreak: ISection, longBreak: ISection, onTick: Function = null)
    {
        this._focus = focus;
        this._shortBreak = shortBreak;
        this._longBreak = longBreak;

        this._timer = new Timer(this.getSection());
    }

    currentPomodoro() : number
    {
        return Math.floor( this._currentSectionID / 10 );
    }

    getSection(customSectionID : number = null) : ISection
    {
        let sectionID = customSectionID ? customSectionID : this._currentSectionID;
        return sectionID % 10 == 0 ? this._longBreak : (sectionID % 2 === 0 ? this._shortBreak : this._focus);
    }

    tick() {
        if (this._onTick == null)
            return;
        (window as any).pomodoroTick = setInterval( () => {
            this._onTick();
        }, 500);
    }

    start()
    {
        
        this._timer.start();
    }

    pause()
    {
        this._timer.pause();
    }

    reset() : void
    {
        this._timer.reset();
    }

    next()
    {
        this._currentSectionID++;
        this.reset();
    }

    isPaused() : boolean
    {
        return this._timer.isPaused();
    }

    isRunning() : boolean
    {
        return this._timer.isRunning();
    }

    remainingTime() : string
    {
        return this._timer.remainingTimeFormated();
    }

    timer() : Timer
    {
        return this._timer;
    }

    currentSectionID() : number
    {
        return this._currentSectionID;
    }
}