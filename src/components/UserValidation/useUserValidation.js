import { useNavigate } from "react-router-dom";

const useRedirect = () => {
    const navigate = useNavigate();
    const redirectHome = () => {
        navigate('/home')
    }

    return {
        redirectHome,
    }
};

export { useRedirect };
