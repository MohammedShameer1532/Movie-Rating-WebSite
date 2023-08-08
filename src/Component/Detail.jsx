import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Puff } from 'react-loader-spinner';
import Reviews from './Reviews';

const Detail = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating:0,
    rated:0,
  });
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movies", id)
      const _data = await getDoc(_doc)
      setData(_data.data());
      setLoading(false);

    }
    getData();

  }, [])
  return (

    <div className='p-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
      {loading ? <div className='w-full flex justify-center items-center h-96'> <Puff height={90} color='white' /></div> :
        <>
          <img className='img2 h-96 block md:sticky top-24' src={data.image} alt="" />
          <div className='md:ml-4 ml-0 w-full md:w-1/2'>
            <h1 className='text-4xl font-bold text-gray-300'>{data.title} <span className='text-xl'>{data.year}</span></h1>
            <ReactStars
              size={20}
              half={true}
              value={data.rating/data.rated}
              edit={false} />
            <p className='mt-3'>{data.description}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
          </div>

        </>
      }
    </div>
  )
}

export default Detail;