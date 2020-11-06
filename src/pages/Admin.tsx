import React, {useState} from "react";
import {
    IonContent,
    IonHeader, IonPage, IonTitle,
    IonToolbar, IonButton, IonIcon, IonModal, IonButtons,
    IonList, IonItem, IonLabel, IonInput, IonText, IonSelect, IonSelectOption, IonActionSheet,
    IonBadge, IonFabButton, IonFab
} from '@ionic/react';
import {add, checkmark, earthOutline} from 'ionicons/icons';

import './Admin.css';

import {closeOutline, trash, close, logoApple, server} from 'ionicons/icons';
import {useVpnList, Vpn} from '../hooks/useVpnList';
import {useForm} from "react-hook-form";

let initialValues = {
    username: '',
    company_name: '',
    password: "",
    confirmPassword: ""
};

const Tab1: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    let {vpnList, deleteVpn, addUser} = useVpnList();
    const [vpnToDelete, setVpnToDelete] = useState<Vpn>();

    const {handleSubmit, errors} = useForm({
        defaultValues: {...initialValues},
        mode: "onChange"
    });

    const companies_color: any = {
        "apple":'#C0C0C0',
        "cisco":'#0CA9EA',

    };

    const companies_logo: any = {
        "apple":logoApple,
        "cisco":earthOutline,

    };

    const companies_badge: any = {
        "apple":"light",
        "cisco":"primary",
    };

    const onSubmit = (data: any) => {
        let vpn = {
            username: initialValues.username,
            password: initialValues.password,
            company_name: initialValues.company_name
        };
        addUser(vpn);
        let new_vpn: Vpn ={
            username: initialValues.username,
            company_name: initialValues.company_name
        };
        vpnList.push(new_vpn);

        setShowModal(false)
    };

    const showError = (_fieldName: string) => {
        let error = (errors as any)[_fieldName];
        return error ? (
            <div style={{color: "red", fontWeight: "bold"}}>
                {error.message || "Field Is Required"}
            </div>
        ) : null;
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Users</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Users</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/*<IonButton color="primary" onClick={() => setShowModal(true)}>*/}
                    {/*<IonIcon icon={personAddOutline}></IonIcon>*/}
                {/*</IonButton>*/}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton  onClick={() => setShowModal(true)}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>

                <IonList>
                    {vpnList.map(e =>
                        <IonItem button onClick={() => setVpnToDelete(e)}>
                            <IonIcon slot="start" icon={companies_logo[e.company_name]} style={{"color": companies_color[e.company_name]}}></IonIcon>
                            <IonLabel>
                                <h2 style={{"display":"inline"}}>{e.username}</h2>
                            </IonLabel>
                            <IonBadge color={companies_badge[e.company_name]}>{e.company_name}</IonBadge>

                        </IonItem>
                    )}
                </IonList>

                <IonActionSheet
                    isOpen={!!vpnToDelete}
                    buttons={[{
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                            if (vpnToDelete) {
                                deleteVpn(vpnToDelete);
                                setVpnToDelete(undefined);
                            }
                        }
                    }, {
                        text: 'Cancel',
                        icon: close,
                        role: 'cancel'
                    }]}
                    onDidDismiss={() => setVpnToDelete(undefined)}
                />
                <IonModal isOpen={showModal} cssClass='my-custom-class'>
                    <IonHeader translucent>
                        <IonToolbar>
                            <IonTitle>Add New User</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModal(false)}>
                                    <IonIcon icon={closeOutline}></IonIcon>
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <IonList lines="full" class="ion-no-margin ion-no-padding">
                                <IonItem>
                                    <IonLabel position="floating">Company</IonLabel>
                                    <IonSelect value={initialValues.company_name}
                                               placeholder="Select One"
                                               name="company_name"
                                               onIonChange={e => initialValues.company_name = e.detail.value}
                                    >
                                        <IonSelectOption value="apple">Apple</IonSelectOption>
                                        <IonSelectOption value="cisco">Cisco</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                                {showError("company_name")}

                                <IonItem>
                                    <IonLabel position="stacked">User Name<IonText color="danger">*</IonText></IonLabel>
                                    <IonInput
                                        value={initialValues.username}
                                        name="username"
                                        required
                                        type="text"
                                        onIonChange={(e: any) => initialValues.username = e.detail.value}
                                    ></IonInput>
                                </IonItem>
                                {showError("username")}

                                <IonItem>
                                    <IonLabel position="stacked">Password<IonText color="danger">*</IonText></IonLabel>
                                    <IonInput
                                        value={initialValues.password}
                                        required type="password"
                                        onIonChange={(e: any) => initialValues.password = e.detail.value}
                                    ></IonInput>
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="stacked">Confirm Password<IonText
                                        color="danger">*</IonText></IonLabel>
                                    <IonInput
                                        value={initialValues.confirmPassword}
                                        required
                                        type="password"
                                        onIonChange={(e: any) => initialValues.confirmPassword = e.detail.value}
                                    ></IonInput>
                                </IonItem>
                                {showError("confirmPassword")}
                            </IonList>
                            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                                <IonButton  type="submit" color="success">
                                    <IonIcon icon={checkmark} />
                                </IonButton>
                            </IonFab>
                        </form>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
