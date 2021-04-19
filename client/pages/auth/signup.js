import {useState} from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    };

    return <form onSubmit={onSubmit}>
        <h1>signup</h1>
        <div className="form-group">
            <label>Email address</label>
            <input value={email} onChange={event => setEmail(event.target.value)} type="text" className="form-control"/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input value={password} onChange={event => setPassword(event.target.value)} type="password"
                   className="form-control"/>
        </div>
        {errors}
        <button className="btn btn-primary">Sign up</button>
    </form>;
};

export default SignUp;
