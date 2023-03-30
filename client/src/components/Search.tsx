import React, { useState } from 'react';

interface ISearchProps {
    setSearchTerm: any;
    searchRole: string;
    setSearchRole: any;
}

const Search = ({ setSearchTerm, searchRole, setSearchRole }: ISearchProps) => {
    const [value, setValue] = useState('');

    //Styles for tailwind
    const styles = {
        button: 'border-2 rounded border-blue-200 text-blue-900 leading-normal hover:bg-blue-200 uppercase px-2 text-xs font-medium transition duration-150 ease-in-out',
        developerActive: searchRole === 'Developers' ? 'bg-blue-200' : '',
        scrumMasterActive: searchRole === 'Scrummaster' ? 'bg-blue-200' : '',
    };

    return (
        <div className="m-6">
            <div className="flex justify-center">
                <label htmlFor="search" className="px-2 font-medium">
                    Search
                </label>
            </div>
            {/* Search input */}
            <div className="flex justify-center">
                <input
                    className="border-2 rounded focus:outline-blue-200 m-2"
                    name="search"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setSearchTerm(e.target.value);
                    }}
                />
            </div>
            {/* Search role buttons */}
            <div className="flex justify-center">
                <button
                    type="button"
                    className={`${styles.button} ${styles.developerActive}`}
                    onClick={() => setSearchRole('Developers')}
                >
                    Developers
                </button>
                <button
                    className={`${styles.button} ${styles.scrumMasterActive}`}
                    onClick={() => setSearchRole('Scrummaster')}
                >
                    Scrum Master
                </button>
                <button
                    className={`${styles.button}`}
                    onClick={() => {
                        setValue('');
                        setSearchTerm('');
                        setSearchRole('All');
                    }}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default Search;
