import './myConsultations.css';
import MyOngoingConsultations from '../../../components/consultation/myOngoingConsultations/MyOngoingConsultations';
import MyAllConsultations from '../../../components/consultation/myAllConsultations/MyAllConsultations';
import MyCancelledConsultations from '../../../components/consultation/myCancelledConsultations/MyCancelledConsultations';
import MyRejectedConsultations from '../../../components/consultation/myRejectedConsultations/MyRejectedConsultations';

function MyConsultations(props) {

  return (
    <>

      <MyOngoingConsultations customerID= {props.customerID}/>
      <MyAllConsultations customerID= {props.customerID}/>
      <MyCancelledConsultations customerID= {props.customerID} />
      <MyRejectedConsultations  customerID ={props.customerID}/>

    </>
  )
}

export default MyConsultations