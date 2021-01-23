import { React } from 'react';
import styled from 'styled-components';
// import { StockGroupList } from '../components/StockGroupList'
import { StockGroupList } from '../components/StockGroupList';
// import { StockList } from '../components/StockList'

const StockPageStyles = styled.div`
display: flex;
flex-direction:row;
`


export const SelectStockPage = () => {
    return (
        <StockPageStyles>

            <StockGroupList />
            {/* <StockList /> */}
        </StockPageStyles>
    )
}

