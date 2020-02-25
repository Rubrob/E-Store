import React from "react";
import "./styles.sass";
import ReactIdSwiper from "react-id-swiper";
import { Button } from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const Swiper = React.memo(({ children, params }) => (
  <ReactIdSwiper {...params}>{children}</ReactIdSwiper>
));

const thumbnailStyles = {
  height: 60,
  width: 60,
  maxWidth: 60,
  maxHeight: 60
};
const galleryStyles = {
  minWidth: 300,
  maxWidth: 600
};

const SliderNavigation = ({ direction, classes, ...rest }) => (
  <Button className={classes} {...rest}>
    {direction === "up" ? (
      <ArrowUpIcon />
    ) : direction === "down" ? (
      <ArrowDownIcon />
    ) : direction === "left" ? (
      <ArrowLeftIcon />
    ) : direction === "right" ? (
      <ArrowRightIcon />
    ) : null}
  </Button>
);

export default React.memo(({ images }) => {
  const generateData = styles => {
    return images.map((image, idx) => ({
      idx: idx + 1,
      image,
      styles
    }));
  };

  const SlideItem = ({ image, styles }) => (
    <img src={image} style={styles} className="swiper-slide" alt="img" />
  );
  // Swiper instances
  const [gallerySwiper, getGallerySwiper] = React.useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = React.useState(null);

  React.useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // Slides current index
  const [currentIndex, updateCurrentIndex] = React.useState(0);

  const params = {
    slidesPerView: 5,
    // mousewheel: true,
    // freeMode: true,
    lazy: true,
    spaceBetween: 5,
    touchRatio: 0.5,
    centeredSlides: true,
    slideToClickedSlide: true,
    containerClass: "slider1",
    direction: "vertical",
    getSwiper: getThumbnailSwiper
  };

  const params2 = {
    // swipe: false,
    // freeMode: true,
    // mousewheel: true,
    effect: "fade",
    lazy: true,
    containerClass: "slider2",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },

    renderPrevButton: () => (
      <SliderNavigation
        direction="left"
        classes="swiper-button-prev swiper-arrows--prev"
      />
    ),
    renderNextButton: () => (
      <SliderNavigation
        direction="right"
        classes="swiper-button-next swiper-arrows--next"
      />
    ),
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false
    },
    getSwiper: getGallerySwiper
  };

  // Manipulate swiper from outside
  const goNext = () => {
    if (thumbnailSwiper !== null) thumbnailSwiper.slideNext();
  };

  const goPrev = () => {
    if (thumbnailSwiper !== null) thumbnailSwiper.slidePrev();
  };

  const renderItem = React.useCallback(
    ({ idx, image, styles }) => (
      <SlideItem image={image} key={`slide_${idx}`} styles={styles} />
    ),
    []
  );

  const updateIndex = React.useCallback(
    () => updateCurrentIndex(thumbnailSwiper.realIndex),
    [thumbnailSwiper]
  );
  // console.log(thumbnailSwiper != null && thumbnailSwiper.realIndex)

  // Add eventlisteners for swiper after initializing
  React.useEffect(() => {
    if (thumbnailSwiper !== null) {
      thumbnailSwiper.on("slideChange", updateIndex);
    }
    return () => {
      if (thumbnailSwiper !== null)
        thumbnailSwiper.off("slideChange", updateIndex);
    };
  }, [thumbnailSwiper, updateIndex, images]);

  React.useEffect(() => {
    if (gallerySwiper !== null) gallerySwiper.slideTo(0, 0);
  }, [images]);

  // const renderIndexMsg = () => (
  //   <div>
  //     Slide idx is <span>{currentIndex}</span>
  //   </div>
  // )

  return (
    images.length && (
      <div className="ProductSlider">
        <div className="s1">
          <SliderNavigation
            direction="up"
            onClick={goPrev}
            disabled={
              thumbnailSwiper !== null && thumbnailSwiper.realIndex === 0
            }
          />
          <Swiper params={params}>
            {generateData(thumbnailStyles).map(renderItem)}
          </Swiper>
          <SliderNavigation
            direction="down"
            onClick={goNext}
            disabled={
              thumbnailSwiper !== null &&
              thumbnailSwiper.realIndex === images.length - 1
            }
          />
        </div>

        <div style={{ minWidth: 300 }}>
          <div className="s2">
            <Swiper params={params2}>
              {generateData(galleryStyles).map(renderItem)}
            </Swiper>
          </div>
        </div>
      </div>
    )
  );
});
