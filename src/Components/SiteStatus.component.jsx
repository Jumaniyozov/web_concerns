import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

const SiteStatus = ({outputData}) => {
    const {
        cookie_dict,
        external_js,
        headers,
        password_autocomplete,
        xss_vulnerabilities
    } = JSON.parse(outputData);

    const xContent = headers["X-Content-Type-Options"];
    const xFrame = headers["X-Frame-Options"];

    return (
        <>
            <Container className="mt-lg-5">
                <Row>
                    <Col>
                        {
                            outputData &&
                            <>
                                {
                                    cookie_dict.notHttpOnly.length > 1
                                        ?
                                        (
                                            <>
                                                <p>Множество не "HttpOnly" куки присутсвуют</p>
                                            </>

                                        ) : (
                                            <>
                                                <p>Множество не "HttpOnly" куки нет</p>
                                            </>
                                        )
                                }
                                {<hr/>}
                                {
                                    external_js.external_js.length > 0
                                        ?
                                        (<p>
                                            Загружает сторонний JS
                                        </p>)
                                        : (
                                            <p>Не загружает сторонний JS</p>
                                        )
                                }
                                {<hr/>}
                                {
                                    headers &&
                                    <>
                                        {
                                            xContent
                                                ? <p>Заголовок X-Content-Type-Options присутсвует</p>
                                                : <p>Заголовок X-Content-Type-Options отсутсвует</p>
                                        }
                                        {
                                            xFrame
                                                ? <p>Заголовок X-Frame-Options присутсвует</p>
                                                : <p>Заголовок X-Frame-Options отсутсвует</p>
                                        }
                                    </>
                                }
                                {<hr/>}
                                {
                                    password_autocomplete.length > 0 &&
                                    password_autocomplete.autocomplete
                                        ? <p>Автозаполнение паролья включено</p>
                                        : <p>Автозаполнение паролья отсутсвует</p>
                                }
                                {<hr/>}
                                {
                                    xss_vulnerabilities.length > 0 &&
                                    xss_vulnerabilities.vulnerable_to_xss
                                        ? <p>Уязвим к XSS атакам</p>
                                        : <p>Неуязвим к XSS атакам</p>
                                }
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SiteStatus;
