import React from "react";
import VideoInput from "./components/VideoInput";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import HandleCSV from "./components/HandleCSV";

export default function App() {



  return (
    <div className="App">
      <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Videotate
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="item-video">
          <VideoInput />
        </div>
        <div className="Scrollable">
          <HandleCSV />
        </div>


      </div>
    </div >

  );
}
