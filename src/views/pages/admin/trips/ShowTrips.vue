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
import moment from 'moment';


const router = useRouter();
const isLoadingDiv = ref(true);
const isLoadingButton = ref(false);
const retriviedData = ref();
const destination = ref();
const dieselrequest = ref();
const expenses = ref();
const toast = useToast();
const displayDieselRequest = ref(false);
const displayExpense = ref(false);

const closeDieselRequest = () => {
    displayDieselRequest.value = false;
};
const closeExpense = () => {
    displayExpense.value = false;
};

const confirmDieselRequest = () => {
    displayDieselRequest.value = true;
};

const confirmExpense = () => {
    displayExpense.value = true;
};


function goBackUsingBack() {
    if (router) {
        router.back();
    }
}


const schema2 = yup.object({
    expense_amount: yup.string().optional().label('Observacao'),
    expense_description: yup.string().optional().label('Observacao'),
    trip_id: yup.string().optional().label('Observacao')
});
const schema = yup.object({
    trip_id: yup.string().required().label('Trip'),
    quantity: yup.string().required().label('Quantidade'),
    obs: yup.string().required().label('Observação'),
    // province_id: yup.string().required().label('Province')
    // email: yup.string().required().email().label('Email address'),
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
    validationSchema: schema,
});



const [expense_amount] = defineField('expense_amount');
const [expense_description] = defineField('expense_description');

const [trip_id] = defineField('trip_id');
const [quantity] = defineField('quantity');
const [obs] = defineField('obs');
// const [province_id] = defineField('province_id');

