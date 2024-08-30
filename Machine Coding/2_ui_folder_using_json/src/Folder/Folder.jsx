import PropTypes from "prop-types";
import { useState } from "react";

const Folder = ({ fileExplorer }) => {
  const [isFolderClicked, setIsFolderClicked] = useState(false);

  if (fileExplorer.isFolder) {
    return (
      <div>
        <div onClick={() => setIsFolderClicked(!isFolderClicked)}>
          {fileExplorer.name}
        </div>
        {fileExplorer.items.map((item) => {
          return (
            <div
              key={item.name}
              style={{
                display: isFolderClicked ? "block" : "none",
                paddingLeft: "10px",
              }}>
              <Folder fileExplorer={item} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>{fileExplorer.name}</div>;
  }
};

export default Folder;

Folder.propTypes = {
  fileExplorer: PropTypes.object,
};
