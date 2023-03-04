import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Spinner from '../Spinner';
import styled from 'styled-components';
import './DataTable.scss'

import { MdArrowDownward } from "react-icons/md";

const sortIcon = <MdArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const FilterSelection = styled.select`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const FilterComponent = ({ filterText, onFilter, columnsNames, selectedFilter }) => (
    <>
        <FilterSelection defaultValue={'default'} onChange={(e) => selectedFilter(e.target.value)}>
            <option value="default" disabled>Select filter</option>
            {
                Array.isArray(columnsNames) ? columnsNames.map(element => (<option key={element} value={element}>{element}</option>)) : null
            }
        </FilterSelection>
        <TextField
            id="search"
            type="text"
            placeholder={"Filter by"}
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
    </>
);


const customStyles = {
    header: {
        style: {
            minHeight: '56px',
        },
    },
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor: 'gray',
        },
    },
    headCells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: 'gray',
            },
        },
    },
    cells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: 'gray',
            },
        },
    },
};

const CustomLoader = () => (
    <Spinner />
);

function DataTableBase(props) {
    const [filterText, setFilterText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('id');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = props.info ? props.info.filter(
        item => item[selectedFilter] && item[selectedFilter].toString().toLowerCase().includes(filterText.toLowerCase()),
    )
        : [];

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        const getColumnsNames = () => {
            var columnsName = [];

            if (props.info && props.info[0] !== undefined) {
                Object.keys(props.info[0]).forEach((key) => {
                    columnsName.push(key);
                });
            }
            columnsName = columnsName
                .filter(
                    (column) =>
                        column !== "id" &&
                        column !== "files" &&
                        column !== "user_id" &&
                        column !== "created_at" &&
                        column !== "updated_at"
                )
            return columnsName;
        }

        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear} filterText={filterText}
                columnsNames={getColumnsNames()}
                selectedFilter={setSelectedFilter}
            />
        );
    }, [filterText, resetPaginationToggle, props.columns]);


    return (
        <DataTable
            progressComponent={<CustomLoader />}
            data={filteredItems}
            pagination
            selectableRowsComponentProps={selectProps}
            sortIcon={sortIcon}
            dense
            customStyles={customStyles}
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            {...props}
        />
    );
}

export default DataTableBase;

