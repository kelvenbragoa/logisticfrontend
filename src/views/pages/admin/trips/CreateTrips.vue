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
const destinations = ref([]);

const toast = useToast();

function goBackUsingBack() {
    if (router) {
        router.back();
    }
}
const schema = yup.object({
    destination_id: yup.string().required().trim().label('Destino'),
    driver_id: yup.string().required().trim().label('Motorista'),
    vehicle_id: yup.string().required().trim().label('Veiculo'),
    // trela_id: yup.string().required().label('Trela')
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

const onSubmit = handleSubmit((values) => {
    isLoadingButton.value = true;
    axios
        .post(`${baseURL}/trips`, values)
        .then((response) => {
            resetForm();
            router.push({ path: '/trips' });
            toast.add({ severity: 'success', summary: `Successo`, detail: 'Viagem criado com sucesso', life: 3000 });
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
        .get(`${baseURL}/trips/create`)
        .then((response) => {
            // toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Detail', life: 3000 });
            trelas.value = response.data.trela;
            vehicles.value = response.data.vehicle;
            drivers.value = response.data.driver;
            destinations.value = response.data.destination;
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
                <h5>Criar Viagens</h5>
            </div>

            <small class="p-error">Os campos marcados * sao considerados campos obrigatorios.</small>
            <form @submit="onSubmit">
                <div class="col-12 md:col-12">
                    <div class="card p-fluid">
                        <h5>Formulário Criação de Viagenss</h5>

                        <!-- <div class="field">
                            <label for="name">Nome</label>
                            <InputText v-model="name" id="name" type="text" :class="{ 'p-invalid': errors.name }" />
                            <small id="name-help" class="p-error">{{ errors.name }}</small>
                        </div>
                        <div class="field">
                            <label for="plate">Matrícula</label>
                            <InputText v-model="plate" id="plate" type="text" :class="{ 'p-invalid': errors.plate }" />
                            <small id="plate-help" class="p-error">{{ errors.plate }}</small>
                        </div>
                        <div class="field">
                            <label for="max_load">Capacidade Máxima</label>
                            <InputText v-model="max_load" id="max_load" type="text" :class="{ 'p-invalid': errors.max_load }" />
                            <small id="max_load-help" class="p-error">{{ errors.max_load }}</small>
                        </div> -->
                        <div class="field">
                            <label for="vehicle_id">Veículo</label>
                            <Dropdown v-model="vehicle_id" :options="vehicles" optionLabel="name" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.vehicle_id }" />
                            <small id="vehicle_id-help" class="p-error">{{ errors.vehicle_id }}</small>
                        </div>
                        <div class="field">
                            <label for="driver_id">Motorista</label>
                            <Dropdown v-model="driver_id" :options="drivers" optionLabel="name" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.driver_id }" />
                            <small id="driver_id-help" class="p-error">{{ errors.driver_id }}</small>
                        </div>
                        <div class="field">
                            <label for="destination_id">Destino</label>
                            <Dropdown v-model="destination_id" :options="destinations" optionLabel="departure" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.destination_id }">
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.departure }} - {{ slotProps.option.destination }} / {{ slotProps.option.trela.name }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                            <small id="destination_id-help" class="p-error">{{ errors.destination_id }}</small>
                        </div>
                        <!-- <div class="field">
                            <label for="trela_id">Trela</label>
                            <Dropdown v-model="trela_id" :options="trelas" optionLabel="name" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.trela_id }" />
                            <small id="trela_id-help" class="p-error">{{ errors.trela_id }}</small>
                        </div> -->
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
