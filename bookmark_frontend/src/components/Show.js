import React from "react";

class Show extends React.Component {
  render() {
    return (
      <>
        <div className="details">
          <h3>Bookmark Info:</h3>
          <hr />
          <h4> {this.props.bookmark.title} </h4>
          <h4> {this.props.bookmark.url} </h4>
          
        </div>
      </>
    );
  }
}
export default Show;
