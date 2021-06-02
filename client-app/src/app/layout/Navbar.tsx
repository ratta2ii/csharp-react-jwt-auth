import React, { useEffect } from "react";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const NavBar = () => {
  const { userStore: { user, logout } } = useStore();

  useEffect(() => {
  }, [user]);

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
        {!user
           ? <LockIcon style={{ marginRight: 10, fontSize: 28, color: "#f0acac" }} />
           : <LockOpenIcon style={{ marginRight: 10, fontSize: 28, color: "#a7dd68" }} />
        }
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} to="/about" name="About" />
        <Menu.Item as={NavLink} to="/dashboard" name="Dashboard" />
        {!user &&
            <Menu.Item>
            <Button as={Link} to="/login" color="green" style={{fontWeight: 300}} >
                LOGIN
            </Button>
            </Menu.Item>
        }
        {user &&
            <Menu.Item position="right">
            <Image
                src={user?.image || "/assets/user3.png"}
                avatar
                spaced="right"
                />
            <Dropdown pointing="top left" text={user?.displayName}>
                <Dropdown.Menu>
                <Dropdown.Item
                    // TODO: Add Profile and remove disabled attribute
                    as={Link}
                    to={`/profile/${user?.userName}`}
                    text="My Profile"
                    />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                </Dropdown.Menu>
            </Dropdown>
            </Menu.Item>
        }
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
