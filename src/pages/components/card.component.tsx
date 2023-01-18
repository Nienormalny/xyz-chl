import { device, textFlow } from '@/styles/helpers';
import { AccessTimeOutlined, ArrowOutwardOutlined, FmdGoodOutlined } from '@mui/icons-material';
import React from 'react';
import styled, {useTheme} from 'styled-components';

const Card = (props: CardType) => {
    const theme = useTheme();

    const CardContainer = styled.div`
        background-color: ${theme.colors.grayScale.gray50};
        border: 1px solid ${theme.colors.grayScale.gray200};
        display: flex;
        flex-direction: column;
        border-radius: ${theme.card.br};
        padding: ${theme.card.pd};
        cursor: pointer;
        margin-bottom: 0.625rem;
        width: calc(100% - (2 * ${theme.card.pd}));
    `;
    const CardJobType = styled.h6`
        color: ${theme.colors.primary};
        ${textFlow(theme.fontSizes.textSm)};
        font-weight: 500;
        margin: 0;
        display: flex;
        align-items: center;
        .supText {
            margin-left: auto;
        };
        svg {
            margin-left: 0.875rem;
            ${textFlow(theme.fontSizes.textMd)};
        }
        @media ${device.mobileAndTablet} {
            .supText {
                display: none;
            }
            svg {
                margin-left: auto;
            }
        }
    `;
    const CardJobTitle = styled.h5`
        color: ${theme.colors.card.title};
        ${textFlow(theme.fontSizes.textXl)};
        font-weight: 500;
        margin: 0.5rem 0 0 0;
    `;
    const CardJobDetails = styled.div`
        display: flex;
        margin-top: 1.437rem;
    `;
    const DivWithIcon = styled.div`
        display: flex;
        align-items: center;
        color: ${theme.colors.grayScale.gray700};
        ${textFlow(theme.fontSizes.textMd)}
        margin-right: 1.5rem;
    `;
    return (
        <CardContainer>
            <CardJobType>{props.jobType} <span className={"supText"}>Stelle anzeigen</span><ArrowOutwardOutlined/></CardJobType>
            <CardJobTitle>{props.jobTitle}</CardJobTitle>
            <CardJobDetails>
                <DivWithIcon><FmdGoodOutlined/> {props.jobLocations[0]}</DivWithIcon>
                <DivWithIcon><AccessTimeOutlined />{props.jobTimeModel}</DivWithIcon>
            </CardJobDetails>
        </CardContainer>
    )
}

type CardType = {
    jobTitle: string;
    jobType: string;
    jobLocations: string[];
    jobTimeModel: string;
}

export default Card;