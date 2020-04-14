import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import cookieSrc from '../cookie.svg';

import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: 'cursor', name: 'Cursor', cost: 10, value: 1 },
  { id: 'grandma', name: 'Grandma', cost: 100, value: 10 },
  { id: 'farm', name: 'Farm', cost: 1000, value: 80 },
];

const calculateCookiesPerTick = (purchasedItems, items) => {
  let idle1 = purchasedItems[items[0].id] * items[0].value;
  let idle2 = purchasedItems[items[1].id] * items[1].value;
  let idle3 = purchasedItems[items[2].id] * items[2].value;
  let sum = idle1 + idle2 + idle3;
  return sum;
}

const Game = () => {
  const [cookies, setCookies] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState({cursor: 0, grandma: 0, farm: 0});
  const [cookiesPS, setCookiesPS] = useState(0);

  useEffect(() => {
    const handleSpace = (event) => {
      if (event.key === " "){
        setCookies(cookies + 1);
      }
    }

    document.title = `${cookies} cookies - Cookie Clicker`;
    window.addEventListener("keyup", handleSpace);

    return () => {
      document.title = `Cookie Clicker Workshop`;
      window.removeEventListener("keyup", handleSpace);
    };
  }, [cookies]);
  
  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{cookies} cookies</Total>
          {useInterval(() => {
            const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems, items);
            setCookiesPS(numOfGeneratedCookies);
            setCookies(cookies + cookiesPS);
            }, 1000)
          }
          <strong>{cookiesPS}</strong> cookies per second
        </Indicator>
        <Button onClick={(ev => {
          setCookies(cookies + 1);
        })}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {

          return <Item 
                    key={item.id} 
                    cookies={cookies} 
                    setCookies={setCookies} 
                    setPurchasedItems={setPurchasedItems}
                    item={item} 
                    purchasedItems={purchasedItems}
                    doFocus={index === 0}>
                  </Item>;
        })}
      </ItemArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

export default Game;
