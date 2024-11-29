import { Link } from "react-router-dom";
import * as react from "react";
import DefaultLayout from "@/src/components/DefaultLayout";
import Button from "@/src/components/Button";
import Filler from "@/src/components/Filler";
import { createStoredPassword } from "@/src/utils/crypto";
import styles from "@/src/pages/Input.module.scss";

type CreatePasswordProps = {
  nextScreen: string;
};

const CreatePassword = (props: CreatePasswordProps) => {
  
  const [password, setPassword] = react.useState("");
  const [confirmPassword, setConfirmPassword] = react.useState("");
  const [isActive, setIsActive] = react.useState(false);

  react.useEffect(() => {
    if (password.length > 7 && password === confirmPassword) {
      setIsActive(true);
    } else setIsActive(false);
  }, [password, confirmPassword]);

  const storePassword = () => {
    const storedPass = createStoredPassword(password);
    chrome.storage.local.set({ storedPassword: JSON.stringify(storedPass) });
    console.log("storedPassword set to " + JSON.stringify(storedPass));
  };

  return (
    <DefaultLayout>
      <div>Create password: nextScreen: {props.nextScreen}</div>
      <Filler flexGrow={2} />
      <div>
        <input
          className={styles.input}
          type="password"
          name="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          className={styles.input}
          type="password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
      </div>
      <Filler flexGrow={1} />
      <Link to={isActive ? props.nextScreen : "#"}>
        <Button active={isActive} onClick={storePassword}>
          Create password
        </Button>
      </Link>
    </DefaultLayout>
  );
};

export default CreatePassword;
