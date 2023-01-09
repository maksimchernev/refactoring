/**
 * Please, improve this component and fix all problems.
 *
 * What is important:
 * - design (extensibility, testability)
 * - code cleanliness, following best practices
 * - bugs
 * - consistency
 * - naming
 * - formatting
 *
 * Write your perfect code!
 */

import React, { useEffect, useState } from 'react';

function createCardsData(json) {
  let newData = []
  json.forEach((item) => {
    let newItem = {}
    newItem.id = item.id;
    newItem.title = item.title;
    newItem.link_title = item.link_title;
    newItem.link = item.link;
    newItem.text = item.body?.en ? item.body.en.substr(0, 50) + '...' : '';
    newData.push(newItem)
  })
  return newData
}

function Card({title,text,target,linkTitle,href,rel,onClick,linkClassName}) {
  return (
    <div className="card">
        <div className="card__title">{title}</div>
        <div className="card__text">{text}</div>
        <a className={`default-link card__link ${linkClassName}`} target={target} rel={rel} href={href} onClick={onClick}>
          {linkTitle}
        </a>
    </div>
  );
}

export default function Page () {
  const [cards, setCards] = useState([]);

  useEffect(() => {
      fetch('https://my-json-server.typicode.com/savayer/demo/posts')
        .then(data => data.json())
        .then((json) => {
          let newData = createCardsData(json)
          setCards(newData);
        })     
        .catch((e) => {
          console.log('e', e)
        })
  }, []);

  function analyticsTrackClick(url) {
    // sending clicked link url to analytics
    console.log('url', url);
  }

  return (
    <div>
    {cards.map((item) => {
      return (
        <Card 
          key={item.id}
          title={item.title.en} 
          linkTitle={item.link_title} 
          href={item.link} 
          text={item.text} 
          linkClassName={item.id === 1 ? 'card__link--red' : ''} 
          target={item.id === 1 ? '_blank' : ''}
          onClick={() => analyticsTrackClick(item.link)} 
        />
      );
    })}
    </div>
  );
}