import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PrivateRoutePM = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>  auth.isAuthenticated === true && localStorage.getItem('role')==='PM'
            ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
            )
        }
    />
);
PrivateRoutePM.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoutePM);
