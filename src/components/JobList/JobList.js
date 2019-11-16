import React, { useEffect, useState } from 'react';
import JobDetail from '../JobDetail/JobDetail';
import './JobList.css'
import { MdSearch } from 'react-icons/md';
import Loader from '../../images/loader.gif';

function JobList() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(undefined);
    const [fulldata, setfull] = useState([]);
    const [isLoading, setLoading] = useState(false);

    //  fetch data and set state will run anytime search state or category state is updated
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const ifcategory = !category ? '' : `?category=${category}`
                const query_url = 'https://hirehive-testing-account.hirehive.com/api/v1/jobs' + ifcategory;
                const response = await fetch(query_url);
                const result = await response.json();
                setLoading(false)
                setfull(result.jobs)
                if (search) {
                    handleSearch();
                } else {
                    setData(result.jobs);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [search, category]);

    // filter all data 
    const handleSearch = () => {
        if (query.length < 2) {
            alert('Search must be more than two characters')
        } else {
            setSearch(query);
            setData(fulldata.filter(results => {
                if (results.description.text.toLowerCase().includes(search.toLocaleLowerCase()) || results.title.toLowerCase().includes(search.toLowerCase())) {
                    return results
                }
            }))
        }
    };

    // Remove all Query and filter data by catagory
    const handleCategory = (value) => {
        setQuery('');
        setSearch('');
        setCategory(value)
    }

    return (
        <div>
            <div className="search-box">
                <div className="container">
                    <form onSubmit={e => { e.preventDefault(); }}>
                        <button onClick={handleSearch} type="submit"> <MdSearch fontSize={30} /> </button>
                        <input
                            placeholder="Search by keyword,technology or job title"
                            value={query}
                            onChange={event => setQuery(event.target.value)} />
                    </form>
                    <div className='category-btns'>
                        <button value='hr' onClick={event => handleCategory(event.target.value)}> hr#</button>
                        <button value='sales' onClick={event => handleCategory(event.target.value)}>sales#</button>
                        <button value='finance' onClick={event => handleCategory(event.target.value)}>finance#</button>
                        <button value='technology' onClick={event => handleCategory(event.target.value)}>technology#</button>
                        <button onClick={event => handleCategory(event.target.value)}>ALL</button>
                    </div>
                </div>
            </div>

            <div className='JobsList' >

                <div className='JobListTitles'>
                    <div>
                        <h5>Position</h5>
                    </div>
                    <div className='center-text'>
                        <h5>Category</h5>
                    </div>
                    <div className='center-text'>
                        <h5>Location</h5>
                    </div>
                </div>
                {isLoading ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={Loader} alt='Loader' />
                    </div>
                    :
                    data.map(job => (
                        <JobDetail key={job.id} jobData={job} />
                    ))}
            </div>
        </div>
    );
}
export default JobList;



