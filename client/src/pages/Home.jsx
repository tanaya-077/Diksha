import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bannerMobile from '../assets/banner-mobile2.jpg';
import banner from '../assets/banner.png';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import { valideURLConvert } from '../utils/valideURLConvert';
import Reviews from '../components/Reviews';

const Home = () => {
  const { loadingCategory, allCategory: categoryData, allSubCategory: subCategoryData } = useSelector(state => state.product);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => sub.category.some(c => c._id === id));
    if (!subcategory) {
      console.error('Subcategory not found');
      return;
    }

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
    navigate(url);
  };

  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}>
          <img src={banner} className='w-full h-full hidden lg:block' alt='banner' />
          <img src={bannerMobile} className='w-full h-full lg:hidden' alt='banner' />
        </div>
      </div>

      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
        {loadingCategory ? (
          new Array(12).fill(null).map((_, index) => (
            <div key={`loadingcategory-${index}`} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
              <div className='bg-blue-100 min-h-24 rounded'></div>
              <div className='bg-blue-100 h-8 rounded'></div>
            </div>
          ))
        ) : (
          categoryData.map(cat => (
            <div key={cat._id} className='w-full h-full cursor-pointer' onClick={() => handleRedirectProductListpage(cat._id, cat.name)}>
              <img src={cat.image} className='w-full h-full object-scale-down' alt={cat.name} />
            </div>
          ))
        )}
      </div>

      {categoryData?.map(c => (
        <CategoryWiseProductDisplay key={c._id} id={c._id} name={c.name} />
      ))}

      <Reviews />
    </section>
  );
};

export default Home;