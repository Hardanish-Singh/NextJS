"use client";

import ReactPlayer from "react-player";

type Props = {
    url: string;
};

const InteractiveVideoPlayer: React.FC<Props> = ({ url }: Props): React.JSX.Element => (
    <ReactPlayer
        url={url}
        controls={true}
        width="100%"
        stopOnUnmount
        playing={true} // By default, video will play
        onPause={() => console.log("VIDEO PAUSED")}
        onPlay={() => console.log("VIDEO PLAYING")}
        onEnded={() => console.log("VIDEO ENDED")}
    />
);

export default InteractiveVideoPlayer;
