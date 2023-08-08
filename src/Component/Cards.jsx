import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import '../index.css';

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getData() {
            setLoading(true);
            const _data = await getDocs(moviesRef);
            _data.forEach((doc) => {
                setData((prv) => [...prv, { ...(doc.data()), id: doc.id }]);
            })
            setLoading(false);
        }
        getData();
    }, [])

    return (
        <div className='flex flex-wrap justify-between px-3 mt-2'>
            {loading ? <div className='w-full flex justify-center items-center h-96'><Puff height={90} color='white' /></div> :
                data.map((e, i) => {
                    return (

                        <Link to={`/detail/${e.id}`}>
                            <div key={i.id} className='card font-bold shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
                                <img className='image  h-60 md:h-72' src={e.image} alt='' />
                                <h1><span className='text-blue-400 '>Name:</span>{e.title}</h1>
                                <h1 className='flex items-center mr-1 '><span className='text-blue-400'>Rating:</span>
                                    <ReactStars size={20} half={true} value={e.rating/e.rated} edit={false} />
                                </h1>
                                <h1><span className='text-blue-400'>Year:</span>{e.year}</h1>

                            </div>
                        </Link>

                    )
                })
            }

        </div>
    )
}

export default Cards;