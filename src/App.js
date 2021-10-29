import './App.css';
import React, {useEffect, useState} from "react";
import SiteStatus from "./Components/SiteStatus.component";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {Button, Col, Container, FormControl, InputGroup, Row, Spinner} from "react-bootstrap";

function App() {
    const [siteName, setSiteName] = useState(null);
    const [siteData, setSiteData] = useState(null);
    const [outputData, setOutputData] = useState(null);
    const [fetching, setFetching] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFetching(true);
        const fetchedData = await fetch(`https://concerns-web.herokuapp.com/searchsite/?q=${siteName}`)
        const res = await fetchedData.json();
        setSiteData(res);
    }

    useEffect(() => {
        if (siteData !== null) {
            setOutputData(JSON.stringify(siteData));
            setFetching(false);
        }
        return () => {
            setOutputData(null);
        }
    }, [siteData])

    return (
        <>
            <Container className="mt-lg-5 d-flex align-items-center justify-content-center">
                <Row className="w-75">
                    <Col>
                        <div>
                            <InputGroup className="w-100">
                                <FormControl
                                    placeholder="Имя сайта например google.com"
                                    aria-label="Имя сайта"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => setSiteName(e.target.value)}
                                />
                                <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit}
                                        disabled={fetching}>
                                    Проверить
                                </Button>
                            </InputGroup>

                        </div>
                        <div >
                            {
                                fetching &&
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
            {
                outputData && fetching === false &&
                <>
                    <SiteStatus outputData={outputData}/>
                </>
            }
        </>
    );
}

export default App;
