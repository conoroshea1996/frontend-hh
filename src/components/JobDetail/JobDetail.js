import React from 'react';
import './JobDetail.css';
import { MdKeyboardArrowRight } from 'react-icons/md';


function JobDetail({ jobData }) {

    const { category, hostedUrl, location, title } = jobData;
    return (
        <div className='JobRow'>
            <a href={hostedUrl} target='blank'>
                <div>
                    <h2>{title}</h2>
                </div>
                <div className='center-text '>
                    <h2>{category}</h2>
                </div>
                <div className='center-text '>
                    <h2>{location}</h2>
                </div>
                <div className='center-text '>
                    <MdKeyboardArrowRight fontSize={30} />
                </div>
            </a>
        </div>
    )
}

export default JobDetail
