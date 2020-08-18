import React from 'react';
import { IonCol, IonGrid, IonRow, IonIcon, IonButton } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

interface VpnItem {
  username: string;
  company_name: string;
  devices: Array<string>;
}

interface ContainerProps {
    vpnList: Array<VpnItem>;
}

const VpnContainer: React.FC<ContainerProps> = ({ vpnList }) => {
    // const body = vpnList.map( e => 
    //   <IonRow>
    //     <IonCol>{e.username}</IonCol>
    //     <IonCol>{e.company_name}</IonCol>
    //     <IonCol>
    //       <IonIcon icon={trashOutline} color="danger"></IonIcon>
    //     </IonCol>
    //   </IonRow>
    // );
    const body = vpnList.map(e=>
    <tr key={e.username}>
      <td>{e.username}</td>
      <td>{e.company_name}</td>
      <td><a><IonIcon icon={trashOutline} color="danger"></IonIcon></a></td>
    </tr>
    );
    // return (
    //   <IonGrid>
    //     <IonRow>
    //       <IonCol>用户</IonCol>
    //       <IonCol>公司</IonCol>
    //       <IonCol>操作</IonCol>
    //     </IonRow> 
    //     {body}
    //   </IonGrid>
    // );
    return (
      <table>
        <thead>
          <tr>
            <th>用户</th>
            <th>公司</th>
          </tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
    )
  };

  export default VpnContainer;