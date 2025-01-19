"use client";

import React from "react";
import InteractiveVideoPlayer from "./InteractiveVideoPlayer";

// List of Youtube Videos to be displayed, you can add more videos as needed
const YoutubeVideos = [
    {
        id: 1,
        title: "The Silk Roads",
        url: "https://www.youtube.com/watch?v=daiQ6aChKfk",
    },
    {
        id: 2,
        title: "The Mongol Empire, Explained",
        url: "https://www.youtube.com/watch?v=KHJLZBXUyzo",
    },
    {
        id: 3,
        title: "The Indian Ocean, Explained",
        url: "https://www.youtube.com/watch?v=r-D9F2TiirY",
    },
];

const InteractiveVideoWrapper: React.FC = (): React.JSX.Element => {
    const [selectedVideo, setSelectedVideo] = React.useState<number | null>(null);

    return (
        <>
            <h1 className="text-center">
                List of Youtube Videos ( Please Click on the name of the video to begin playing )
            </h1>
            {selectedVideo && (
                <div className="text-center">Currently Playing Video: {YoutubeVideos[selectedVideo - 1]?.title} </div>
            )}
            <br />
            <div className="flex flex-row flex-nowrap gap-5">
                <div className="w-2/5">
                    {YoutubeVideos.map((video, index) => (
                        <div key={index} className="flex flex-col items-center p-1 text-left">
                            <p
                                onClick={() => setSelectedVideo(index + 1)}
                                className="text-sm w-full cursor-pointer underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                            >
                                {index + 1}: {video.title}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="w-3/5">
                    {selectedVideo && (
                        <InteractiveVideoPlayer
                            key={YoutubeVideos[selectedVideo - 1]?.id}
                            url={YoutubeVideos[selectedVideo - 1]?.url}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default InteractiveVideoWrapper;
