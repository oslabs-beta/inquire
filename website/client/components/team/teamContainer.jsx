import React, { Component } from 'react';
import TeammateProfile from './teammateProfile.jsx';

import profileHan from '../../assets/profileHan.png';
import profileYing from '../../assets/profileYing.png';
import profileCece from '../../assets/profileCece.png';
import profileAnna from '../../assets/profileAnna.png';

import buttonYellowCircle from '../../assets/buttonYellowCircle.png';
import buttonRedCircle from '../../assets/buttonRedCircle.png';
import buttonGreenCircle from '../../assets/buttonGreenCircle.png';

class TeamContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const hanText = `
      Coming from a background in automation and manufacturing, Han brings to Inquire a strong foundation in 
      backend engineering as well as knowledge in algorithms and performance optimization. Han enjoys going
      on walks with his golden retriever puppy Lincoln and saltwater fishing. 
    `;
    const yingText = `
      Ying is a software engineer with a background in live multimedia art. She enjoys creating streaming and 
      data-intensive applications. Her interdisciplinary work has been awarded fellowships and residencies 
      by organizations including the Jerome Foundation. She loves lap swimming and noise music.
    `;
    const ceceText = `
      Cece has a background in software engineering and international business. Her contributions to Inquire range from
      backend logic and algorithms to frontend development in React - Redux. In her free time she enjoys playing acoustic
      and electric guitar, playing basketball and hiking in the Adirondack Mountains.
    `;
    const annaText = `
      Anna is a software engineer with a background in architecture and civil engineering. Most recently her work has 
      revolved around frontend development and design, as well as data streaming platforms like Kafka. She enjoys practicing 
      Ashtanga yoga followed by a long session in the steam room.
    `;

    const imageLinks = [profileHan, profileYing, profileCece, profileAnna];
    const circleIcons = [
      buttonYellowCircle,
      buttonRedCircle,
      buttonYellowCircle,
      buttonGreenCircle,
    ];
    const fullName = [
      'Han Bin Jo',
      'Ying Liu',
      'Cecily Jansen',
      'Anna Falvello',
    ];
    const text = [hanText, yingText, ceceText, annaText];

    const displayElements = [];
    for (let i = 0; i < imageLinks.length; i++) {
      displayElements.push(
        <TeammateProfile
          imageLink={imageLinks[i]}
          circleIcon={circleIcons[i]}
          fullName={fullName[i]}
          text={text[i]}
          key={`teammate${i}`}
        />
      );
    }

    return <div className="teamContainer">{displayElements}</div>;
  }
}

export default TeamContainer;
