import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';
import { Button } from 'reactstrap';
import 'video-react/dist/video-react.css';

export default class VideoPlayer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            source: null,
            currentTime: 0,
            isPlaying: false,
            rotation: 0,
            startTime: 0,
            endTime: 0
        };

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.load = this.load.bind(this);
        this.changeCurrentTime = this.changeCurrentTime.bind(this);
        this.seek = this.seek.bind(this);
        this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.setMuted = this.setMuted.bind(this);
        this.jumpToOKN = this.jumpToOKN.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // subscribe state change
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }

    setMuted(muted) {
        return () => {
            this.player.muted = muted;

        };
    }

    handleStateChange(state) {
        this.setState({
            player: state
        });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    play() {
        this.player.play();
    }

    pause() {
        this.player.pause();
    }

    load() {
        this.player.load();
    }

    changeCurrentTime(seconds) {
        return () => {
            const { player } = this.player.getState();
            this.player.seek(player.currentTime + seconds);
        };
    }

    seek(seconds) {
        return () => {
            this.player.seek(seconds);
        };
    }

    changePlaybackRateRate(steps) {
        return () => {
            const { player } = this.player.getState();
            this.player.playbackRate = player.playbackRate + steps;
        };
    }

    changeVolume(steps) {
        return () => {
            const { player } = this.player.getState();
            this.player.volume = player.volume + steps;
        };
    }

    changeSource(name) {
        return () => {
            this.setState({
                source: this.props.source
            });
            this.player.load();
        };

    }

    jumpToOKN = (startTime, endTime) => {
        return () => {
            console.log("jump to OKN")
            if (!this.state.isPlaying) {
                this.player.seek(startTime);
                this.player.play();


                this.pauseTimeout = setTimeout(() => {
                    this.player.pause();
                    this.setState({ isPlaying: false });
                }, (endTime - startTime) * 1000);
                this.setState({ isPlaying: true });
            } else {
                clearTimeout(this.pauseTimeout);
                this.player.pause();
                this.setState({ isPlaying: false });
            }

        };
    }

    handleJumpToOKNSubmit = (event) => {
        event.preventDefault();

        const startTime = this.state.startTime;
        const endTime = this.state.endTime;
        console.log("Startime " + startTime + " EndTime:" + endTime)

        console.log("jump to OKN")
        if (!this.state.isPlaying) {
            this.player.seek(startTime);
            this.player.play();


            this.pauseTimeout = setTimeout(() => {
                this.player.pause();
                this.setState({ isPlaying: false });
            }, (endTime - startTime) * 1000);
            this.setState({ isPlaying: true });
        } else {
            clearTimeout(this.pauseTimeout);
            this.player.pause();
            this.setState({ isPlaying: false });
        }


    };

    rotateClockwise = () => {
        const { rotation } = this.state;
        this.setState({ rotation: rotation + 90 });
    }

    rotateCounterclockwise = () => {
        const { rotation } = this.state;
        this.setState({ rotation: rotation - 90 });
    }


    render() {
        const { rotation } = this.state;
        return (
            <div>

                <div>
                    <div style={{ transform: `rotate(${rotation}deg)` }}>
                        <Player
                            ref={player => {
                                this.player = player;
                            }}
                            autoPlay
                        >
                            <source src={this.props.Source} />
                            <ControlBar autoHide={true} />

                        </Player>
                    </div>
                    <div className="py-3">
                        <Button onClick={this.play} className="mr-3">
                            play()
                        </Button>
                        <Button onClick={this.pause} className="mr-3">
                            pause()
                        </Button>
                        <Button onClick={this.load} className="mr-3">
                            load()
                        </Button>
                    </div>

                    <form onSubmit={this.handleJumpToOKNSubmit}>
                        <label>
                            Start Time:
                            <input type="number" name="startTime" value={this.state.startTime} onChange={this.handleChange} />
                        </label>
                        <label>
                            End Time:
                            <input type="number" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Jump to OKN" />
                    </form>
                </div>

            </div >
        );
    }
}