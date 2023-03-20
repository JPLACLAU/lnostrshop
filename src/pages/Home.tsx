import MetaData from './MetaData';
import { CgMouse } from 'react-icons/all';
import './home.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <MetaData title="Shopping Store" />
      <div className="banner">
        <p>
          This app is for testing different metadata types in lightning network
          payments
        </p>
        <h1>“If only you knew the power of the Lightning Network...”</h1>
        <div className="button-container">
          <Link to="/store">
            <span className="button">
              Shop <CgMouse />
            </span>
          </Link>
          <Link to="/podcast">
            <span className="button">
              Podcast <CgMouse />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
