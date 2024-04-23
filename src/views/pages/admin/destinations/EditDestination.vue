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
const loads = ref([]);

const retriviedData = ref([]);
const toast = useToast();

function goBackUsingBack() {
    if (router) {
        router.back();
    }
}
const schema = yup.object({
    departure: yup.string().required().trim().label('departure'),
    destination: yup.string().required().trim().label('destination'),
    load_status_id: yup.string().required().label('Carregamento'),
    trela_id: yup.string().required().label('Trela'),
    total_distance: yup.string().required().label('Distancial'),
    total_diesel: yup.string().required().label('Diesel'),
    canvas_expenses: yup.string().required().label('Lona'),
    feed_expenses: yup.string().required().label('Alimentacao'),
    bridge_expenses: yup.string().required().label('Ponte'),
    county_expenses: yup.string().required().label('Municipio'),
    toll_expenses: yup.string().required().label('Portagem'),
    carbon_tax_expenses: yup.string().required().label('Carbon'),
    t_ep_expenses: yup.string().required().label('TEP'),
    processo_sem_fim_expenses: yup.string().required().label('Processo'),
    total_expenses: yup.string().required().label('Total')
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

const [departure] = defineField('departure');
const [destination] = defineField('destination');
const [trela_id] = defineField('trela_id');
const [load_status_id] = defineField('load_status_id');
const [total_distance] = defineField('total_distance');
const [total_diesel] = defineField('total_diesel');
const [canvas_expenses] = defineField('canvas_expenses');
const [feed_expenses] = defineField('feed_expenses');
const [bridge_expenses] = defineField('bridge_expenses');
const [county_expenses] = defineField('county_expenses');
const [toll_expenses] = defineField('toll_expenses');
const [carbon_tax_expenses] = defineField('carbon_tax_expenses');
const [t_ep_expenses] = defineField('t_ep_expenses');
const [processo_sem_fim_expenses] = defineField('processo_sem_fim_expenses');
const [total_expenses] = defineField('total_expenses');

const onSubmit = handleSubmit((values) => {
    isLoadingButton.value = true;
    axios
        .put(`${baseURL}/destinations/${router.currentRoute.value.params.id}`, values)
        .then((response) => {
            resetForm();
            router.push({ path: '/destinations' });
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
        .get(`${baseURL}/destinations/${router.currentRoute.value.params.id}/edit`)
        .then((response) => {
            // toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Detail', life: 3000 });
            retriviedData.value = response.data.destination;
            trelas.value = response.data.trela;
            loads.value = response.data.load;

            //define models from data
            
            
            departure.value = retriviedData.value.departure;
            destination.value = retriviedData.value.destination;
            trela_id.value = retriviedData.value.trela_id;
            load_status_id.value = retriviedData.value.load_status_id;
            total_distance.value = retriviedData.value.total_distance;
            total_diesel.value = retriviedData.value.total_diesel;
            canvas_expenses.value = retriviedData.value.canvas_expenses;
            feed_expenses.value = retriviedData.value.feed_expenses;
            bridge_expenses.value = retriviedData.value.bridge_expenses;
            county_expenses.value = retriviedData.value.county_expenses;
            toll_expenses.value = retriviedData.value.toll_expenses;
            carbon_tax_expenses.value = retriviedData.value.carbon_tax_expenses;
            t_ep_expenses.value = retriviedData.value.t_ep_expenses;
            processo_sem_fim_expenses.value = retriviedData.value.processo_sem_fim_expenses;
            total_expenses.value = retriviedData.value.total_expenses;

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
                <h5>Editar Destinos</h5>
            </div>

            <small class="p-error">Os campos marcados * sao considerados campos obrigatorios.</small>
            <form @submit="onSubmit">
                <div class="col-12 md:col-12">
                    <div class="card p-fluid">
                        <h5>Formulário para Editação de Destinoss</h5>

                        <div class="field">
                            <label for="departure">Partida</label>
                            <InputText v-model="departure" id="departure" type="text" :class="{ 'p-invalid': errors.departure }" />
                            <small id="departure-help" class="p-error">{{ errors.departure }}</small>
                        </div>
                        <div class="field">
                            <label for="destination">Destino</label>
                            <InputText v-model="destination" id="destination" type="text" :class="{ 'p-invalid': errors.destination }" />
                            <small id="destination-help" class="p-error">{{ errors.destination }}</small>
                        </div>
                        <div class="field">
                            <label for="load_status_id">Carregamento</label>
                            <Dropdown v-model="load_status_id" :options="loads" optionLabel="name" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.load_status_id }" />
                            <small id="load_status_id-help" class="p-error">{{ errors.load_status_id }}</small>
                        </div>
                        <div class="field">
                            <label for="trela_id">Trela</label>
                            <Dropdown v-model="trela_id" :options="trelas" optionLabel="name" optionValue="id" placeholder="Selecionar" :class="{ 'p-invalid': errors.trela_id }" />
                            <small id="trela_id-help" class="p-error">{{ errors.trela_id }}</small>
                        </div>
                        <div class="field">
                            <label for="total_distance">Distancia Total</label>
                            <InputText v-model="total_distance" id="total_distance" type="text" :class="{ 'p-invalid': errors.total_distance }" />
                            <small id="total_distance-help" class="p-error">{{ errors.total_distance }}</small>
                        </div>
                        <div class="field">
                            <label for="total_diesel">Diesel Total</label>
                            <InputText v-model="total_diesel" id="total_diesel" type="text" :class="{ 'p-invalid': errors.total_diesel }" />
                            <small id="total_diesel-help" class="p-error">{{ errors.total_diesel }}</small>
                        </div>
                        <div class="field">
                            <label for="canvas_expenses">Lona</label>
                            <InputText v-model="canvas_expenses" id="canvas_expenses" type="text" :class="{ 'p-invalid': errors.canvas_expenses }" />
                            <small id="canvas_expenses-help" class="p-error">{{ errors.canvas_expenses }}</small>
                        </div>
                        <div class="field">
                            <label for="feed_expenses">Alimentação</label>
                            <InputText v-model="feed_expenses" id="feed_expenses" type="text" :class="{ 'p-invalid': errors.feed_expenses }" />
                            <small id="feed_expenses-help" class="p-error">{{ errors.feed_expenses }}</small>
                        </div>
                        <div class="field">
                            <label for="bridge_expenses">Ponte</label>
                            <InputText v-model="bridge_expenses" id="bridge_expenses" type="text" :class="{ 'p-invalid': errors.bridge_expenses }" />
                            <small id="bridge_expenses-help" class="p-error">{{ errors.bridge_expenses }}</small>
                        </div>
                        <div class="field">
                            <label for="county_expenses">Munícipio</label>
                            <InputText v-model="county_expenses" id="county_expenses" type="text" :class="{ 'p-invalid': errors.county_expenses }" />
                            <small id="county_expenses-help" class="p-error">{{ errors.county_expenses }}</small>
                        </div>
                        <div class="field">
                            <label for="toll_expenses">Portagem</label>
                            <InputText v-model="toll_expenses" id="toll_expenses" type="text" :class="{ 'p-invalid': errors.toll_expenses }" />
                            <small id="toll_expenses-help" class="p-error">{{ errors.toll_expenses }}</small>
                        </div>
                        <div class="field">
                            <label for="carbon_tax_expenses">Carbon Tax</label>
                            <InputText v-model="carbon_tax_expenses" id="carbon_tax_expenses" type="text" :class="{ 'p-invalid': errors.carbon_tax_expenses }" />
                            <small id="carbon_tax_expenses-help" class="p-error">{{ errors.carbon_tax_expenses }}</small>
                        </div>
                        <div class="field">
                            <label for="t_ep_expenses">T_EP</label>
                            <InputText v-model="t_ep_expenses" id="t_ep_expenses" type="text" :class="{ 'p-invalid': errors.t_ep_expenses }" />
                            <small id="t_ep_expenses-help" class="p-error">{{ errors.t_ep_expenses }}</small>
                        </div>
                        <div class="field">
                            <label for="processo_sem_fim_expenses">Processo Sem Fim</label>
                            <InputText v-model="processo_sem_fim_expenses" id="processo_sem_fim_expenses" type="text" :class="{ 'p-invalid': errors.processo_sem_fim_expenses }" />
                            <small id="processo_sem_fim_expenses-help" class="p-error">{{ errors.processo_sem_fim_expenses }}</small>
                        </div>
                        <div class="field">
                            <label for="total_expenses">Total</label>
                            <InputText v-model="total_expenses" id="total_expenses" type="text" :class="{ 'p-invalid': errors.total_expenses }" />
                            <small id="total_expenses-help" class="p-error">{{ errors.total_expenses }}</small>
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
