import React from 'react';
import './styles.sass';
import { connect } from 'react-redux';
import { useMediaQuery, SwipeableDrawer, Typography } from '@material-ui/core';
import { filterURL, filterProductsWithURL } from 'redux/actions/products';
import { toggleFilter } from 'redux/actions/trigers';
import SubHeader from '../SubHeader';
import Filter from '../SubHeader/Filter';
import ProductCard from './ProductCard';

const ProductList = ({
    match,
    filtered,
    currency,
    searchedStr,
    isFilterOpen,
    toggle,
}) => {
    const URL = filterURL(match.params.filter, '-', 2);

    const matchMedia = useMediaQuery('(max-width: 959.5px)');
    const productCards = filtered.map((product) => (
        <ProductCard key={product._id} product={product} currency={currency} />
    ));

    React.useEffect(() => {
        filterProductsWithURL(URL);
    }, [URL]);

    return (
        <div className='productList'>
            <SubHeader />
            {matchMedia && filtered.length > 0 && (
                <Typography variant='h5' children={searchedStr} />
            )}
            <div className='flexRow'>
                {matchMedia ? (
                    <SwipeableDrawer
                        open={isFilterOpen}
                        onClose={toggle}
                        onOpen={toggle}
                        children={<Filter />}
                    />
                ) : (
                    <Filter hide={isFilterOpen} />
                )}
                <div className='productList-content'>
                    <div className='productList-content-main'>
                        {filtered.length < 1 ? (
                            <Typography
                                variant='h5'
                                align='center'
                                className='productList-empty'
                            >
                                I Couldn't Find Anything For Your Request
                            </Typography>
                        ) : (
                            productCards
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(
    (state) => ({
        filtered: state.products.filtered,
        searchedStr: state.products.searchedStr,
        currency: state.products.currency,
        isFilterOpen: state.trigers.filter,
    }),
    (dispatch) => ({
        toggle: () => dispatch(toggleFilter()),
    })
)(ProductList);
