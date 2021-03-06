import React from "react";

const InfinityScroll = (props) => {
  const {
    totalPage,
    callNext,
    loading,
    currentPage,
    interestVal,
    spaceVal,
    keyword,
  } = props;
  
  function throttle(fn, delay) {
    let timer;
    return function() {
        if(!timer) {
            timer=setTimeout(()=> {
                timer=null;
                fn.apply(this,arguments)
            },delay)
        }
    }
}
  const _handleScroll = throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 200) {
      callNext(currentPage, interestVal, spaceVal, keyword);
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [
    currentPage,
    interestVal,
    spaceVal,
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
