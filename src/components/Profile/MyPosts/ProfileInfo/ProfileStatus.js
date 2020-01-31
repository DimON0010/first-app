import React from 'react';

class ProfileStatus extends React.Component{

    state = {
      editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }

    render() {
        return <div>
            <div>
                { !this.state.editMode &&
                <span onDoubleClick={ this.activateEditMode }>{this.props.status || "No status"}</span>
                }
            </div>

            <div>
                { this.state.editMode &&
                <input onChange={this.onStatusChange} autoFocus={true} onBlur={ this.deactivateEditMode } value={this.state.status} />
                }
            </div>
            </div>
    }

}

export default ProfileStatus;