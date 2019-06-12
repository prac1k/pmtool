import React from 'react';
import { createPortal } from "react-dom";
import "../styles/modal.css"
const modalRoot = document.getElementById('modal-root');


class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }


    render() {
        if (this.props.open) {
            return createPortal(
                <div className="modal-wrapper">
                    <div className="modal">
                        {this.props.children}
                    </div>
                </div>,
                this.el ,
            );
        }

        document.body.style.overflow = "";
        return null
    }
}

export default Modal;
