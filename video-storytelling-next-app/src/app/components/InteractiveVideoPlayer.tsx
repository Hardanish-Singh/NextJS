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
        onPause={() => console.log("PAUSED")}
        onPlay={() => console.log("PLAYING")}
        onEnded={() => console.log("ENDED")}
    />
);

export default InteractiveVideoPlayer;
