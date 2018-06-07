import React, { Component } from 'react';
import logo from './../images/logo.png'
import axios from 'axios';


class HomePage extends Component {

  constructor(props) {
    super(props);
    console.log("HomePage constructor()");

    this.state = {
      tabs: [],
      leftNavs: [],
      tabIndex: 0,
      order: 0,
      selectedPage: "https://witech2-6f881.firebaseapp.com/wiTECH2_infoDisplay.html"
    }

    this.activateSelectedTab = this.activateSelectedTab.bind(this);
    this.activateSelectedLeftNav = this.activateSelectedLeftNav.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount()');

    axios.get('https://ravichandran.co/data/menu.json', {headers: {"Access-Control-Allow-Origin": "true"}})
      .then(response => {
        let data = response.data;
        this.setState(
          {
            tabs: data.tabs,
            leftNavs: data.leftNavs,
            tabIndex: data.tabIndex,
            order: data.order,
            pages: data.pages
          }
        )
      })   
  }

  activateSelectedTab(e) {
    console.log('activateSelectedTab()');
    let selectedIndex = Number(e.currentTarget.dataset.param);
    let page = this.state.pages.filter(function (item) {
      return (item.tabIndex === selectedIndex && item.order === 0)
    })

    this.setState(
      {
        tabIndex: selectedIndex,
        order: 0,
        selectedPage: page[0] === undefined ? '404 Page not found': page[0].content
      }
    );
  }

  activateSelectedLeftNav(e) {
    console.log('activateSelectedLeftNav()');
    let selectedIndex = Number(e.currentTarget.dataset.param);
    let tabIndex = this.state.tabIndex;
    let page = this.state.pages.filter(function (item) {
      return (item.tabIndex === tabIndex && item.order === selectedIndex)
    })

    this.setState(
      {
        order: selectedIndex,
        selectedPage: page[0] === undefined ? '404 Page not found': page[0].content
      }
    );
  }


  render() {

    let tabList = this.state.tabs;
    let leftNavList = this.state.leftNavs;
    let tabIndex = this.state.tabIndex;
    let selectedPage = this.state.selectedPage;



    return (
      <div className="container-fluid">

        {/* menu-top */}
        <div className="row menu-top">
          <ul className="nav justify-content-left">

            {tabList.map(tab =>
              <li className="nav-item">
                <a className={this.state.tabIndex === tab.tabIndex ? "nav-link active brd-around-active" : "nav-link"}
                  onClick={this.activateSelectedTab}
                  data-param={tab.tabIndex}
                  key={tab.tabIndex}
                  href="#"> {tab.label}</a>
              </li>
            )}

          </ul>
        </div>
        {/* menu-top ends */}


        <div className="row">
          {/*Side Nav*/}
          <div className="col-sm-3 side-menu-bg sidebar" style={{ minHeight: 'calc(100vh - 60px)' }}>
            <div className="text-center">
              <img src={logo} alt="TechTools" />
            </div>
            <p className="title1">Software Downloads</p>
            <nav>
              <ul className="nav nav-pills flex-column g-font-size-12">

                {
                  leftNavList
                    .filter(function (nItem) { return (tabIndex === nItem.tabIndex) })
                    .map(nav =>

                      <li className={nav.order === 0 ? "nav-item g-border-top" : "nav-item"}>
                        <a
                          className={this.state.order === nav.order ? "nav-link active" : "nav-link"}
                          onClick={this.activateSelectedLeftNav}
                          data-param={nav.order}
                          key={nav.order}
                          href="#">{nav.label}</a>
                      </li>
                    )}

              </ul>
            </nav>
          </div>
          {/*Side Nav ends*/}
          
          {/*Body content */}
          <main className="col-sm-9" style={{ minHeight: 'calc(100vh - 60px)' }}>
            <div>
              <iframe height="500" width="100%" frameBorder='0' src={selectedPage} title="wiTECH2"></iframe>
            </div>
          </main>

        </div>

      </div>

    );
  }
}

export default HomePage;