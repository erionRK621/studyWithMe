import React from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
  const {
    totalPage,
    callNext,
    loading,
    currentPage,
    interestVal,
    spaceVal,
    studyMateVal,
    keyword,
  } = props;
  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 200) {
      callNext(currentPage, interestVal, spaceVal, studyMateVal, keyword);
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [
    currentPage,
    interestVal,
    spaceVal,
    studyMateVal,
    keyword,
  ]);
  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (currentPage < totalPage) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPage, loading]);
  return <React.Fragment>{props.children}</React.Fragment>;
};
InfinityScroll.defaultProps = {
  callNext: () => {},
  loading: false,
};

export default InfinityScroll;
