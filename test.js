import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import '../../../css/PreviousOptimize.css';

export default class PreviousOptimizing extends React.Component {
    constructor(props) {
        super(props);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            current_page: 1,
        };
    }

    componentDidMount() {
        this.props.previousList(1);
    }

    handlePagination() {
        const page = this.state.current_page;
        const nextPage = page + 1;
        if (page === Math.ceil(this.props.previousOptimization[0].count / 20)) {
            this.setState({ current_page: 1 });
            this.props.previousList(1);
        } else {
            this.setState({ current_page: nextPage });
            this.props.previousList(nextPage);
        }
    }

    handleDelete(id) {
        this.props.deleteOptimized(id);
        if (this.props.previousOptimization[0].data.length === 1) {
            this.props.previousList(this.state.current_page - 1);
            this.setState({ current_page: this.state.current_page - 1 });
        } else {
            this.props.previousList(this.state.current_page);
        }
    }

    render() {
        let totalVal;
        let data;
        if (!this.props.previousOptimization) {
            this.props.previousList(1);
        }
        const optList = this.props.previousOptimization;
        if (optList !== null) {
            totalVal = Math.ceil(optList[0].count / 20);
            /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
            data = optList[0].data;
        }
        return (

            <div className='optimizations-body'>
                {(data && data !== null && data.length > 0)
                    ?
                    /* eslint-disable no-nested-ternary */
                    (<div>{(optList[0].count <= 20)
                        ? ('')
                        : (this.state.current_page < totalVal)
                            ? (<a href={null} className="pagination" onClick={this.handlePagination}>
                                Page {this.state.current_page} of {totalVal} -
                                show previous optimizations
                                (page {this.state.current_page + 1} of {totalVal})
                            </a>)
                            : (
                                <a href={null} className="pagination" onClick={this.handlePagination}>
                                    Page {this.state.current_page} of {
                                        totalVal} - hide previous optimization
                                </a>
                            )}
                    {data.map((item, index) =>
                    /* eslint-disable no-underscore-dangle */
                        <div key={item._id} className="opt-list">
                            {(index + 1) + ((this.state.current_page - 1) * 20)}. Optimization {moment(item.departureTime, 'YYYY-MM-DDTHH:mm').format(
                                'YYYY-MM-DD HH:mm',
                            )}
                            <Button className="pdelete" onClick={() =>
                            /* eslint-disable no-underscore-dangle */
                                this.handleDelete(item._id)}>DEL
                            </Button>
                        </div>)}
                    </div>
                    ) : ('No previous optimization route found!')}
            </div>
        );
    }
}

PreviousOptimizing.propTypes = {
    deleteOptimized: PropTypes.func.isRequired,
    previousList: PropTypes.func.isRequired,
    previousOptimization: PropTypes.array,
};

PreviousOptimizing.defaultProps = {
    previousOptimization: null,
};
