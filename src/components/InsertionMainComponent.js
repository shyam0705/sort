import React from 'react';
import { Component } from 'react';
import { Button } from 'reactstrap';
import { Container } from './helper/container.js';
import styled, { css } from 'styled-components';
import AlgoInfo from './helper/algoInfo.js';
import { InsertionSortDesc } from './helper/insertionDesc.js';
import { Jumbotron } from 'reactstrap';
import ControlPannel from './helper/ControlPannel.js';
import { say } from './helper/speech.js';
function Display({ comparingText, swapText}) {
    return (
        <Jumbotron style={{ height: "500px", margin: "auto", marginTop: "10px" }}>
            <div className="container">
                <div className="row row-header">
                    <div className="col-12 col-sm-6">
                        <h1>Algorithm</h1>
                        <hr></hr>
                        <p>{comparingText}</p>
                        <p>{swapText}</p>
                    </div>
                </div>
            </div>
        </Jumbotron>
    )
}
class InsertionMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            currentIndex: null,
            comparingIndex: null,
            comparing:"",
            swapText:"",
            sorted: null,
            play: false,
            voice: false,
            show: false,
            
        }
    }
    componentDidMount() {
        var randomArray = Array.from({ length: 6 }, () => Math.floor(Math.random() * 350));
        console.log(randomArray);
        this.setState({ arr: randomArray }, () => {
            console.log(this.state.arr);
        })
    }
    timer(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
    resetState = () => {
        this.setState({ currentIndex: null});
        this.setState({ comparingIndex: null});
        this.setState({ sorted: null });
        this.setState({ comparing: "" });
        this.setState({ swapText: "" });
    }
    repeat = () => {
        this.resetState();
        this.onPlay();
    }
    voiceControl = () => {
        this.setState({ voice: !this.state.voice });
    }
    onPlay = async () => {
        let speak = (text) => say(text);
        this.setState({play:true})
        const n = this.state.arr.length;
        const arr = this.state.arr;
        this.setState({ sorted: 1 });
        this.setState({ comparing: `marking ${arr[0]} as sorted` });
        if (this.state.voice) {
            speak(`marking ${arr[0]} as sorted`);
        }
        this.state.voice?await this.timer(5000):await this.timer(1000)
        for (var i = 1; i < n; i++) {
            this.setState({ comparing: "" });
            this.setState({ swapText: "" });
            this.setState({ currentIndex: i});
            await this.timer(1000);
            this.setState({ comparingIndex: i - 1 });
            await this.timer(1000);
            let current = arr[i];
            var j = i - 1;
            while (j > -1 && current < arr[j]) {
                this.setState({ comparing: `${arr[j]} is greater than ${current} so we will move it to right` });
                if (this.state.voice) { speak(`${arr[j]} is greater than ${current} so we will move it to right`) }
                this.setState({ comparingIndex: j }); 
                this.state.voice ? await this.timer(5000) : this.timer(1000);
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                var tmp = this.state.comparingIndex;
                this.setState({ arr: arr });
                this.setState({ comparingIndex: this.state.currentIndex });
                this.setState({ currentIndex: tmp });
                await this.timer(1000);
                j--;
            }
            this.setState({ comparing: `${arr[j]}<${current} so we will insert this in this position` });
            if (this.state.voice) { speak(`${arr[j]} is less than ${current} so we will insert this in this position`)};
            this.setState({ comparingIndex: j });
            this.state.voice?await this.timer(5000):await this.timer(1000);
            arr[j + 1] = current;
            this.setState({ arr: arr });
            this.setState({currentIndex: null});
            this.setState({ comparingIndex: null })
            this.setState({ sorted: i+1 });
            await this.timer(1000);
        }
        this.setState({ sorted: n });
        this.setState({ currentIndex: null });
        this.setState({ comparingIndex: null });
 
    }
    showDetails = () => {
        this.setState({show:!this.state.show})
    }
    componentWillUnmount() {
        window.location.reload(true);
    }
    onPause = async () => {

    }
    
    render() {
        
        const Bars = styled.div`
        display:flex;
        width:${(props) => props.width};
        height:${(props) => props.height};
        background: ${(props) => {
           
                
                    if (props.active || props.swap) {
                        return "red";
                    }
                    else if (props.comparing) {
                        return "blue";
                    }
                    else if (props.sorted) {
                        return "green";
                    }
                    else {
                        return "grey";
                    }
           
            }};
        margin-right:2px;
        align-content:center;
        justify-content:center;
        align-items:center;
        text-align:center;
        transform:translateY(${(props) => {
            if (props.active) {
                return 120
            }
            else {
                return 0
            }
            }}%);
        color:white;

`;
        const list = this.state.arr.map((size, i) => {
            return (
                <Bars height={`${size}px`} width={`${75 / this.state.arr.length}%`} active={this.state.currentIndex === i} swap={this.state.swapIndex === i} comparing={this.state.comparingIndex === i} sorted={i<this.state.sorted} key={i}>
                    <p>{size}</p>
                </Bars>
            );
        }); 
        return (
            <div className="container">
                <ControlPannel play={this.state.play} voice={this.state.voice} onPlay={() => this.onPlay()}
                    onPause={() => this.onPause()}
                    repeat={() => this.repeat()} voiceControl={() => this.voiceControl()} />
                <div className="row">
                    <Container className="col-md-8 col-sm-12">
                        {list}
                    </Container>
                    <div className="col-md-4 d-none d-lg-block">
                        <Display comparingText={this.state.comparing} swapText={this.state.swapText}/>
                    </div>
                </div>
                <div className="text-center" style={{ marginTop: "10px" }}>
                    {
                        !this.state.play?
                            <Button className="btn btn-danger" onClick={() => this.showDetails()}>
                                {!this.state.show ? <span class="fa fa-info" aria-hidden="true">show algo details</span> :
                                    <span class="fa fa-info" aria-hidden="true">hide algo details</span>
                                }
                            </Button> :
                            <div></div>
                    }
                </div>
                {
                    this.state.show ? <AlgoInfo algoInfo={InsertionSortDesc} />:<div></div>
                }
            </div>
            )
    }
}
export default InsertionMain;