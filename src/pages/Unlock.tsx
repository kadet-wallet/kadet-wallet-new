import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultLayout from "@/src/components/DefaultLayout";
import Button from "@/src/components/Button";
import { checkPasswordHash } from "@/src/utils/CheckPasswordHash";
import { store, RootState } from "@/src/redux/Store";
import { genKeys } from "@/src/utils/Kadena";
import styles from "@/src/styles/Input.module.scss";

const Unlock = () => {
  let valid = useSelector(
    (state: RootState) => state.passwordState.isPasswordValid
  );
  store.subscribe(() => {
    valid = store.getState().passwordState.isPasswordValid;
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkPasswordHash(event.target.value);
  };

  return (
    <DefaultLayout>
      <h1>Unlock wallet</h1>
      <div>
        <input type="password" className={styles.input} onChange={onChange} />
      </div>
      <div>
        {valid && (
          <Link to="/KDADashboard">
            <Button active={valid} onClick={genKeys}>
              Unlock
            </Button>
          </Link>
        )}
        {!valid && <Button active={false}>Unlock</Button>}
      </div>
    </DefaultLayout>
  );
};

export default Unlock;
