import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PrivateRouteDevelopers = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>  auth.isAuthenticated === true && localStorage.getItem('role')==='Developers'
            ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
            )
        }
    />
);
PrivateRouteDevelopers.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(PrivateRouteDevelopers);