const onSubmit = handleSubmit((values) => {
    isLoadingButton.value = true;
    axios
        .post(`${baseURL}/dieselrequest`, values)
        .then((response) => {
            resetForm();
            getData();
            closeDieselRequest();
            // router.push({ path: '/trips' });
            toast.add({ severity: 'success', summary: `Successo`, detail: 'Registro criada com sucesso', life: 3000 });
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

const fields = ref(null);


const onSubmit2 = (() => {
    fields.value = { 
        trip_id: trip_id.value,
        expense_amount: expense_amount.value,
        expense_description: expense_description.value,

    };
    isLoadingButton.value = true;
    axios
        .post(`${baseURL}/expenses`, fields.value)
        .then((response) => {
            resetForm();
            getData();
            closeExpense();
            // router.push({ path: '/trips' });
            toast.add({ severity: 'success', summary: `Successo`, detail: 'Registro criada com sucesso', life: 3000 });
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
        .get(`${baseURL}/trips/${router.currentRoute.value.params.id}`)
        .then((response) => {
            // toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Detail', life: 3000 });
            retriviedData.value = response.data.trip;
            trip_id.value = retriviedData.value.id;
            destination.value = response.data.destination;
            dieselrequest.value = response.data.dieselrequest;
            expenses.value = response.data.expense;
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
                <h5>Viagens</h5>
            </div>
            <Tag severity="warning" v-if="retriviedData.trip_status_id == 1">{{ retriviedData.tripstatus.name }}</Tag>
            <Tag severity="info" v-if="retriviedData.trip_status_id == 2">{{ retriviedData.tripstatus.name }}</Tag>
            <p><strong>Detalhes do Veiculo</strong></p>
            <p><strong>Veículo:</strong> {{ retriviedData.vehicle.name }}</p>
            <p><strong>Matricula:</strong> {{ retriviedData.vehicle.plate }}</p>
            <p><strong>Capacidade Máxima:</strong> {{ retriviedData.vehicle.max_load }}</p>
            <p><strong>Trela:</strong> {{ retriviedData.vehicle.trela.name }}</p>
            <hr>
            <p><strong>Detalhes da Motorista</strong></p>
            <p><strong>Nome:</strong> {{ retriviedData.driver.name }}</p>
            <p><strong>Carta de Condução:</strong> {{ retriviedData.driver.license }}</p>
            <p><strong>Telefone:</strong> {{ retriviedData.driver.mobile }}</p>
            <hr>
            <p><strong>Detalhes da Motorista</strong></p>
            <p><strong>Nome:</strong> {{ retriviedData.driver.name }}</p>
            <p><strong>Carta de Condução:</strong> {{ retriviedData.driver.license }}</p>
            <p><strong>Telefone:</strong> {{ retriviedData.driver.mobile }}</p>
            <hr>
            <p><strong>Detalhes do Destino</strong></p>
            <DataTable :value="destination"  tableStyle="min-width: 50rem">
                <Column field="departure" sortable header="Partida"></Column>
                <Column field="destination" sortable header="Destino"></Column>
                <Column field="loadstatus.name" sortable header="Carregamento"></Column>
                <Column field="trela.name" sortable header="Trela"></Column>
                <Column field="total_distance" sortable header="Distância Total"></Column>
                <Column field="total_diesel" sortable header="Diesel"></Column>
                <Column field="canvas_expenses" sortable header="Lona"></Column>
                <Column field="feed_expenses" sortable header="Alimentação"></Column>
                <Column field="bridge_expenses" sortable header="Ponte"></Column>
                <Column field="county_expenses" sortable header="Municipio"></Column>
                <Column field="toll_expenses" sortable header="Portagem"></Column>
                <Column field="carbon_tax_expenses" sortable header="Carbon Tax"></Column>
                <Column field="t_ep_expenses" sortable header="T_EP"></Column>
                <Column field="processo_sem_fim_expenses" sortable header="Processo Sem Fim"></Column>
                <Column field="total_expenses" sortable header="Total"></Column>
            </DataTable>
            <hr>
            <Button label="Criar Novo Registro" class="mr-2 mb-2" @click.prevent="confirmDieselRequest()"> <i class="pi pi-plus"></i> Criar Diesel Request </Button>
            <DataTable :value="dieselrequest"  tableStyle="min-width: 50rem">
                <Column field="name" header="#">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column field="quantity" sortable header="Quantidade"></Column>
                <Column field="obs" sortable header="Observação"></Column>
                <Column field="created_at" sortable header="Criado em">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.created_at).format('DD-MM-YYYY H:mm') }}
                    </template>
                </Column>
            </DataTable>

            <hr>
            <Button label="Criar Novo Registro" class="mr-2 mb-2" @click.prevent="confirmExpense()"> <i class="pi pi-plus"></i> Criar Despesas </Button>
            <DataTable :value="expenses"  tableStyle="min-width: 50rem">
                <Column field="name" header="#">
                    <template #body="slotProps">
                        {{ slotProps.index + 1 }}
                    </template>
                </Column>
                <Column field="expense_amount" sortable header="Valor"></Column>
                <Column field="expense_description" sortable header="Descrição"></Column>
                <Column field="created_at" sortable header="Criado em">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.created_at).format('DD-MM-YYYY H:mm') }}
                    </template>
                </Column>
            </DataTable>



        </div>
    </div>
    <div class="text-center" v-else>
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        <p>Por Favor Aguarde...</p>
    </div>
    <Dialog header="Diesel Request" v-model:visible="displayDieselRequest" :breakpoints="{ '960px': '75vw' }" :style="{ width: '40vw' }" :modal="true">
        <form @submit="onSubmit">
            <div class="col-12 md:col-12">
                <div class="card p-fluid">
                    <h5>Diesel Request</h5>
                    <div class="field">
                        <label for="quantity">Quantidade</label>
                        <InputText v-model="quantity" id="quantity" type="text" :class="{ 'p-invalid': errors.quantity }" />
                    </div>
                    <div class="field">
                        <label for="obs">Observação</label>
                        <InputText v-model="obs" id="obs" type="text" :class="{ 'p-invalid': errors.obs }" />
                    </div>
                    <InputText v-model="trip_id" id="trip_id" type="hidden" :class="{ 'p-invalid': errors.trip_id }" />
                </div>
                <Button label="Submeter" class="mr-2 mb-2" @click="onSubmit" :disabled="isLoadingButton"></Button>
                <ProgressSpinner style="width: 35px; height: 35px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" v-if="isLoadingButton" />
            </div>
        </form>
        <template #footer>
            <!-- <Button label="Não" icon="pi pi-times" @click="closeDieselRequest" class="p-button-text" />
            <Button label="Sim" icon="pi pi-check" @click="deleteData" class="p-button-text" autofocus /> -->
        </template>
    </Dialog>
    <Dialog header="Despesas" v-model:visible="displayExpense" :breakpoints="{ '960px': '75vw' }" :style="{ width: '40vw' }" :modal="true">
        <form @submit="onSubmit2">
            <div class="col-12 md:col-12">
                <div class="card p-fluid">
                    <h5>Despesas</h5>
                    <div class="field">
                        <label for="expense_amount">Valor</label>
                        <InputText v-model="expense_amount" id="expense_amount" type="text" :class="{ 'p-invalid': errors.expense_amount }" />
                    </div>
                    <div class="field">
                        <label for="expense_description">Descrição</label>
                        <InputText v-model="expense_description" id="expense_description" type="text" :class="{ 'p-invalid': errors.expense_description }" />
                    </div>
                    <InputText v-model="trip_id" id="trip_id" type="hidden" :class="{ 'p-invalid': errors.trip_id }" />
                </div>
                <Button label="Submeter" class="mr-2 mb-2" @click="onSubmit2" :disabled="isLoadingButton"></Button>
                <ProgressSpinner style="width: 35px; height: 35px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" v-if="isLoadingButton" />
            </div>
        </form>
        <template #footer>
            <!-- <Button label="Não" icon="pi pi-times" @click="closeExpense" class="p-button-text" />
            <Button label="Sim" icon="pi pi-check" @click="deleteData" class="p-button-text" autofocus /> -->
        </template>
    </Dialog>
</template>
