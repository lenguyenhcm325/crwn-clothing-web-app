import { useState } from "react";
// import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
// import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

// import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    // await createUserDocumentFromAuth(user);
    // setCurrentUser(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // setCurrentUser(user);

      resetFormFields();
      //   console.log(response);
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case "auth/user-not-found":
          alert("user not found");
          break;
        case "auth/wrong-password":
          alert("username or password is incorrect");
        default:
          console.log(error);
          break;
      }
    }

    // if (confirmPassword && confirmPassword == password) {
    //   const userAuth = await createAuthUserWithEmailAndPassword(
    //     email,
    //     password
    //   );
    //   const userDocRef1 = await createUserDocumentFromAuth(userAuth);
    //   console.log(userDocRef1);
    // }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button onClick={signInWithGoogle} buttonType="google" type="button">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
