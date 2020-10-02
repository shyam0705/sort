import React from 'react';
import { Component } from 'react';
import styled, { css } from 'styled-components';
import { bubble } from './algorithms/bubbleSort.js';
import { Button, Row, ButtonGroup } from 'reactstrap';
import { say } from './helper/speech.js';
import AlgoInfo from './helper/algoInfo.js';
import { BubbleSortDesc } from './helper/bubbleDesc.js';
import { Bars } from './helper/bars.js';
import Display from './helper/displayText.js';
import { Container } from './helper/container.js';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import ControlPannel from './helper/ControlPannel.js';
class BubbleMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            currentIndex: null,
            comparingIndex: null,
            comparingText: "",
            swapText: "",
            sorted: 100,
            play: false,
            voice: false,
   
        }
    }
    componentDidMount() {
        var randomArray = Array.from({ length: 6 }, () => Math.floor(Math.random() * 500));
        console.log(randomArray);
        this.setState({ arr: randomArray }, () => {
            console.log(this.state.arr);
        })     
    }
    timer(ms) {
    return new Promise(res => setTimeout(res, ms));
    }
    voiceControl = () => {
        this.setState({ voice: !this.state.voice });
    }
    resetState = () => {
        this.setState({ currentIndex: null });
        this.setState({ comparingIndex: null});
        this.setState({ sorted: 100});
        this.setState({ comparingText:""});
        this.setState({ swapText: "" });
    }
    repeat = () => {
        this.resetState();
        this.onPlay();
    }
    onPlay = async () => {
      
            this.setState({ play: !this.state.play })
            const arr = this.state.arr;
            const n = this.state.arr.length;
            let speak = (text) => say(text);
            for (var i = 0; i < n - 1; i++) {
                for (var j = 0; j < n - i - 1; j++) {
                    this.setState({ currentIndex: j })
                    this.setState({ comparingIndex: j + 1 })
                    if (this.state.voice) { speak(`comparing  ${arr[j]} and ${arr[j + 1]}`) };
                    this.setState({ comparingText: `comparing  ${arr[j]} and ${arr[j + 1]}` })
                    this.state.voice ? await this.timer(6000) : await this.timer(1000);
                    if (arr[j] >= arr[j + 1]) {
                        if (this.state.voice) { speak(`${arr[j]} is greater than ${arr[j + 1]} we will swap it}`) };
                        this.setState({ swapText: `${arr[j]} is greater than ${arr[j + 1]} we will swap it}` });
                        this.state.voice ? await this.timer(6000) : await this.timer(1000);
                        var tmp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = tmp;
                        this.setState({ arr: arr })
                    }
                    this.setState({ comparingText: "" });
                    this.setState({ swapText: "" });
                    await this.timer(1000);
                }
                this.setState({ comparingIndex: null });
                this.setState({ currentIndex: null });
                this.setState({ sorted: n - i - 1 });
                await this.timer(1000);
            }
            this.setState({ sorted: 0 });

       
    }
    onPause = async () => {
       
    }
  
    render() {
        
        
        const list =
            this.state.arr.map((size, i) => {
                return (
                    <Bars height={`${size}px`} width={`${75 / this.state.arr.length}%`} active={this.state.currentIndex === i} comparing={this.state.comparingIndex === i} key={i} sorted={i >= this.state.sorted}>
                        <p>{size}</p>
                    </Bars>
                );
            });
       
        return (
            
            <div className="container">
                <ControlPannel play={this.state.play} voice={this.state.voice} onPlay={() => this.onPlay()} onPause={() => this.onPause()} repeat={() => this.repeat()} voiceControl={() => this.voiceControl()} />
                <div className="row">
                    <Container className="col-md-8 col-sm-12">
                        {list}
                    </Container>
                    <div className="col-md-4 col-sm-12">
                        <Display comparingText={this.state.comparingText} swapText={this.state.swapText} />
                    </div>
                </div>
            <AlgoInfo algoInfo={BubbleSortDesc} />
            </div>

            );

    }
    
}

export default BubbleMain;