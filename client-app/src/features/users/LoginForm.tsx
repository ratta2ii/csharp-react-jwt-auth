import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const LoginForm = () => {
  const { userStore, modalStore } = useStore();
  const { login } = userStore;
  const { openModal } = modalStore;

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        login(values).catch((error) =>
          setErrors({ error: "Email or Password did not match!" })
        )
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h3"
            content="C#-React-JWT-Auth Login"
            color="teal"
            textAlign="center"
          />
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            <Link to="#" onClick={() => openModal(<RegisterForm />)}>
              Register New Account Here!
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);

//! Material-UI Form below
// import React, { ChangeEvent, useState } from "react";
// import { Link } from "react-router-dom";
// import { Button, TextField, Paper, Typography } from "@material-ui/core";
// import { useStore } from "../../app/stores/store";
// import { makeStyles } from "@material-ui/core/styles";
// import RegisterForm from "./RegisterForm";

// const useStyles = makeStyles(theme => ({
//     button: {
//         margin: theme.spacing(1),
//         height: 30,
//         marginTop: 25,
//         backgroundColor: "#21ba45",
//         color: "white",
//     },
//     leftIcon: {
//         marginRight: theme.spacing(1)
//     },
//     rightIcon: {
//         marginLeft: theme.spacing(1)
//     },
//     iconSmall: {
//         fontSize: 20
//     },
//     root: {
//         padding: theme.spacing(3, 2),
//         maxWidth: 350,
//     },
//     textField: {
//         margin: "5px 8px",
//         width: 300,
//     }
// }));

// interface Props {
//   formName: string;
//   formDescription: string;
// }

// const LoginForm = ({ formName, formDescription }: Props) => {
//   const classes = useStyles();
//   const { userStore, modalStore } = useStore();
//   const { login } = userStore;
//   const { openModal } = modalStore;

//   const [loginCredentials, setLoginCredentials] = useState<any>({
//     email: "",
//     password: "",
//   });

//   const handleInput = (
//     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = event.target;
//     setLoginCredentials({ ...loginCredentials, [name]: value });
//   };

//   const handleOnSubmit = (event: any) => {
//     event.preventDefault();
//     login(loginCredentials).catch((error) =>
//         console.log(error)
//     );
//   };

//   return (
//     <div style={{ width: 450, padding: 50, backgroundColor: "lightgray", margin: "200px auto" }}>
//       <Paper className={classes.root}>
//         <Typography variant="h5" component="h3">
//           Login to your Account
//         </Typography>
//         <Typography component="p" style={{ fontSize: 12, margin: 10 }}>
//           Important: Enter the email used to register this account
//         </Typography>

//         <form onSubmit={handleOnSubmit}>
//           <TextField
//             label="Email"
//             placeholder="Enter your email here"
//             name="email"
//             defaultValue={loginCredentials.username}
//             onChange={handleInput}
//             id="margin-normal"
//             className={classes.textField}
//             helperText="Enter your Email"
//             variant="filled"
//           />
//           <TextField
//             label="Password"
//             id="margin-normal"
//             name="password"
//             defaultValue={loginCredentials.password}
//             placeholder="Enter your email here"
//             className={classes.textField}
//             helperText="Enter your Password"
//             variant="outlined"
//             onChange={handleInput}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             className={classes.button}
//           >
//             Login
//           </Button>
//         </form>
//         <div
//           style={{
//             textAlign: "center",
//             marginTop: 15,
//           }}
//         >
//           {/* <Link to="/register">Register New Account Here!</Link> */}
//           <Link to="#" onClick={() => openModal(<RegisterForm />)} >
//               Need an account? SignUp HERE
//           </Link>
//         </div>
//       </Paper>
//     </div>
//   );
// };

// export default LoginForm;
