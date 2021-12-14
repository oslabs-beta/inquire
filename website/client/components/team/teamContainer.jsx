import React, { Component } from 'react';
import TeammateProfile from './teammateProfile.jsx';

import profileHan from '../../assets/profileHan.png'
import profileYing from '../../assets/profileYing.png'
import profileCece from '../../assets/profileCece.png'
import profileAnna from '../../assets/profileAnna.png'

import buttonYellowCircle from '../../assets/buttonYellowCircle.png'
import buttonRedCircle from '../../assets/buttonRedCircle.png'
import buttonGreenCircle from '../../assets/buttonGreenCircle.png'

class TeamContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const hanText = `
      Coming from a background in automation and manufacturing, Han brings to Topic a strong foundation in 
      backend engineering as well as knowledge in algorithms and performance optimization.
    `
    const yingText =  `
      Ying is a software engineer interested in the intersection of software engineering and human experience,
      with a focus on streaming applications and interactive UI. Her background includes fellowships in art and design.
    `
    const ceceText =  `
      Cece has a background in international business and software engineering. Her contributions to Topic range from
      backend logic and algorithms to frontend development in React - Redux.
    `
    const annaText = `
      Anna is a software engineer with a background in architecture and civil engineering. Most recently her work has 
      revolved around frontend development and design, as well as streaming platforms including as Kafka.
    `

    const imageLinks = [profileHan, profileYing, profileCece, profileAnna];
    const circleIcons = [buttonYellowCircle, buttonRedCircle , buttonYellowCircle, buttonGreenCircle];
    const fullName = ['Han Bin Jo', 'Ying Liu', 'Cecily Jansen', 'Anna Falvello'];
    const text = [hanText, yingText, ceceText, annaText];

    const displayElements = [];
    for (let i = 0; i < imageLinks.length; i++) {
      displayElements.push(<TeammateProfile
        imageLink={imageLinks[i]}
        circleIcon={circleIcons[i]}
        fullName={fullName[i]}
        text={text[i]}
        key={`teammate${i}`}
      />
      )
    }

    return(
      <div className="teamContainer">
        {displayElements}
      </div>
    );
  }
}

export default TeamContainer;