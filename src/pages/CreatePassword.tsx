import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DefaultLayout from "@/src/components/DefaultLayout";
import Button from "@/src/components/Button";
import Filler from "@/src/components/Filler";
import styles from "@/src/styles/Input.module.scss";
import { storePasswordHash } from "@/src/utils/StorePasswordHash";
import { setPassword } from "@/src/redux/PasswordStateSlice";

// We need these because we create a password prior to both creating a new SRP and reusing an existing SRP
type CreatePasswordProps = {
  nextScreen: string;
};

const CreatePassword = (props: CreatePasswordProps) => {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pass.length > 7 && pass === confirmPass) {
      dispatch(setPassword(pass));
      setIsButtonActive(true);
    } else setIsButtonActive(false);
  }, [pass, confirmPass]);

  return (
    <DefaultLayout>
      <div>Create password: nextScreen: {props.nextScreen}</div>
      <Filler flexGrow={2} />
      <div>
        <input
          className={styles.input}
          type="password"
          name="password"
          onChange={(e) => setPass(e.currentTarget.value)}
        />
        <input
          className={styles.input}
          type="password"
          name="confirmPassword"
          onChange={(e) => setConfirmPass(e.currentTarget.value)}
        />
      </div>
      <Filler flexGrow={1} />
      <Link to={isButtonActive ? props.nextScreen : "#"}>
        <Button active={isButtonActive} onClick={storePasswordHash}>
          Create password
        </Button>
      </Link>
    </DefaultLayout>
  );
};

export default CreatePassword;
