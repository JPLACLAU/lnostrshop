import { Button, Typography, Avatar } from '@material-ui/core';
import { YouTube, GitHub, LinkedIn, Twitter } from '@material-ui/icons';
import './about.css';
import MetaData from './MetaData';
import { requestProvider } from 'webln';
import { useState } from 'react';

export const Podcast = () => {
  const visitGithub = () => {
    window.location.replace('https://github.com/jplaclau');
  };
  const [nodeInfo, setNodeInfo] = useState('');

  async function loadRequestProvider() {
    const webln = await requestProvider();
    const nodeInfo = await webln.getInfo();
    setNodeInfo(nodeInfo.node.alias);
  }
  return (
    <div className="aboutSection">
      <MetaData title="About" />
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">Bitcoin Podcast</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src="bitcoinpodcast.jpeg"
              alt="Founder"
            />
            <Typography>The Bitcoins's developers' podcast</Typography>
            <span>
              Bitcoin Podcast <br />
              Always Improving. <br />
              Giving hope. <br />
              This is just an example podcast. <br />
              The idea is to try/test continuous LN payments while listening.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect to the Podcast</Typography>
            <button onClick={loadRequestProvider}>
              Connect to LN⚡ provider
            </button>
            <p> Connected to: {nodeInfo}</p>
            <br />
            Play button here to listen to the Podcast(and start paying sats?)
          </div>
        </div>
      </div>
    </div>
  );
};
