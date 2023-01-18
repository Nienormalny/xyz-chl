import { FilterType } from "@/types/filter.types";
import React, {SetStateAction, useContext, useState} from "react";

const FilterContext = React.createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({children}) => {
    const [filterProps, setFilterProps] = useState<FilterType>({});

    const handleChangeFilter = (props?: PropsType) => {
        if (props) {
            setFilterProps(old => ({...old, ...props}));
        } else {
            setFilterProps({});
        }
    }

    const value = {
        filterProps: filterProps as PropsType,
        handleChangeFilter,
    }

    return <FilterContext.Provider value={value}>
        {children}
    </FilterContext.Provider>
}

interface PropsType {
    "jobLocations": string;
    "jobLevels": string;
    "jobTimeModel": string;
}