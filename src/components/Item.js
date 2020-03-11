import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const StyledSpan = styled.span `
    font-size: 0.7em;
    color: gray;
    margin-right: 5px;
`;
const StyledCounter = styled.span `
    font-size: 2.5em;
    position: fixed;
    right: 0;
`;
const StyledLine = styled.hr `
    border: 1px solid grey;
`;
const Button = styled.button`
    color: white;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
`;

const StyledItem = styled.span `
    font-size: 1.5em;
`;

function Item ({item, purchasedItems, cookies, setCookies, setPurchasedItems, doFocus}) {
    const first = useRef(null);

    useEffect(() => {
        if (doFocus) {
            first.current.focus();
        }
    }, []);

    return <Button ref={first} onClick={(ev) => {
        if (cookies >= item.cost) {
            setCookies(cookies - item.cost);
            setPurchasedItems({...purchasedItems, [item.id]: purchasedItems[item.id] += 1});
        }
        else {
            alert("Not enough cookies!");
        }
    }}>
            <StyledItem>{item.name}</StyledItem>
            <StyledCounter>{purchasedItems[item.id]}</StyledCounter>
            <p>
                <StyledSpan>
                    Costs: {item.cost} cookie(s). Produces {item.value} cookies/second.
                </StyledSpan>
            </p>
            <StyledLine />
        </Button>;
}

export default Item;