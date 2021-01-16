import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { createStockType } from '../utils/createStockType'

export const StockGroupList = () => {

    return (
        <div>
            <button onClick={createStockType}>Check</button>
        </div>
    )
}