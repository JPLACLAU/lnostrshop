import { Button, Typography, Avatar } from '@material-ui/core';
import { GitHub, LinkedIn, Twitter } from '@material-ui/icons';
import './about.css';
import MetaData from './MetaData';

export const About = () => {
  const visitGithub = () => {
    window.location.replace('https://github.com/jplaclau');
  };
  return (
    <div className="aboutSection">
      <MetaData title="About" />
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src="JPL.png"
              alt="Founder"
            />
            <Typography>Jean-Paul Laclau</Typography>
            <Button onClick={visitGithub}>Visit Github</Button>
            <span>
              LNostrshop & metadata tests. <br />
              LN integration is done via webln. <br />
              App made during "The summer of Bitcoin". <br />
              It is part of an internship proposal that I will send to getAlby.{' '}
              <br />
              I will also be doing a mashup with with Nostr private messaging.
              <br />
              The Nostr implementation is to be presented on the Bolt Fun
              Hackaton. <br />
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect With Me</Typography>

            <a
              href="https://github.com/jplaclau"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHub className="githubSvgIcon" />
            </a>
            <a
              href="https://www.linkedin.com/in/jplaclau/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <LinkedIn className="linkedinSvgIcon" />
            </a>
            <a
              href="https://iris.to/jplaclau"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Twitter className="nostrSvgIcon" />
            </a>
            <a>
              <p>We need Nostr Icons on node module: @material-ui/icons</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
