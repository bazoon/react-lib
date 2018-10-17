import React, { Component } from 'react';



export default (Component, permissions, url) => class WithPermissions extends Component  {

    componentDidMount() {
        const options = {
            method: 'POST',
            body: {
                permissions: permissions
            }
        };

        options.body = JSON.stringify(options.body);
        
        return fetch(url, options).then((r) => {
            return r.json().then((r) => {
                
                const result = permissions.reduce((a, n, i) => {
                    a[n] = r[i];
                    
                    return a;
                },{});

                this.setState({
                    permissions: result
                });

            });

        });
    }

    render() {
        const permissions = {
            permissions: this.state.permissions
        };

        return (
            <Component {...this.props} {...permissions}/>
        );
    }

}
