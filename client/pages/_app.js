import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const AppComponent = ({Component, pageProps, currentUser}) => {

    return (
        <div><Component {...pageProps} />
            <h1>{currentUser.email}</h1>;
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const {data} = await client.get('/api/users/currentuser');
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    console.log('page props', pageProps);
    return {
        pageProps,
        currentUser: data.currentUser
    };
};

export default AppComponent;
