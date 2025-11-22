import { useEffect, useState } from "react";
import styled from "styled-components";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props) => {
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCheckingAuth(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [props.user]);

    if (checkingAuth) {
        return <p>Loading...</p>;
    }

    if (!props.user) {
        return <Navigate to="/" replace />;
    }
    return (
        <Container>
            {/* {!props.user && <Navigate to="/" />} */}
            <Section>
                <h5>
                    <a>Hiring in a hurry? - </a>
                </h5>
                <p>
                    Find talented pros in record time with Upwork and keep business
                    moving.
                </p>
            </Section>
            <Layout>
                <Leftside />
                <Main />
                <Rightside />
            </Layout>
        </Container>
    )
};

const Container = styled.div`
    padding-top: 52px;
    max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
    min-height: 50px;
    padding: 16px 0;
    box-sizing: content-box;
    text-align: center;
    text-decoration: underline;
    display: flex;
    justify-content: center;

    h5 {
        color: #4f46e5;
        font-size: 14px;
        text-decoration: underline;

        a{
            font-weight: 700;
        }
    }

    p {
        font-size: 14px;
        color: #434649;
        font-weight: 600;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 0 5px;
    }
`;

const Layout = styled.div`
    /* border: 2px solid; */
    display: grid;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
    column-gap: 25px;
    row-gap: 25px;
    margin: 25px 0;
    max-width: 1128px;
    margin: auto;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        padding: 0 5px 50px;
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

export default connect(mapStateToProps)(Home);