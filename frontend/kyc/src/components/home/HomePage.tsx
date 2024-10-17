import ClientRegistration from "../auth/client/ClientRegistration";
import Login from "../auth/login/Login";

export default () => {
    return (
        <div>
        <Login/>
        <ClientRegistration/>
        </div>
    );
}