import React, { useState } from 'react';
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading,
    IonList, IonItem, IonLabel, IonInput, IonText, IonSelect, IonSelectOption, IonImg, IonFabButton, IonFab,
    IonIcon
} from '@ionic/react';
import './Connect.css';
import { useSiteSpeed } from '../hooks/useSiteSpeed';
import {arrowForward} from "ionicons/icons";

const Connect: React.FC = () => {
  const [company, setCompany] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [addr, setAddr] = useState<string>();
  const { site, connect } = useSiteSpeed();
  const [showLoading, setShowLoading] = useState(true);
  //start timestamp
  let start = new Date().getTime();
  let i = 3;
  let ts = new Date().getTime();
  console.log('==', ts);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connect</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {site.map(e=> 
          <img key={e.src} src={e.src + '?' + start} onLoad={() => console.log('+++', new Date().getTime() - start)}></img>
        )}
        <IonLoading
          cssClass='my-custom-class'
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
          duration={5000}
        />
        { showLoading &&
          site.map((d, pos)=>
          <IonImg key={d.name} src={d.src + '?' + start} onIonImgWillLoad={() => d.latency = new Date().getTime()} onIonImgDidLoad={ e=> {
            let ts2 = new Date().getTime();
            let latency = ts2 - d.latency;
            console.log(ts2, d.latency, ts, latency);
            d.latency = latency
            i -= 1
            if( i === 0) {
              let node = site[0]
              site.forEach(e=>{ if(e.latency !== -1 && e.latency < node.latency) node = e})
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
                  <IonLabel position="stacked">Company<IonText color="danger">*</IonText></IonLabel>
                  <IonSelect value={company}
                    placeholder="Select Company" 
                    name="company"
                    onIonChange={e=>setCompany(e.detail.value)}
                    >
                    <IonSelectOption value="apple">APPLE</IonSelectOption>
                    <IonSelectOption value="ibm">IBM</IonSelectOption>
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
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color="primary" onClick={e=> connect(company, username, password, addr)}>
                  <IonIcon icon={arrowForward} />
                </IonFabButton>
              </IonFab>
            </form>
      </IonContent>
    </IonPage>
  );
};

export default Connect;
