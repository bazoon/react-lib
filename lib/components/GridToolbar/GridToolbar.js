import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faFilter, faPollH, faDownload } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../react-lib/lib/components/button/Button';

import './grid-toolbar.scss';

export default class extends Component {
    render() {
        return (
            <div className="grid-toolbar">
                <div className="grid-toolbar">
                    <div className="grid-toolbar__wrapper">
                        <div className="grid-toolbar__button">
                            <Button type="gray" size="sm">Добавить</Button>
                        </div>
                        <div className="grid-toolbar__button">
                            <FontAwesomeIcon icon={faSyncAlt} color="rgb(143, 143, 140)"/>
                        </div>
                        <div className="grid-toolbar__button">
                            <FontAwesomeIcon icon={faSearch} color="rgb(143, 143, 140)"/>
                        </div>
                        <div className="grid-toolbar__button">
                            <FontAwesomeIcon icon={faFilter} color="rgb(143, 143, 140)"/>
                        </div>
                        <div className="grid-toolbar__button">
                            <FontAwesomeIcon icon={faPollH} color="rgb(143, 143, 140)"/>
                        </div>
                        <div className="grid-toolbar__button">
                            <FontAwesomeIcon icon={faDownload} color="#dadada"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
