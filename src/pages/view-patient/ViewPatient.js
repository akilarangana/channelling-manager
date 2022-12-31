import { useState } from "react";
import NavBarComponent from "../nav-bar/NavBarComponent";
import { SearchCompoent } from "./search-component/SearchComponent";
import BasicTable from "./tableComponent/SearchTableComponent";
import './ViewPatient.css';

export function ViewPatient() {

    const [query, setQuery] = useState("");

    return (
        <div>
            <NavBarComponent />
            <div className="search-patient-main">
                <div id="searchCompId">
                    <SearchCompoent onQuery={setQuery} />
                </div>
                <div id="searchTableId">
                    <BasicTable query={query} />
                </div>
            </div>
        </div>
    );
}

export default ViewPatient;