import './myConsultations.css';
import MyOngoingConsultations from '../../../components/consultation/myOngoingConsultations/MyOngoingConsultations';
import MyAllConsultations from '../../../components/consultation/myAllConsultations/MyAllConsultations';
import MyCancelledConsultations from '../../../components/consultation/myCancelledConsultations/MyCancelledConsultations';
import MyRejectedConsultations from '../../../components/consultation/myRejectedConsultations/MyRejectedConsultations';

function MyConsultations() {

  return (
    <>

      <MyOngoingConsultations />
      <MyAllConsultations />
      <MyCancelledConsultations />
      <MyRejectedConsultations />

    </>
  )
}

export default MyConsultations