import React from "react";
import "./styles.sass";
import Header from "components/Header";
import Footer from "components/Footer";
import Filter from "components/Filter";
import cx from "classnames";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  SwipeableDrawer
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TuneIcon from "@material-ui/icons/Tune";
import { useRefCallback } from "hooks";

const sidebarWidth = 280;

const useStyles = ({ cords, open }) =>
  makeStyles(theme => ({
    mobileSidebar: {
      width: sidebarWidth,
      flexShrink: 0
    },
    mobileSidebarPaper: {
      width: sidebarWidth
    },
    desktopSidebar: {
      width: open ? 0 : sidebarWidth - 18,
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.easeOut,
        duration: 400
      })
    },
    desktopSidebarHide: {
      // padding: "0 12px",
      transition: theme.transitions.create("transform", {
        easing: open
          ? theme.transitions.easing.easeOut
          : theme.transitions.easing.sharp,
        duration: 400
      }),
      transform: open ? `translateX(${-sidebarWidth - 36}px)` : "none",
      bottom: "0 !important",
      maxHeight: "100%"
    },
    desktopSidebarTopPos: {
      top: cords.top <= 140 && cords.top !== 0 ? 116 : 156,
      maxHeight:
        window.innerHeight - (cords.top <= 140 && cords.top !== 0 ? 116 : 156)
    },
    desktopSidebarBottomPos: {
      bottom:
        window.innerHeight -
        (cords.bottom + (cords.top <= 140 && cords.top !== 0 ? 116 : 156))
    }
  }))();

const Layout = ({
  showSidebar,
  showSubheader,
  subheaderTitle,
  hOffset,
  children,
  isCartLocation
}) => {
  const [ref, cords] = useRefCallback({ top: 0, bottom: 116 });
  const matchWidth = useMediaQuery("(max-width: 959.5px)");
  const [state, setstate] = React.useState({
    sidebarOpen: true
  });
  const classes = useStyles({ cords, open: state.sidebarOpen });
  const onOpenSidebar = () => setstate({ sidebarOpen: !state.sidebarOpen });
  const renderSubheader = () => {
    return (
      showSubheader && (
        <>
          <div style={{ height: 20 }} />
          <div
            className={cx("Layout-subheader", {
              sticky: cords.top <= 140 && cords.top !== 0
            })}
          >
            <Typography variant="h5" className="Layout-subheader-title">
              {subheaderTitle}
            </Typography>
            <Button
              onClick={onOpenSidebar}
              endIcon={<TuneIcon fontSize="small" />}
            >
              {!matchWidth && "Filter"}
            </Button>
          </div>
          <div style={{ height: 20 }} />
        </>
      )
    );
  };

  const renderSidebar = () => {
    return (
      showSidebar &&
      (matchWidth ? (
        <SwipeableDrawer
          onClose={onOpenSidebar}
          onOpen={onOpenSidebar}
          open={!state.sidebarOpen}
          ModalProps={{
            keepMounted: true
          }}
          className={classes.mobileSidebar}
          variant="temporary" //persistent
          classes={{
            paper: classes.mobileSidebarPaper
          }}
        >
          <Filter />
        </SwipeableDrawer>
      ) : (
        <>
          <div className={classes.desktopSidebar} />
          <div
            className={cx("Layout-desktopFilter", {
              [classes.desktopSidebarHide]: true,
              [classes.desktopSidebarTopPos]: cords.top < window.innerHeight,
              [classes.desktopSidebarBottomPos]:
                cords.bottom - 200 - window.scrollY <= 0 && cords.bottom !== 116
            })}
          >
            <Filter />
          </div>
        </>
      ))
    );
  };

  return (
    <div className="Layout">
      <Header />
      {renderSubheader()}
      <Box
        className="Layout-main"
        style={{ padding: `0 ${!matchWidth ? hOffset : 0}px` }}
      >
        <div className="Layout-sidebar">{renderSidebar()}</div>
        <div ref={ref} className="Layout-content">
          {children}
        </div>
      </Box>
      <Footer isCartLocation={isCartLocation} />
    </div>
  );
};

export default Layout;
