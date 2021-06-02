import React from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Segment } from "semantic-ui-react";

const NotFound = ()  => {

    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search">
                    We could not find this.
                </Icon>
            </Header>
            <Segment.Inline as={Link} to="/errors" primary>
                Return to Error Testing
            </Segment.Inline>
        </Segment>
    )
}

export default NotFound;