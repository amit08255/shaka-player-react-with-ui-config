import React from 'react';
import dynamic from 'next/dynamic';

const TutorialContainer=dynamic(import ("../containers/Tutorial"),{ssr:false});


class Tutorial extends React.PureComponent{

    render(){

        const licenseServer = "https://widevine-proxy.appspot.com/proxy";
        const mpdFile = "https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd";
        const videoThumbnail = "https://upload.wikimedia.org/wikipedia/commons/a/a7/Big_Buck_Bunny_thumbnail_vlc.png";

        return (

            <TutorialContainer 
                licenseServer={licenseServer}
                manifestUrl={mpdFile}
                posterUrl={videoThumbnail}
            />
        )
    }
}

export default Tutorial;