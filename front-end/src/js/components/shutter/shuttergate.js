import React from 'react';
import NavSwitch from './navswitch';
import './sfly.scss';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    getNavItems = () => {
        return this.props.menuItems.map((o, idx) => {
            if (o.navKey == this.props.currentPage) {
                return (<div onClick={() => {this.props.showPage(o.path, o.navKey)}} className="farm-bar-item is-slctd">
                    <div className="side-nav-slctn "></div>
                    
                    <div className={o.iconSelector}></div>
                    <div className="side-nav-label">{o.navDisplay}</div>
                </div>)
            } else {
                return (<div onClick={() => {this.props.showPage(o.path, o.navKey)}} className="farm-bar-item ">
                <div className="side-nav-slctn "></div>
                <div className={o.iconSelector}></div>
                <div className="side-nav-label">{o.navDisplay}</div>
            </div>)
            }
        })
    }

    render() {
        return (
            <div className="chip-details-sidenav-wrapper">
                <nav className="side-nav is-collapsed">
                    <NavSwitch cherryUser={this.props.cherryUser} toggleDoor={this.props.toggleDoor}></NavSwitch>
                    <div className="side-nav-itm-wrpr">
                        {this.getNavItems()}
                    </div>
                </nav>
            </div>
        )
    }
}