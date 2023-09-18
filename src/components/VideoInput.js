import React from "react";
import VideoPlayer from "./VideoPlayer";

export default function VideoInput(props) {

    const { sp_start_time, qp_end_time } = props;

    const inputRef = React.useRef();

    const [source, setSource] = React.useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
    };

    const handleChoose = (event) => {
        inputRef.current.click();
    };

    return (
        <div className="VideoInput">
            <input
                ref={inputRef}
                className="VideoInput_input"
                type="file"
                onChange={handleFileChange}
                accept=".mov,.mp4"
            />
            {!source && <div><button onClick={handleChoose}>Choose</button></div>}
            {source && (
                <div className="VideoInput_video">

                    <VideoPlayer Source={source} startTime={sp_start_time} endTime={qp_end_time}
                    />

                </div>
            )}
            <div className="VideoInput_footer"></div>
        </div>
    );


}
