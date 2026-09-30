import { FaSearch, FaFilter } from "react-icons/fa";

function SearchBar({
    searchTerm,
    setSearchTerm,
    department,
    setDepartment,
    departments,
}) {
    return (
        <div className="search-container mb-4">

            <div className="row g-3">

                {/* ==========================
                    SEARCH
                ========================== */}

                <div className="col-md-8">

                    <div className="input-group">

                        <span className="input-group-text">
                            <FaSearch />
                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by ID, name, email or department..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>


                {/* ==========================
                    DEPARTMENT FILTER
                ========================== */}

                <div className="col-md-4">

                    <div className="input-group">

                        <span className="input-group-text">
                            <FaFilter />
                        </span>

                        <select
                            className="form-select"
                            value={department}
                            onChange={(e) =>
                                setDepartment(
                                    e.target.value
                                )
                            }
                        >

                            <option value="All">
                                All Departments
                            </option>

                            {departments.map(
                                (dept, index) => (
                                    <option
                                        key={index}
                                        value={dept}
                                    >
                                        {dept}
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SearchBar;