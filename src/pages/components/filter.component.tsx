import { device, textFlow } from '@/styles/helpers';
import { useFilter } from '@/utils/filter.context';
import { CheckOutlined, KeyboardArrowDown } from '@mui/icons-material';
import React, { useState } from 'react';
import styled, {useTheme} from 'styled-components';

const Filter  = ({timeModelList, levelList, locationsList} : FilterProps) => {
    const {filterProps, handleChangeFilter} = useFilter();
    const [showLocationsList, setShowLocationsList] = useState<boolean>(false);
    const [showLevelList, setShowLevelList] = useState<boolean>(false);
    const [showTimeModelList, setShowTimeModelList] = useState<boolean>(false);
    const theme = useTheme();

    const FilterContainer = styled.div`
        display: flex;
        width: 70%;
        justify-content: space-between;
        @media ${device.mobileAndTablet} {
            flex-direction: column;
            width: 100%;
        }
    `;
    const Button = styled.button`
        border-radius: 0.5rem;
        background-color: white;
        border: 1px solid #c3c3c3;
        ${textFlow(theme.fontSizes.textMd)}
        cursor: pointer;
        height: 2.75rem;
        padding: 0 0.875rem;
        width: 100%;
        text-align: left;
        display: flex;
        align-items: center;
        transition: all .5s ease;
        @media ${device.mobileAndTablet} {
           margin-bottom: 1rem;
        }
        &:hover {
            border-color: #838383;
            color: ${theme.colors.grayScale.gray900} !important;
        };
        &:focus, &:active {
            border-color: ${theme.colors.primaryScale.primary300};
            box-shadow: 0 0 5px 1px ${theme.colors.primaryScale.primary300};
        };
        &.open {
            box-shadow: none;
            border-color: ${theme.colors.primaryScale.primary300};
        };
        svg {
            margin-left: auto;
            display: block;
            transition: all 0.5s ease;
        };
    `;
    const SelectButtonContainer = styled.div`
        min-width: calc(100% / 3 - 20px);
        display: flex;
        position: relative;
    `;
    const ListContainer = styled.ul`
        width: 100%;
        position: absolute;
        overflow-y: auto;
        padding: 0;
        margin: .5rem 0 0 0;
        background-color: ${theme.colors.grayScale.gray50};
        border-radius: .5rem;
        box-shadow: 0px 3px 9px #00000029;
        top: 2.75rem;
        max-height: 250px;
        z-index: 2;
    `;
    const ListItem = styled.li`
        padding: 1rem;
        display: flex;
        align-items: center;
        font-family: Gotham;
        cursor: pointer;
        transition: all .5s ease;
        svg {
            margin-left: auto;
        }
        &:hover, &.selected {
            background-color: ${theme.colors.primaryScale.primary50};
            color: ${theme.colors.primaryScale.primary700};
        }
    `;

    return (
        <FilterContainer>
            <SelectButtonContainer>
                <Button
                    onClick={() => {setShowLocationsList(!showLocationsList)}}
                    className={showLocationsList ? "open": ""}
                    style={{color: `${filterProps.jobLocations ? "black" : "#cecece"}`}}>{filterProps.jobLocations || "Wähle einen Standort"} <KeyboardArrowDown style={{transform: `rotate(${showLocationsList ? "-180deg" : "0deg"})`}}/></Button>
                {locationsList && showLocationsList && <ListContainer>
                    {locationsList.map((l, key) => <ListItem key={key} className={l === filterProps.jobLocations ? "selected" : ""} onClick={() => (setShowLocationsList(!showLocationsList), handleChangeFilter({jobLocations: l}))}>{l} {l === filterProps.jobLocations && <CheckOutlined/>}</ListItem>)}
                </ListContainer>}
            </SelectButtonContainer>
            <SelectButtonContainer>
                <Button
                    onClick={() => {setShowLevelList(!showLevelList)}}
                    className={showLevelList ? "open": ""}
                    style={{color: `${filterProps.jobLevels ? "black" : "#cecece"}`}}>{filterProps.jobLevels || "Erfahrungslevel"} <KeyboardArrowDown style={{transform: `rotate(${showLevelList ? "-180deg" : "0deg"})`}}/></Button>
                {levelList && showLevelList && <ListContainer>
                    {levelList.map((l, key) => <ListItem key={key} className={l === filterProps.jobLevels ? "selected" : ""} onClick={() => (setShowLevelList(!showLevelList), handleChangeFilter({jobLevels: l}))}>{l} {l === filterProps.jobLevels && <CheckOutlined/>}</ListItem>)}
                </ListContainer>}
            </SelectButtonContainer>
            <SelectButtonContainer>
                <Button
                    onClick={() => {setShowTimeModelList(!showTimeModelList)}}
                    className={showTimeModelList ? "open": ""}
                    style={{color: `${filterProps.jobTimeModel ? "black" : "#cecece"}`}}>{filterProps.jobTimeModel || "Arbeitszeitmodel"} <KeyboardArrowDown style={{transform: `rotate(${showTimeModelList ? "-180deg" : "0deg"})`}}/></Button>
                {timeModelList && showTimeModelList && <ListContainer>
                    {timeModelList.map((l, key) => <ListItem key={key} className={l === filterProps.jobTimeModel ? "selected" : ""} onClick={() => (setShowTimeModelList(!showTimeModelList), handleChangeFilter({jobTimeModel: l}))}>{l} {l === filterProps.jobTimeModel && <CheckOutlined/>}</ListItem>)}
                </ListContainer>}
            </SelectButtonContainer>
        </FilterContainer>
    )
}


type FilterProps = {
    levelList: string[];
    locationsList: string[];
    timeModelList: string[];
}
export default Filter;