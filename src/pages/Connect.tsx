import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading,
  IonList, IonItem, IonLabel, IonInput, IonText, IonSelect, IonSelectOption, IonButton, IonImg
} from '@ionic/react';
import './Connect.css';
import { useSiteSpeed } from '../hooks/useSiteSpeed';

const Connect: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [addr, setAddr] = useState<string>();
  const { site, connect } = useSiteSpeed();
  const [showLoading, setShowLoading] = useState(true);
  //start timestamp
  let start = new Date().getTime();
  let i = 3;
  console.log(username, password, addr);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connect</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading
          cssClass='my-custom-class'
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
          duration={5000}
        />
        { showLoading &&
          site.map(d=> 
          <IonImg key={d.name} src={d.src + '?' + start} onIonImgDidLoad={ e=> {
            let latency = new Date().getTime() - start;
            d.latency = latency
            i -= 1
            if( i == 1) {
              let node = site[0]
              site.forEach(e=>{ if(e.latency != -1 && e.latency < node.latency) node = e})
              setAddr(node.addr)
              setShowLoading(false);
            }
          }} ></IonImg> )
        }
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Connect</IonTitle>
          </IonToolbar>
        </IonHeader>
            <form>
              <IonList lines="full" class="ion-no-margin ion-no-padding">
                <IonItem>
                  <IonLabel position="floating">Site</IonLabel>
                  <IonSelect value={addr} placeholder="Select One" onIonChange={e => setAddr(e.detail.value)}>
                    {
                    site.map(e => <IonSelectOption key={e.name} value={e.addr}>{e.label} ({e.latency}ms)</IonSelectOption> )
                    }
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">User Name<IonText color="danger">*</IonText></IonLabel>
                  <IonInput 
                    name="username" 
                    required
                    type="text"
                    onIonChange={(e:any)=>setUsername(e.detail.value)}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Password<IonText color="danger">*</IonText></IonLabel>
                  <IonInput
                    required type="password"
                    onIonChange={(e:any)=>setPassword(e.detail.value)}
                  ></IonInput>
                </IonItem>
              </IonList>
              <IonButton onClick={e=> connect(username, password, addr)}>Connect</IonButton>
            </form>
      </IonContent>
    </IonPage>
  );
};

export default Connect;
