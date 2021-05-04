class Timer {
    _startMoment : Date = null;
    _pauseMoment : Date = null;
    _isRunning : boolean = false;
    _isPaused : boolean = false;
    _acumulatedPausedSeconds : number = 0;
    _seconds : number = null;

    constructor (seconds)
    {
        this._seconds = seconds;
    }

    start()
    {
        this._pauseMoment = null;
        this._acumulatedPausedSeconds = 0;
        this._startMoment = new Date();
        this._isRunning = true;
    }

    pause()
    {
        if (this._isPaused) {
            this._acumulatedPausedSeconds += this.timeDiff(this._pauseMoment);
            this._pauseMoment = null;
            this._isPaused = false;
        } else {
            this._pauseMoment = new Date();
            this._isPaused = true;
        }
    }

    reset()
    {
        this._pauseMoment = null;
        this._startMoment = null;
        this._isRunning = false;
        this._isPaused = false;
        this._acumulatedPausedSeconds = 0;
    }

    elapsedSeconds() : number
    {
        return this._seconds - this.remainingSeconds();
    }

    remainingSeconds() : number
    {
        let seconds = this._seconds - (this.timeDiff(this._startMoment) - this.calculatePausedTime());
        return seconds >= 0 ? seconds : 0;
    }

    calculatePausedTime() : number
    {
        return this._acumulatedPausedSeconds + ( this.isPaused() ? this.timeDiff(this._pauseMoment) : 0);
    }

    remainingTimeFormated() : string
    {
        let timeString = '';
        let d = new Date(0);

        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(this.remainingSeconds());

        if (d.getHours())
            timeString += ('0'+ d.getHours()).slice(-2) + ":";

        timeString += ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

        return timeString;
    }

    elapsedPercentual(normalized : boolean = false) : number
    {
        return ((this.elapsedSeconds() * 100) / this._seconds) / (normalized ? 100 : 1);
    }

    elapsedDeg() : string
    {
        return (360 * this.elapsedPercentual(true)) + "deg";
    }

    timeDiff(moment : Date) : number
    {
        if (!moment)
            return 0;
        return Math.abs((new Date().getTime() - moment.getTime()) / 1000 );
    }

    isPaused() : boolean
    {
        return this._isRunning && this._isPaused;
    }

    isRunning() : boolean
    {
        return this._isRunning && !this._isPaused;
    }

    isFinished() : boolean
    {
        return this.isRunning() && !this.isPaused() && this.elapsedSeconds() >= this._seconds;
    }
}