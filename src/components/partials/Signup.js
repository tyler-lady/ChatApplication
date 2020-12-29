import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//TODO: I think should bring in Formik for forms here and on Login

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordAgain: '',
            name: '',
            username: '',
            error: ''
        }
    }

    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="form-wrapper">
                            <h3>Signup</h3>
                            <form
                                onSubmit={e => {
                                    //TODO:redo this validation using formik
                                    e.preventDefault();
                                    if(this.props.socket){
                                        let empty = 0;
                                        Object.keys(this.state).map(key => { //should we be using object.values() which returns an array of the values, which we could then map over
                                            if(this.state[key] === ''){ //this always returns the all fields required error. 
                                                empty += 1;
                                            }
                                        })

                                        if(empty > 0){
                                            return this.setState({error: 'All Fields Required'});
                                        } else {
                                            if(this.state.password !== this.state.passwordAgain){
                                                return this.setState({error: 'Passwords Must Match'})
                                            }
                                        }
                                        this.props.socket.send(JSON.stringify({
                                            type: 'SIGNUP',
                                            data: {
                                                email: this.state.email,
                                                password: this.state.password,
                                                name: this.state.name,
                                                username: this.state.username
                                            }
                                        }))
                                    }
                                }}
                            >
                                {this.state.error ?
                                    <p className='text-danger'>{this.state.error}</p>
                                : null}
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Name</label>
                                            <input
                                                type='name'
                                                className='form-control'
                                                placeholder='Name'
                                                value={this.state.name}
                                                onChange={e => this.setState({name:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Username</label>
                                            <input
                                                type='username'
                                                className='form-control'
                                                placeholder='Username'
                                                value={this.state.username}
                                                onChange={e => this.setState({username:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Email</label>
                                            <input
                                                type='email'
                                                className='form-control'
                                                placeholder='Email'
                                                value={this.state.email}
                                                onChange={e => this.setState({email:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Password</label>
                                            <input
                                                type='password'
                                                className='form-control'
                                                placeholder='Password'
                                                value={this.state.password}
                                                onChange={e => this.setState({password:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <label>Confirm Password</label>
                                            <input
                                                type='password'
                                                className='form-control'
                                                placeholder='Password'
                                                value={this.state.passwordAgain}
                                                onChange={e => this.setState({passwordAgain:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button className='btn btn-primary' type='submit'>
                                        Signup
                                    </button>
                                    <p>Already have an account? <Link to='/login'>Login Here</Link></p>
                                </div>                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.auth,
    ...state.chat
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);