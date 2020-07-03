import React from 'react';
import './navswitch.scss';

const toggleSelector = (ref) => {
    console.log("toggleSelector");
    console.log(ref);

    const currentRef = ref.current;
    const parentNode = currentRef.parentNode;

    currentRef.classList.toggle("is-active");
    parentNode.classList.toggle("is-expanded");

    console.log("parent node class list");
    console.log(parentNode.classList);

}

const NavSwitchButton = React.forwardRef((props, ref) => {
    console.log(props);
    console.log("side nav expanded - navswitch.js%%%%%%%%%%%%%%%%%%")
    console.log(props. shutterflyOpen);
    return (
        <div ref={ref} className="hamburger hamburger--collapse hamburger--arrow is-active"
            onClick={() => { toggleSelector(ref); props.gotClick() }}>
            {props.children}
        </div>
    );
});

const NavSwitch = (props) => {
    const navswitchbuttonref = React.createRef();

    return (
        <NavSwitchButton ref={navswitchbuttonref} gotClick={props.toggleDoor}>
            <span className="hamburger-box">
                <span className="hamburger-inner">
                </span>
            </span>
        </NavSwitchButton>
    )
}

export default NavSwitch;