import React from 'react';
import { Card, Button } from 'react-bootstrap';

const SourcesCard = (props) => {
    const { name, description, category, id } = props.source;

    return (
        <Card className="shadow mb-3" bg="info" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <h5 className="text-dark">{category}</h5>
                <Card.Text>
                    {description}
                </Card.Text>
                {
                    props.userSources.includes(id) ?
                        <Button onClick={() => props.handleUnsubscribe(id)} className="fa fa-minus-circle" variant="danger"> Unsubscribe</Button>

                        : <Button onClick={() => props.handleSubscribe(id)} className="fa fa-plus-circle" variant="secondary"> Subscribe</Button>
                }
            </Card.Body>
        </Card>
    );
}

export default SourcesCard;