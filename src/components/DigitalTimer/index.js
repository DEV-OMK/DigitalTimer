// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor() {
    super()
    this.state = {
      isTimerRunning: false,
      timerLimit: 25,
      minutes: 25,
      seconds: 0,
      isKeyEnabled: true,
    }
  }

  tick = () => {
    this.setState(prevState => {
      const {minutes, seconds} = this.state
      if (minutes === 0 && seconds === 0) {
        clearInterval(this.timerId)
        return {
          isTimerRunning: false,
          timerLimit: 25,
          minutes: 25,
          seconds: 0,
          isKeyEnabled: true,
        }
      }
      return {
        seconds: prevState.seconds === 0 ? 59 : prevState.seconds - 1,
        minutes:
          prevState.seconds === 0 ? prevState.minutes - 1 : prevState.minutes,
      }
    })
  }

  playOrPause = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.timerId = setInterval(this.tick, 1000)
    } else if (this.timerId !== null) {
      clearInterval(this.timerId)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
      isKeyEnabled: false,
    }))
  }

  reset = () => {
    if (this.timerId !== null) {
      clearInterval(this.timerId)
    }
    this.setState({
      isTimerRunning: false,
      timerLimit: 25,
      minutes: 25,
      seconds: 0,
      isKeyEnabled: true,
    })
  }

  decreaseTimeLimit = () => {
    const {isKeyEnabled, timerLimit} = this.state
    if (isKeyEnabled && timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
        minutes: prevState.timerLimit - 1,
        seconds: 0,
      }))
    }
  }

  increaseTimeLimit = () => {
    const {isKeyEnabled} = this.state
    if (isKeyEnabled) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit + 1,
        minutes: prevState.timerLimit + 1,
        seconds: 0,
      }))
    }
  }

  render() {
    const {isTimerRunning, timerLimit, minutes, seconds} = this.state

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <h1 className="title">Digital Timer</h1>
          <div className="card">
            <div className="timer-background">
              <div className="timer-container">
                <h1 className="time">
                  {minutes > 9 ? minutes : `0${minutes}`}:
                  {seconds > 9 ? seconds : `0${seconds}`}
                </h1>
                <p className="timer-status">
                  {isTimerRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="settings-container">
              <div className="control-buttons-container">
                {!isTimerRunning && (
                  <button
                    type="button"
                    className="icon-button"
                    onClick={this.playOrPause}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      className="icon"
                      alt="play icon"
                    />
                    <p className="button-label">Start</p>
                  </button>
                )}
                {isTimerRunning && (
                  <button
                    type="button"
                    className="icon-button"
                    onClick={this.playOrPause}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      className="icon"
                      alt="pause icon"
                    />
                    <p className="button-label">Pause</p>
                  </button>
                )}
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.reset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icon"
                    alt="reset icon"
                  />
                  <p className="button-label">Reset</p>
                </button>
              </div>
              <p className="setting-caption">Set Timer Limit</p>
              <div className="limit-setting-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.decreaseTimeLimit}
                >
                  -
                </button>
                <p className="timer-limit">{timerLimit}</p>
                <button
                  type="button"
                  className="button"
                  onClick={this.increaseTimeLimit}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
