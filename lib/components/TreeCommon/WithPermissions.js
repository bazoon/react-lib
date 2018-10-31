import React, { Component } from 'react';



export default (Component, permissions, url) => class WithPermissions extends Component  {

    // TODO вызывается дважды
    // Вероятно этот react-cosmos так странно компонент рендерит
    // Проверить не будет ли тоже самое в продакшне
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
