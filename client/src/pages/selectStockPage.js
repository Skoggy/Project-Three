import { React } from 'react';
import styled from 'styled-components';
import { StockGroupList } from '../components/StockGroupList';


const StockPageStyles = styled.div`
display: flex;
flex-direction:row;
`


export const SelectStockPage = () => {
    return (
        <StockPageStyles>
            <StockGroupList />
        </StockPageStyles>
    )
}

