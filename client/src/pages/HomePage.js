import React, {Component} from 'react';

import { Image } from 'react-bootstrap';
import ReactPlayer from 'react-player'
import './HomePage.css'
import TwitterLogo from '../images/Twitter social icons - rounded square - blue.png'
import FaceBookLogo from '../images/f_logo_RGB-Blue_58.png'
import InstagramLogo from '../images/Instagram_Glyph_Gradient_RGB.png'
import YouTubeLogo from '../images/youtube_social_squircle_red.png'
import SpotifyLogo from '../images/Spotify_Icon_RGB_Green.png'
import AppleMusicLogo from '../images/appl-music-icon.png'

//TODO better style for social media representation
export default class HomePage extends Component {
    render() {
        return(
            <div style={{backgroundColor: 'black', color: 'whitesmoke', height: '2000px'}}>
                <div className="media-content">
                    <Playlist />
                    <Video />
                </div>
                <div className="social-media">
                    <div className="social-media-container">
                        <SocialMediaLink className="social-media-link" url="https://twitter.com/mexijake/" logo={TwitterLogo} />
                        <SocialMediaLink className="social-media-link" url="https://www.instagram.com/mexijake/" logo={InstagramLogo} />
                        <SocialMediaLink className="social-media-link" url="https://www.facebook.com/mexijake/" logo={FaceBookLogo} />
                        <SocialMediaLink className="social-media-link" url="https://www.youtube.com/channel/UCHcNDpo7dx6VbFpjoiL_frA" logo={YouTubeLogo}/>
                        <SocialMediaLink className="social-media-link" url="https://open.spotify.com/artist/2y6B4tT2CqHDEk3FpYPRau?si=b_yqQxghSfOcA1pcBMgqVQ&dl_branch=1" logo={SpotifyLogo}/>
                        <SocialMediaLink className="social-media-link" url="https://music.apple.com/us/artist/mexijake/1071513318" logo={AppleMusicLogo}/>
                    </div>
                </div>
            </div>
        );
    }
}


function SocialMediaLink(props) {
    return(
        <div className={props.className || "text-center"}>
            <a href={props.url}>
                <Image src={props.logo}
                    width={props.width || "50px"}
                    height={props.height || "50px"}
                    className={props.imgClass || "d-inline-block align-middle"}
                    alt={props.alt || "image error"}
                />
            </a>
        </div>
    );
}

SocialMediaLink.defaultProps = {

}

function Video() {
    const [screen, setDimensions] = React.useState({
        width: window.innerWidth
    });
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth
            });
            console.log(screen);
        }

        window.addEventListener('resize', handleResize);
    });

    var size;
    (screen.width < 992)
                ?   size = {width: "100%", height: "300px"}
                :   size = {width: "80%", height: "360px"};

    return(
        <div className="video-container">
            <h1 className="display-6">Youtube</h1>
            <ReactPlayer width={size.width} height={size.height} playing={true} className="video-content" url="https://www.youtube.com/watch?v=eARznkjaeZQ"/>
        </div>
    );
}

function Playlist() {
    const [screen, setDimensions] = React.useState({
        width: window.innerWidth
    });
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth
            });
            console.log(screen);
        }

        window.addEventListener('resize', handleResize);
    });

    var size;
    (screen.width < 992)
                ?   size = {width: "100%", height: "175px"}
                :   size = {width: "90%", height: "360px"};

    return(
        <div className="spotify-container">
            <h1 className="display-6">Spotify</h1>
            <iframe className="spotify-playlist" title="spotify-playlist" src="https://open.spotify.com/embed/artist/2y6B4tT2CqHDEk3FpYPRau" 
            width={size.width} 
            height={size.height}
            frameBorder="0" 
            allowtransparency="true" 
            allow="encrypted-media">
            </iframe>
        </div>
    );
}