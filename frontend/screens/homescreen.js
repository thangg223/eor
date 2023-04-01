import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../actions/categoryActions';
import { listFeaturedProducts } from '../actions/productActions';

import Banner from '../components/banner/Banner';
import Categories from '../components/Categories/Categories';
import FeaturedProduct from '../components/FeaturedProduct/FeaturedProduct';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();
  
  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = categoryList;
  
  const featuredProductList = useSelector((state) => state.featuredProductList);
  const { loading: loadingFeaturedProducts, error: errorFeaturedProducts, products: featuredProducts } = featuredProductList;

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listFeaturedProducts());
  }, [dispatch]);

  return (
    <>
      <Banner />
      {loadingCategories ? (
        <Loader />
      ) : errorCategories ? (
        <Message variant="danger">{errorCategories}</Message>
      ) : (
        <Categories categories={categories} />
      )}
      {loadingFeaturedProducts ? (
        <Loader />
      ) : errorFeaturedProducts ? (
        <Message variant="danger">{errorFeaturedProducts}</Message>
      ) : (
        <FeaturedProduct products={featuredProducts} />
      )}
    </>
  );
};

export default HomeScreen;
