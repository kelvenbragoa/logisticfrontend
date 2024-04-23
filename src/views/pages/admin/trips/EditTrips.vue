<script setup>
import { RouterView, RouterLink, useRouter, useRoute } from 'vue-router';
import { baseURL } from '@/service/ApiConstant';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const router = useRouter();
const isLoadingDiv = ref(true);
const isLoadingButton = ref(false);
const trelas = ref([]);
const vehicles = ref([]);
const drivers = ref([]);
const tripstatus = ref([]);
const destinations = ref([]);
const retriviedData = ref([]);
const toast = useToast();

function goBackUsingBack() {
    if (router) {
        router.back();
    }
}
const schema = yup.object({
    // name: yup.string().required().label('Name'),
    // plate: yup.string().required().label('plate'),
    // max_load: yup.string().required().label('max_load'),
    trip_status_id: yup.string().required().label('Status')
    // email: yup.string().required().email().label('Email plate'),
    // fullName: yup.string().required().label('Full name'),
    // password: yup.string().required().min(6).label('Password'),
    // passwordConfirm: yup
    //     .string()
    //     .oneOf([yup.ref('password')], 'Passwords must match')
    //     .required()
    //     .label('Password confirmation'),
    // terms: yup.boolean().required().isTrue('You must agree to terms and conditions').label('terms agreement'),
    // type: yup.string().required().label('Account type')
});

const { defineField, handleSubmit, resetForm, errors, setErrors } = useForm({
    validationSchema: schema
});

const [destination_id] = defineField('destination_id');
const [driver_id] = defineField('driver_id');
const [vehicle_id] = defineField('vehicle_id');
const [trela_id] = defineField('trela_id');
const [trip_status_id] = defineField('trip_status_id');

const onSubmit = handleSubmit((values) => {
    isLoadingButton.value = true;
    axios
        .put(`${baseURL}/trips/${router.currentRoute.value.params.id}`, values)
        .then((response) => {
            resetForm();
            router.push({ path: '/trips' });
            toast.add({ severity: 'success', summary: `Successo`, detail: 'Registro editado com sucesso', life: 3000 });
        })
        .catch((error) => {
            isLoadingButton.value = false;
            toast.add({ severity: 'error', summary: `${error.response.data.message}`, detail: 'Detalhe da Mensagem', life: 3000 });
            if (error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        })
        .finally(() => {
            isLoadingButton.value = false;
        });
});

const getData = () => {
    axios
        .get(`${baseURL}/trips/${router.currentRoute.value.params.id}/edit`)
        .then((response) => {
            // toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Detail', life: 3000 });
            retriviedData.value = response.data.trip;
            trelas.value = response.data.trela;
            destinations.value = response.data.destination;
            vehicles.value = response.data.vehicle;
            drivers.value = response.data.driver;
            tripstatus.value = response.data.tripstatus;
            //define models from data
            destination_id.value = retriviedData.value.destination_id;
            vehicle_id.value = retriviedData.value.vehicle_id;
            driver_id.value = retriviedData.value.driver_id;
            trela_id.value = retriviedData.value.trela_id;
            trip_status_id.value = retriviedData.value.trip_status_id;

            isLoadingDiv.value = false;


        })
        .catch((error) => {
            isLoadingDiv.value = false;
            toast.add({ severity: 'error', summary: `${error}`, detail: 'Message Detail', life: 3000 });
            goBackUsingBack();
        });
};
onMounted(() => {
    getData();
});
</script>
<template>
    <div className="card" v-if="!isLoadingDiv">
        <div class="col-12">
            <div class="card-w-title">
                <Button label="Voltar" class="mr-2 mb-2" @click="goBackUsingBack"><i class="pi pi-angle-left"></i> Voltar</Button>
                <h5>Editar Viagens</h5>
            </div>

            <small class="p-error">Os campos marcados * sao considerados campos obrigatorios.</small>
            <form @submit="onSubmit">
                <div class="col-12 md:col-12">
                    <div class="card p-fluid">
                        <h5>Formulário para Editação de Viagenss</h5>

                        <div class="field">
                            <label for="vehicle_id">Veículo</label>
                            <Dropdown v-model="vehicle_id" :options="vehicles" optionLabel="name" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.vehicle_id }" disabled/>
                            <small id="vehicle_id-help" class="p-error">{{ errors.vehicle_id }}</small>
                        </div>
                        <div class="field">
                            <label for="driver_id">Motorista</label>
                            <Dropdown v-model="driver_id" :options="drivers" optionLabel="name" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.driver_id }" disabled/>
                            <small id="driver_id-help" class="p-error">{{ errors.driver_id }}</small>
                        </div>
                        <div class="field">
                            <label for="destination_id">Destino</label>
                            <Dropdown v-model="destination_id" :options="destinations" optionLabel="departure" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.destination_id }" disabled>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.departure }} - {{ slotProps.option.destination }} / {{ slotProps.option.trela.name }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                            <small id="destination_id-help" class="p-error">{{ errors.destination_id }}</small>
                        </div>
                        <div class="field">
                            <label for="trip_status_id">Estado</label>
                            <Dropdown v-model="trip_status_id" :options="tripstatus" optionLabel="name" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.trip_status_id }"/>
                            <small id="trip_status_id-help" class="p-error">{{ errors.trip_status_id }}</small>
                        </div>
                    </div>
                    <Button label="Submeter" class="mr-2 mb-2" @click="onSubmit" :disabled="isLoadingButton"></Button
                    ><ProgressSpinner style="width: 35px; height: 35px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" v-if="isLoadingButton" />
                </div>
            </form>
        </div>
    </div>
    <div class="text-center" v-else>
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        <p>Por Favor Aguarde...</p>
    </div>
</template>
