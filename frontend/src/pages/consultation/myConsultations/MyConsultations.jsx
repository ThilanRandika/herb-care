import './myConsultations.css';
import MyOngoingConsultations from '../../../components/consultation/myOngoingConsultations/MyOngoingConsultations';
import MyAllConsultations from '../../../components/consultation/myAllConsultations/MyAllConsultations';

function MyConsultations(props) {

  return (
    <>

      <MyOngoingConsultations customerID= {props.customerID}/>
      <MyAllConsultations customerID= {props.customerID}/>

    </>
  )
}

export default MyConsultations