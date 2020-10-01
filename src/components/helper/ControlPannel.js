import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
function ControlPannel(props) {
    return (
        <div className="row">
            <div className="col-md-12" style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10px", marginBottom: "20px" }}>
                <ButtonGroup>
                    <Button color="black" className="btn btn-info" onClick={() => !props.play ? props.onPlay() : props.onPause()}>
                        {
                            !props.play ? <span class="fa fa-play" aria-hidden="true">play</span> :
                                <span class="fa fa-pause" aria-hidden="true">pause</span>
                        }
                    </Button>
                    <Button color="black" className="btn btn-info" onClick={() => props.repeat()}>
                        <span class="fa fa-repeat">repeat</span>
                    </Button>
                    <Button color="black" className="btn btn-info" onClick={() => props.voiceControl()}>
                        {
                            props.voice ? <span class="fa fa-microphone">desc on</span> :
                                <span class="fa fa-microphone-slash">desc off</span>
                        }
                    </Button>
                </ButtonGroup>
            </div>
        </div>
        )
}
export default ControlPannel;