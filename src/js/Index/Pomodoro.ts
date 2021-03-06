class Pomodoro {

    _focus: ISection;
    _shortBreak: ISection;
    _longBreak: ISection;
    _currentSectionID : number = 1;
    _timer : Timer = null;
    _onTick : Function = null;
    _onFinish : Function = null;

    constructor (focus: ISection, shortBreak: ISection, longBreak: ISection, onTick: Function = null, onFinish: Function = null)
    {
        this._focus = focus;
        this._shortBreak = shortBreak;
        this._longBreak = longBreak;
        this._onTick = onTick;
        this._onFinish = onFinish;
        this._timer = new Timer(this.getSection().seconds);
        this.tick();
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
        (window as any).pomodoroTick = setInterval( () => {
            if (this.timer().isFinished()){
                this.next();
                if (this._onFinish != null)
                    this._onFinish();
            }
            if (this._onTick != null)
                this._onTick();
        }, 100);        
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
        this._timer = new Timer(this.getSection().seconds);
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