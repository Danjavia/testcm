import React from 'react';  
import ReactDOM from 'react-dom';

class App extends React.Component {  
  constructor (props) {
      super(props);
      this.state = {};
  }

  render() {
    return (
        <div>
            Hello Danny!
        </div>
    );
  }

}

ReactDOM.render(<App />, document.querySelector("#content")); 