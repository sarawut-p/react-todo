import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap';

class TodoProgress extends Component {

    render() {
        const { todos } = this.props;
        const total = todos.length;
        const totalDone = todos.filter(item => item.isDone).length;
        if (total === 0 || totalDone === 0) {
            return null;
        }
        const donePercentage = Math.floor((totalDone / total) * 100);
        return <ProgressBar now={donePercentage} label={`${donePercentage}%`} />
    }
}

export default TodoProgress;