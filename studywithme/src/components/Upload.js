import React from 'react';

const Upload = (props) => {
    const {_onChange} = props;
    const fileInput = React.useRef();
    return (
        <React.Fragment>
            <input type="file" onChange={_onChange} ref={fileInput} accept="image/*" />
        </React.Fragment>
    );
};

Upload.defaultProps = {
    _onChange: () => {},
}


export default Upload;