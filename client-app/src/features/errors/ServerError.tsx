import React from 'react';
import { observer } from 'mobx-react-lite';
import { Header, Segment, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const ServerError = () => {

    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="server" style={{marginRight: 30}}>
                    Server Error
                </Icon>
            </Header>
            <Segment.Inline as={Link} to="/errors" primary>
                Return to Error Testing
            </Segment.Inline>
        </Segment>
    )
}

export default observer(ServerError);