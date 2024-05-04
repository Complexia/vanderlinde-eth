import AuthButton from "./exportedButtons/authButton";
import TxnButton from "./exportedButtons/txnButton";

const TestComp = () => {
  return (
    <div>
        <TxnButton name="Test Transaction" target_chain="baseSepolia" target_address="0x269a639D9A8c6c300250BcC4D561EA9d245A5690" txn_data="0x"/>
        <AuthButton name="Vanderlinde login" client_id="0fa3f656ae609be6598ecef02623d270"/>
    </div>
  )
}

export default TestComp;